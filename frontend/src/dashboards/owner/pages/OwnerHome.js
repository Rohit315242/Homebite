import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import StatsCard from "../components/StatsCard";

function OwnerHome() {
  const [owner, setOwner]               = useState(null);
  const [mess, setMess]                 = useState(null);
  const [stats, setStats]               = useState({});
  const [todayMenu, setTodayMenu]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const [ownerRes, messRes, statsRes] = await Promise.all([
        api.get("/owner/me"),
        api.get("/mess/owner"),
        api.get("/analytics"),
      ]);
      setOwner(ownerRes.data);
      setMess(messRes.data);
      setStats(statsRes.data);

      if (messRes.data) {
        const menuRes = await api.get(`/menu/mess/${messRes.data._id}`);
        const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
        setTodayMenu(menuRes.data.filter((item) => item.day === today));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={s.spinner} />
        <div style={s.loadingText}>Loading Dashboard…</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.4); }
          50%      { box-shadow: 0 0 0 8px rgba(255,107,53,0); }
        }
        .oh-fade { animation: fadeUp 0.3s ease both; }
        .oh-fade:nth-child(2) { animation-delay:.06s; }
        .oh-fade:nth-child(3) { animation-delay:.12s; }
        .oh-fade:nth-child(4) { animation-delay:.18s; }

        .oh-action:hover {
          border-color: #FF6B35 !important;
          transform: translateY(-3px);
          background: #1C1C34 !important;
        }
        .oh-menu-row:last-child { border-bottom: none !important; }
      `}</style>

      <div style={s.page}>

        {/* ── Banner ── */}
        <div style={s.banner}>
          <div style={s.bannerGrid} />
          <div style={s.bannerInner}>
            <div>
              <div style={s.eyebrow}>OWNER DASHBOARD</div>
              <h2 style={s.bannerTitle}>👋 {owner?.name}</h2>
              <p style={s.bannerSub}>HomeBite — Mess Management</p>
            </div>
            <div style={s.dateBox}>
              <div style={s.dateText}>
                📅 {currentDateTime.toLocaleDateString("en-IN", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric",
                })}
              </div>
              <div style={s.timeText}>
                🕒 {currentDateTime.toLocaleTimeString("en-IN", {
                  hour: "2-digit", minute: "2-digit", hour12: true,
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={s.statsGrid}>
          <StatsCard title="Members"      value={stats.totalMembers || 0}           icon="👥" color="#0ea5e9" />
          <StatsCard title="Revenue"      value={`₹${stats.totalRevenue || 0}`}     icon="💰" color="#22C55E" />
          <StatsCard title="Today's Menu" value={todayMenu.length}                  icon="🍽" color="#FF6B35" />
        </div>

        {/* ── Main Grid ── */}
        <div style={s.mainGrid}>

          {/* My Mess */}
          <div style={{ ...s.card, ...s.messCard }}>
            <div style={s.cardHeader}>
              <span style={s.cardHeaderTitle}>🏠 My Mess</span>
              <span style={s.activeBadge}>● Active</span>
            </div>
            {mess ? (
              <>
                <div style={s.messName}>{mess.name}</div>
                <div style={s.messInfo}>📍 {mess.location}</div>
                <div style={s.messInfo}>💰 ₹{mess.subscriptionPrice}/month</div>
                {mess.description && (
                  <div style={s.messDesc}>"{mess.description}"</div>
                )}
              </>
            ) : (
              <div style={s.empty}>No Mess Profile Found</div>
            )}
          </div>

          {/* Today's Menu */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <span style={s.cardHeaderTitle}>🍽 Today's Menu</span>
              <span style={s.menuCount}>{todayMenu.length} items</span>
            </div>
            {todayMenu.length === 0 ? (
              <div style={s.empty}>No menu added for today</div>
            ) : (
              <div style={s.menuList}>
                {todayMenu.map((item) => (
                  <div key={item._id} style={s.menuRow} className="oh-menu-row">
                    <div>
                      <div style={s.menuMeal}>{item.mealType}</div>
                      <div style={s.menuDish}>{item.dishName}</div>
                      {item.description && (
                        <div style={s.menuDishDesc}>{item.description}</div>
                      )}
                    </div>
                    <div style={s.menuPrice}>₹{item.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ── Quick Actions ── */}
        <div style={s.quickGrid}>
          {[
            { icon: "🍽", label: "Manage Menu", to: "/owner/menu" },
            { icon: "👥", label: "Members",     to: "/owner/subscriptions" },
            { icon: "⭐", label: "Reviews",     to: "/owner/reviews" },
            { icon: "💳", label: "Payments",    to: "/owner/payments" },
          ].map((a) => (
            <div key={a.label} style={s.actionCard} className="oh-action" onClick={() => navigate(a.to)}>
              <div style={s.actionIcon}>{a.icon}</div>
              <div style={s.actionLabel}>{a.label}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

// ── Tokens ────────────────────────────────────────────────────
const T = {
  bg:     "#0F0F1A",
  card:   "#16162A",
  bdr:    "#2A2A45",
  orange: "#FF6B35",
  teal:   "#4ECDC4",
  text:   "#F0F0F0",
  muted:  "#8888AA",
  faint:  "#3A3A5C",
  green:  "#22C55E",
  disp:   "'Space Grotesk', sans-serif",
  body:   "'Inter', sans-serif",
};

// ── Styles ─────────────────────────────────────────────────────
const s = {
  page: {
    padding: 14,
    background: T.bg,
    minHeight: "100vh",
    fontFamily: T.body,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxSizing: "border-box",
  },

  // Loading
  loadingWrap: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    height: "100vh", background: T.bg, gap: 14,
  },
  spinner: {
    width: 34, height: 34, borderRadius: "50%",
    border: `3px solid ${T.faint}`, borderTopColor: T.orange,
    animation: "spin 0.75s linear infinite",
  },
  loadingText: { fontSize: 13, color: T.muted, letterSpacing: "0.03em" },

  // Banner
  banner: {
    background: "linear-gradient(135deg,#1A0A30 0%,#1C1040 50%,#0D1A35 100%)",
    borderRadius: 16, padding: "20px 24px",
    border: "1px solid #2E1F55",
    position: "relative", overflow: "hidden",
  },
  bannerGrid: {
    position: "absolute", inset: 0,
    backgroundImage: "linear-gradient(rgba(255,107,53,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.05) 1px,transparent 1px)",
    backgroundSize: "28px 28px", pointerEvents: "none",
  },
  bannerInner: {
    position: "relative", zIndex: 1,
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  eyebrow: {
    fontSize: 9, fontWeight: 600, letterSpacing: "0.12em",
    color: T.orange, fontFamily: T.disp, marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 22, fontWeight: 700, color: T.text,
    margin: 0, fontFamily: T.disp, lineHeight: 1.2,
  },
  bannerSub: { fontSize: 12, color: T.muted, margin: "4px 0 0" },
  dateBox: { textAlign: "right" },
  dateText: { fontSize: 12, fontWeight: 600, color: T.text, fontFamily: T.disp },
  timeText: { fontSize: 13, color: T.orange, marginTop: 4, fontFamily: T.disp, fontWeight: 700 },

  // Stats
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 12,
  },

  // Main grid
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  // Shared card
  card: {
    background: T.card,
    borderRadius: 14,
    padding: "16px 18px",
    border: `1px solid ${T.bdr}`,
  },
  messCard: { minHeight: 180 },

  cardHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: 14,
  },
  cardHeaderTitle: {
    fontSize: 14, fontWeight: 700,
    color: T.text, fontFamily: T.disp,
  },
  activeBadge: {
    fontSize: 11, fontWeight: 600, color: T.green,
    background: "rgba(34,197,94,0.12)",
    padding: "3px 10px", borderRadius: 20,
    border: "1px solid rgba(34,197,94,0.2)",
  },
  menuCount: {
    fontSize: 11, color: T.muted,
    fontFamily: T.disp, fontWeight: 600,
  },

  // Mess info
  messName: {
    fontSize: 18, fontWeight: 700,
    color: T.text, fontFamily: T.disp, marginBottom: 8,
  },
  messInfo: { fontSize: 13, color: T.muted, marginBottom: 4 },
  messDesc: {
    fontSize: 12, color: T.muted, fontStyle: "italic",
    marginTop: 10, lineHeight: 1.5,
    borderLeft: `2px solid ${T.orange}`, paddingLeft: 10,
  },
  empty: { fontSize: 13, color: T.muted, textAlign: "center", marginTop: 40 },

  // Menu list
  menuList: { display: "flex", flexDirection: "column" },
  menuRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", padding: "10px 0",
    borderBottom: `1px solid ${T.faint}`, gap: 8,
  },
  menuMeal: {
    fontSize: 9, fontWeight: 700, color: T.orange,
    letterSpacing: "0.08em", fontFamily: T.disp,
    textTransform: "uppercase", marginBottom: 2,
  },
  menuDish: { fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.disp },
  menuDishDesc: { fontSize: 10, color: T.muted, marginTop: 2, fontStyle: "italic" },
  menuPrice: {
    fontSize: 14, fontWeight: 700, color: T.teal,
    fontFamily: T.disp, flexShrink: 0,
  },

  // Quick actions
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 12,
  },
  actionCard: {
    background: T.card,
    borderRadius: 14,
    padding: "20px 16px",
    textAlign: "center",
    border: `1px solid ${T.bdr}`,
    cursor: "pointer",
    transition: "border-color 0.18s, transform 0.18s, background 0.18s",
  },
  actionIcon: { fontSize: 26, marginBottom: 8 },
  actionLabel: {
    fontSize: 12, fontWeight: 700,
    color: T.text, fontFamily: T.disp,
  },
};

export default OwnerHome;