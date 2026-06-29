import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../services/api";
import ChatBot from "../components/ChatBot";

function UserHome() {
  const [user, setUser] = useState(null);
  const [subs, setSubs] = useState([]);
  const [menusMap, setMenusMap] = useState({});       // messId -> menu[]
  const [messDetails, setMessDetails] = useState({}); // messId -> mess details
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // ← NEW: detect navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, subRes] = await Promise.all([
          api.get("/user/me"),
          api.get("/subscriptions/my"),
        ]);
        const subsData = subRes.data;
        console.log("📦 sub.mess sample:", subsData[0]?.mess);
        setUser(userRes.data.user);
       setSubs(subsData.filter(sub => sub.status === "active"));

        // Fetch menu for each subscribed mess
        const menuEntries = await Promise.all(
          subsData.map(async (sub) => {
            try {
              const mRes = await api.get(`/menu/mess/${sub.mess?._id}`);
              return [sub.mess?._id, mRes.data];
            } catch {
              return [sub.mess?._id, []];
            }
          })
        );
        setMenusMap(Object.fromEntries(menuEntries));
        // Use sub.mess directly for description (from populate)
        const detailMap = Object.fromEntries(
          subsData.map((sub) => [sub.mess?._id, sub.mess || {}])
        );
        setMessDetails(detailMap);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.key]); // ← CHANGED: [] → [location.key] — re-fetch on every navigate

  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <div style={s.loadingSpinner} />
        <div style={s.loadingText}>Fetching your mess…</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(255,107,53,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(255,107,53,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,107,53,0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hb-sub-card:hover {
          border-color: #FF6B35 !important;
          transform: translateY(-2px);
          transition: all 0.18s ease;
        }
        .hb-find-btn:hover { background: #e85d28 !important; }
        .hb-find-btn { transition: background 0.15s; }
      `}</style>

      {/* ── Two-column shell — no page scroll ── */}
      <div style={s.shell}>

        {/* LEFT — banner + profile + subs */}
        <div style={s.leftCol}>

          {/* Banner */}
          <div style={s.banner}>
            <div style={s.bannerGrid} />
            <div style={s.bannerInner}>
              <div>
                <div style={s.bannerEyebrow}>Welcome Back, </div>
                <h2 style={s.bannerTitle}>👋 {user?.name}</h2>
                <p style={s.bannerSub}>Manage your meals with HomeBite</p>
              </div>
              <div style={s.bannerAccent}>🍽</div>
            </div>
          </div>

          {/* Profile */}
          <div style={s.card}>
            <div style={s.sectionLabel}>PROFILE</div>
            <div style={s.cardHeader}>
              <div style={s.avatarWrap}>
                <div style={s.avatar}>
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
              <div>
                <div style={s.profileName}>{user?.name}</div>
                <div style={s.profileEmail}>{user?.email}</div>
                <div style={s.profileBadge}>● Active Member</div>
              </div>
            </div>
          </div>

          {/* Subscriptions / Search — flex:1 fills remaining left space */}
          <div style={{ ...s.card, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

            {subs.length === 0 ? (
              <>
                <div style={s.sectionLabel}>DISCOVER</div>
                <div style={s.cardTitle}>Find a Mess</div>
                <div style={s.emptyBox}>
                  <div style={s.emptyEmoji}>🔍</div>
                  <div style={s.emptyHeading}>No mess subscribed yet</div>
                  <div style={s.emptyHint}>Search nearby messes and subscribe to get started.</div>
                  <a href="/user/search" style={s.findBtn} className="hb-find-btn">
                    Explore Messes →
                  </a>
                </div>
              </>
            ) : (
              <>
                <div style={s.sectionLabel}>SUBSCRIPTIONS</div>
                <div style={s.cardTitle}>My Messes</div>
                <div style={s.subScroll}>
                  <div style={s.subGrid}>
                    {subs.map((sub) => (
                      <div key={sub._id} style={s.subCard} className="hb-sub-card">
                        <div style={s.subTop}>
                          <div style={s.subIcon}>🍽</div>
                          <div style={s.activeDot} />
                        </div>
                        <div style={s.subName}>{sub.mess?.name}</div>
                        <div style={s.subLocation}>📍 {sub.mess?.location}</div>
                        {(messDetails[sub.mess?._id]?.description || sub.mess?.description) && (
                          <div style={s.subDesc}>
                            {messDetails[sub.mess?._id]?.description || sub.mess?.description}
                          </div>
                        )}
                        <div style={s.subDivider} />
                        <div style={s.subPrice}>
                          ₹{sub.mess?.subscriptionPrice || 0}
                          <span style={s.subPriceSuffix}>/mo</span>
                        </div>
                        {(menusMap[sub.mess?._id] || []).length > 0 ? (
                          <div style={s.menuBox}>
                            <div style={s.menuLabel}>
                              TODAY'S MENU
                              <span style={s.menuCount}>
                                {(menusMap[sub.mess?._id] || []).length} Item
                                {(menusMap[sub.mess?._id] || []).length !== 1 ? "s" : ""}
                              </span>
                            </div>
                            {(menusMap[sub.mess?._id] || []).map((item) => (
                              <div key={item._id} style={s.menuItem}>
                                <div>
                                  <span style={s.menuDish}>{item.dishName}</span>
                                  {item.description && (
                                    <div style={s.menuDishDesc}>{item.description}</div>
                                  )}
                                </div>
                                <span style={s.menuPrice}>₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={s.menuEmpty}>No menu for today</div>
                        )}
                        <div style={s.activeBadge}>🟢 Active Subscription</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* RIGHT — ChatBot full height */}
        <div style={s.rightCol}>
          <div style={s.chatCard}>
            <div style={s.sectionLabel}>ASSISTANT</div>
            <div style={s.cardTitle}>HomeBite AI</div>
            <div style={s.chatInner}>
              <ChatBot />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

// ── Design Tokens ─────────────────────────────────────────────
const T = {
  bg:      "#0F0F1A",
  card:    "#16162A",
  bdr:     "#2A2A45",
  orange:  "#FF6B35",
  teal:    "#4ECDC4",
  text:    "#F0F0F0",
  muted:   "#8888AA",
  faint:   "#3A3A5C",
  green:   "#22C55E",
  disp:    "'Space Grotesk', sans-serif",
  body:    "'Inter', sans-serif",
};

// ── Styles ─────────────────────────────────────────────────────
const s = {

  shell: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    background: T.bg,
    fontFamily: T.body,
    gap: 12,
    padding: 12,
    boxSizing: "border-box",
    alignItems: "stretch",
  },

  /* Left: fixed width, internally scrollable */
  leftCol: {
    width: 700,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
  },

  rightCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "100%",
  },

  /* Loading */
  loadingWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: T.bg,
    gap: 14,
  },
  loadingSpinner: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: `3px solid ${T.faint}`,
    borderTopColor: T.orange,
    animation: "spin 0.75s linear infinite",
  },
  loadingText: {
    fontSize: 13,
    color: T.muted,
    letterSpacing: "0.03em",
  },

  /* Banner */
  banner: {
    background: "linear-gradient(135deg,#1A0A30 0%,#1C1040 50%,#0D1A35 100%)",
    borderRadius: 16,
    padding: "18px 20px 14px",
    border: "1px solid #2E1F55",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  },
  bannerGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,107,53,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.05) 1px,transparent 1px)",
    backgroundSize: "28px 28px",
    pointerEvents: "none",
  },
  bannerInner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerEyebrow: {
    fontSize: 9,
    fontWeight: 600,
    color: T.orange,
    letterSpacing: "0.12em",
    fontFamily: T.disp,
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: T.text,
    margin: 0,
    fontFamily: T.disp,
    lineHeight: 1.2,
  },
  bannerSub: {
    fontSize: 12,
    color: T.muted,
    margin: "4px 0 0",
  },
  bannerAccent: {
    fontSize: 38,
    opacity: 0.15,
    userSelect: "none",
  },

  /* Shared card */
  card: {
    background: T.card,
    borderRadius: 14,
    padding: "14px 16px",
    border: `1px solid ${T.bdr}`,
    flexShrink: 0,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: "0.12em",
    color: T.orange,
    fontFamily: T.disp,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
    marginBottom: 12,
  },

  chatCard: {
    background: T.card,
    borderRadius: 14,
    padding: "14px 16px",
    border: `1px solid ${T.bdr}`,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
    boxSizing: "border-box",
  },

  chatInner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minHeight: 0,
  },

  /* Profile */
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  avatarWrap: {
    padding: 3,
    borderRadius: "50%",
    background: `conic-gradient(${T.orange},#FF9A6C,${T.orange})`,
    animation: "pulseRing 2s ease-out infinite",
    flexShrink: 0,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#1E1E38",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
    border: `2px solid ${T.card}`,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
  },
  profileEmail: {
    fontSize: 11,
    color: T.muted,
    marginTop: 2,
  },
  profileBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: T.green,
    marginTop: 4,
  },

  /* Empty state */
  emptyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px 0 8px",
    gap: 5,
  },
  emptyEmoji: { fontSize: 30, marginBottom: 2 },
  emptyHeading: {
    fontSize: 13,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
  },
  emptyHint: {
    fontSize: 11,
    color: T.muted,
    marginBottom: 4,
  },
  findBtn: {
    marginTop: 4,
    padding: "8px 18px",
    background: T.orange,
    color: "#fff",
    borderRadius: 9,
    fontSize: 12,
    fontWeight: 700,
    textDecoration: "none",
    fontFamily: T.disp,
    display: "inline-block",
  },

  /* Sub cards — scrollable container */
  subScroll: {
    flex: 1,
    overflowY: "auto",
  },
  subGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  subCard: {
    background: "#1C1C34",
    borderRadius: 10,
    padding: "10px 12px",
    border: `1px solid ${T.bdr}`,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    transition: "all 0.18s ease",
  },
  subTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  subIcon: { fontSize: 18 },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: T.green,
    boxShadow: `0 0 5px ${T.green}`,
    marginTop: 2,
  },
  subName: {
    fontSize: 12,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
    lineHeight: 1.3,
  },
  subLocation: {
    fontSize: 10,
    color: T.muted,
  },
  subDesc: {
    fontSize: 10,
    color: T.muted,
    fontStyle: "italic",
    lineHeight: 1.4,
    marginTop: 1,
  },
  subDivider: {
    height: 1,
    background: T.faint,
    margin: "4px 0",
  },
  subPrice: {
    fontSize: 15,
    fontWeight: 700,
    color: T.teal,
    fontFamily: T.disp,
  },
  subPriceSuffix: {
    fontSize: 10,
    fontWeight: 500,
    color: T.muted,
    marginLeft: 2,
  },
  activeBadge: {
    display: "inline-block",
    fontSize: 9,
    fontWeight: 700,
    color: T.green,
    background: "rgba(34,197,94,0.12)",
    padding: "2px 8px",
    borderRadius: 20,
    letterSpacing: "0.06em",
    fontFamily: T.disp,
    width: "fit-content",
    marginTop: 2,
  },

  /* Today's menu inside sub card */
  menuBox: {
    background: "#121220",
    borderRadius: 8,
    padding: "7px 9px",
    border: "1px solid #2A2A45",
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  menuLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: T.orange,
    letterSpacing: "0.1em",
    fontFamily: T.disp,
    marginBottom: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuCount: {
    fontSize: 8,
    fontWeight: 400,
    color: T.muted,
    letterSpacing: 0,
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  menuDish: {
    fontSize: 10,
    color: T.text,
    fontFamily: T.body,
    flex: 1,
  },
  menuPrice: {
    fontSize: 10,
    fontWeight: 700,
    color: T.teal,
    fontFamily: T.disp,
    flexShrink: 0,
  },
  menuDishDesc: {
    fontSize: 9,
    color: T.muted,
    marginTop: 1,
    fontStyle: "italic",
    lineHeight: 1.3,
  },
  menuEmpty: {
    fontSize: 10,
    color: T.muted,
    fontStyle: "italic",
    marginTop: 4,
    textAlign: "center",
  },
};

export default UserHome;