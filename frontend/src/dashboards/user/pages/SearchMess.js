import { useState } from "react";
import api from "../../../services/api";
import SearchBar from "../components/SearchBar";
import MessCard from "../components/MessCard";
import ChatBot from "../components/ChatBot";

function SearchMess() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchMess = async (search) => {
    try {
      setLoading(true);
      setSearched(true);
      const res = await api.get(`/mess/search?search=${search}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,107,53,0); }
          50%      { box-shadow: 0 0 0 6px rgba(255,107,53,0.12); }
        }

        .sm-card-anim { animation: fadeUp 0.32s ease both; }
        .sm-card-anim:nth-child(1){animation-delay:0.04s}
        .sm-card-anim:nth-child(2){animation-delay:0.09s}
        .sm-card-anim:nth-child(3){animation-delay:0.14s}
        .sm-card-anim:nth-child(4){animation-delay:0.19s}
        .sm-card-anim:nth-child(5){animation-delay:0.24s}
        .sm-card-anim:nth-child(6){animation-delay:0.29s}

        /* Results area scrollbar */
        .sm-results::-webkit-scrollbar       { width: 4px; }
        .sm-results::-webkit-scrollbar-track  { background: transparent; }
        .sm-results::-webkit-scrollbar-thumb  { background: #2A2A45; border-radius: 4px; }
        .sm-results::-webkit-scrollbar-thumb:hover { background: #3A3A5C; }

        /* Chat scrollbar */
        .sm-chat::-webkit-scrollbar       { width: 4px; }
        .sm-chat::-webkit-scrollbar-track  { background: transparent; }
        .sm-chat::-webkit-scrollbar-thumb  { background: #2A2A45; border-radius: 4px; }

        /* Stat pill hover */
        .sm-stat:hover { border-color: #FF6B35 !important; }
      `}</style>

      <div style={s.shell}>

        {/* ══ LEFT PANEL ══════════════════════════════════════ */}
        <div style={s.leftCol}>

          {/* ── Hero header ── */}
          <div style={s.hero}>
            <div style={s.heroGrid} />
            <div style={s.heroInner}>
              <div>
                <div style={s.eyebrow}>🔍 DISCOVER MESSES</div>
                <h1 style={s.heroTitle}>Find Your<br /><span style={s.heroAccent}>Perfect Mess</span></h1>
                <p style={s.heroSub}>Search by name, location or cuisine — fresh meals await.</p>
              </div>

              {/* Quick stats */}
              <div style={s.statsRow}>
                {[
                  { icon: "🍽", val: "50+", label: "Messes" },
                  { icon: "📍", val: "10+", label: "Areas" },
                  { icon: "⭐", val: "4.8", label: "Avg Rating" },
                ].map((st) => (
                  <div key={st.label} style={s.statPill} className="sm-stat">
                    <span style={s.statIcon}>{st.icon}</span>
                    <div>
                      <div style={s.statVal}>{st.val}</div>
                      <div style={s.statLabel}>{st.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Search bar ── */}
          <div style={s.searchWrap}>
            <div style={s.searchGlow}>
              <SearchBar onSearch={searchMess} />
            </div>
          </div>

          {/* ── Results ── */}
          <div style={s.resultsArea} className="sm-results">

            {loading ? (
              <div style={s.centerMsg}>
                <div style={s.spinner} />
                <div style={s.searchingText}>Searching messes…</div>
              </div>

            ) : !searched ? (
              <div style={s.emptyState}>
                <div style={s.emptyIconWrap}>
                  <span style={s.emptyIcon}>🍱</span>
                </div>
                <div style={s.emptyHeading}>Start your search</div>
                <div style={s.emptyHint}>Type a mess name or area above to discover meals near you</div>
                <div style={s.emptyTags}>
                  {["Pune", "Kothrud", "Viman Nagar", "Shivaji Nagar"].map(tag => (
                    <span key={tag} style={s.tag} onClick={() => searchMess(tag)}>{tag}</span>
                  ))}
                </div>
              </div>

            ) : results.length === 0 ? (
              <div style={s.emptyState}>
                <div style={s.emptyIconWrap}>
                  <span style={s.emptyIcon}>😕</span>
                </div>
                <div style={s.emptyHeading}>No messes found</div>
                <div style={s.emptyHint}>Try a different name or nearby area</div>
              </div>

            ) : (
              <>
                <div style={s.resultsHeader}>
                  <div style={s.resultsLabel}>
                    <span style={s.resultsCount}>{results.length}</span>
                    &nbsp;mess{results.length !== 1 ? "es" : ""} found
                  </div>
                  <div style={s.resultsDivider} />
                </div>
                <div style={s.grid}>
                  {results.map((mess) => (
                    <div key={mess._id} className="sm-card-anim">
                      <MessCard mess={mess} />
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>

        {/* ══ RIGHT PANEL — AI Assistant ══════════════════════ */}
        <div style={s.rightCol}>
          <div style={s.chatCard}>

            {/* Chat header */}
            <div style={s.chatHeader}>
              <div style={s.chatAvatarWrap}>
                <div style={s.chatAvatar}>🤖</div>
                <div style={s.chatOnline} />
              </div>
              <div>
                <div style={s.chatName}>HomeBite AI</div>
                <div style={s.chatStatus}>Nutrition assistant · Online</div>
              </div>
            </div>

            <div style={s.chatDivider} />

            <div style={s.chatInner} className="sm-chat">
              <ChatBot />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

// ── Design Tokens ──────────────────────────────────────────────
const T = {
  bg:     "#0F0F1A",
  card:   "#16162A",
  card2:  "#1C1C34",
  bdr:    "#2A2A45",
  bdr2:   "#333355",
  orange: "#FF6B35",
  teal:   "#4ECDC4",
  text:   "#F0F0F0",
  muted:  "#8888AA",
  faint:  "#3A3A5C",
  green:  "#22C55E",
  purple: "#8B5CF6",
  disp:   "'Space Grotesk', sans-serif",
  body:   "'Inter', sans-serif",
};

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
  },

  /* ── Left col ── */
  leftCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
    minWidth: 0,
  },

  /* ── Hero ── */
  hero: {
    background: "linear-gradient(135deg,#1A0A30 0%,#1C1040 55%,#0D1A35 100%)",
    borderRadius: 16,
    padding: "20px 22px 16px",
    border: "1px solid #2E1F55",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,107,53,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.06) 1px,transparent 1px)",
    backgroundSize: "32px 32px",
    pointerEvents: "none",
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: 700,
    color: T.orange,
    letterSpacing: "0.14em",
    fontFamily: T.disp,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: T.text,
    margin: 0,
    fontFamily: T.disp,
    lineHeight: 1.2,
  },
  heroAccent: {
    background: `linear-gradient(90deg, ${T.orange}, ${T.teal})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: 12,
    color: T.muted,
    margin: "6px 0 0",
    lineHeight: 1.5,
  },

  /* Stats */
  statsRow: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flexShrink: 0,
  },
  statPill: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid #2E1F55",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "default",
    transition: "border-color 0.15s",
    minWidth: 90,
  },
  statIcon: { fontSize: 16 },
  statVal: {
    fontSize: 13,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 9,
    color: T.muted,
    letterSpacing: "0.05em",
    marginTop: 1,
  },

  /* ── Search wrap ── */
  searchWrap: { flexShrink: 0 },
  searchGlow: {
    borderRadius: 12,
    animation: "glowPulse 3s ease-in-out infinite",
  },

  /* ── Results area ── */
  resultsArea: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    paddingRight: 2,
  },

  resultsHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    marginTop: 2,
  },
  resultsLabel: {
    fontSize: 11,
    color: T.muted,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: T.disp,
    flexShrink: 0,
  },
  resultsCount: {
    color: T.orange,
    fontWeight: 700,
  },
  resultsDivider: {
    flex: 1,
    height: 1,
    background: T.faint,
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: 10,
    paddingBottom: 8,
  },

  /* Loading */
  centerMsg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 48,
    gap: 12,
  },
  spinner: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: `3px solid ${T.faint}`,
    borderTopColor: T.orange,
    animation: "spin 0.7s linear infinite",
  },
  searchingText: {
    fontSize: 12,
    color: T.muted,
    letterSpacing: "0.04em",
  },

  /* Empty state */
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 48,
    gap: 6,
    textAlign: "center",
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: T.card2,
    border: `1px solid ${T.bdr}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyIcon: { fontSize: 28 },
  emptyHeading: {
    fontSize: 15,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
  },
  emptyHint: {
    fontSize: 12,
    color: T.muted,
    maxWidth: 240,
    lineHeight: 1.5,
    marginTop: 2,
  },
  emptyTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
    marginTop: 10,
  },
  tag: {
    padding: "5px 12px",
    background: T.card2,
    border: `1px solid ${T.bdr}`,
    borderRadius: 20,
    fontSize: 11,
    color: T.muted,
    cursor: "pointer",
    fontFamily: T.disp,
    fontWeight: 600,
    transition: "all 0.15s",
  },

  /* ── Right col — AI chat ── */
  rightCol: {
    width: 300,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  },
  chatCard: {
    background: T.card,
    borderRadius: 16,
    border: `1px solid ${T.bdr}`,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px 12px",
    flexShrink: 0,
  },
  chatAvatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  chatAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  chatOnline: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: T.green,
    border: `2px solid ${T.card}`,
  },
  chatName: {
    fontSize: 13,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
  },
  chatStatus: {
    fontSize: 10,
    color: T.muted,
    marginTop: 1,
  },
  chatDivider: {
    height: 1,
    background: T.bdr,
    flexShrink: 0,
  },
  chatInner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minHeight: 0,
    padding: "8px 4px 4px",
  },
};

export default SearchMess;