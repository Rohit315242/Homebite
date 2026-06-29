import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";

function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/attendance/owner-members");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const name = m.name?.toLowerCase() || "";
      const email = m.email?.toLowerCase() || "";
      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [members, search]);

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "active").length;
  const inactiveMembers = members.filter((m) => m.status !== "active").length;

  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <div style={s.spinner} />
        <div style={s.loadingText}>Loading members…</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }

        .mem-search:focus { border-color: #a78bfa !important; outline: none; }
        .mem-row:hover { background: rgba(255,255,255,0.04) !important; }
        .mem-row { transition: background 0.12s; cursor: default; }
      `}</style>

      <div style={s.page}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <div style={s.eyebrow}>MANAGEMENT</div>
            <h2 style={s.title}>👥 Members</h2>
          </div>
          <div style={s.totalPill}>{totalMembers} total</div>
        </div>

        {/* Stat cards */}
        <div style={s.statsGrid}>
          <div style={s.statCard}>
            <div style={s.statNum}>{totalMembers}</div>
            <div style={s.statLabel}>Total members</div>
          </div>
          <div style={{ ...s.statCard, borderColor: "rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.08)" }}>
            <div style={{ ...s.statNum, color: "#4ade80" }}>{activeMembers}</div>
            <div style={{ ...s.statLabel, color: "#4ade80" }}>Active</div>
          </div>
          <div style={{ ...s.statCard, borderColor: "rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.08)" }}>
            <div style={{ ...s.statNum, color: "#f87171" }}>{inactiveMembers}</div>
            <div style={{ ...s.statLabel, color: "#f87171" }}>Inactive</div>
          </div>
        </div>

        {/* Search */}
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.search}
            className="mem-search"
          />
        </div>

        {/* Table card */}
        <div style={s.card}>
          {filteredMembers.length === 0 ? (
            <div style={s.empty}>
              <div style={s.emptyIcon}>👥</div>
              <div style={s.emptyText}>No members found</div>
              <div style={s.emptyHint}>Try a different search term</div>
            </div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {["Member", "Email", "Attendance", "Last meal", "Joined", "Status"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m, i) => (
                  <tr
                    key={m._id}
                    style={{
                      ...s.row,
                      background: i % 2 === 0
                        ? "rgba(255,255,255,0.02)"
                        : "transparent",
                    }}
                    className="mem-row"
                  >
                    <td style={s.td}>
                      <div style={s.memberCell}>
                        <div style={s.avatar}>
                          {m.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <span style={s.memberName}>{m.name}</span>
                      </div>
                    </td>
                    <td style={{ ...s.td, color: "#8888AA" }}>{m.email}</td>
                    <td style={s.td}>
                      <span style={s.attBadge}>🍽 {m.attendanceDays} days</span>
                    </td>
                    <td style={{ ...s.td, color: "#8888AA" }}>
                      {m.lastMeal
                        ? new Date(m.lastMeal).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td style={{ ...s.td, color: "#8888AA" }}>
                      {new Date(m.joinedDate).toLocaleDateString()}
                    </td>
                    <td style={s.td}>
                      <span style={m.status === "active" ? s.badgeActive : s.badgeExpired}>
                        {m.status === "active" ? "🟢 Active" : "🔴 Expired"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </>
  );
}


const T = {
  bg:     "#0D0D1F",
  card:   "#13132A",
  bdr:    "#2A2A45",
  faint:  "#1E1E38",
  purple: "#a78bfa",
  teal:   "#4ECDC4",
  text:   "#F0F0F0",
  muted:  "#8888AA",
  green:  "#4ade80",
  red:    "#f87171",
  disp:   "'Space Grotesk', sans-serif",
  body:   "'Inter', sans-serif",
};

const s = {
  page: {
    padding: "28px 28px 40px",
    background: T.bg,
    minHeight: "100vh",
    fontFamily: T.body,
  },

  /* Loading */
  loadingWrap: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    height: "100vh", gap: 14,
    background: T.bg,
  },
  spinner: {
    width: 32, height: 32, borderRadius: "50%",
    border: `3px solid ${T.bdr}`,
    borderTopColor: T.purple,
    animation: "spin 0.7s linear infinite",
  },
  loadingText: { fontSize: 13, color: T.muted, fontFamily: T.body },

  /* Header */
  header: {
    display: "flex", alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  eyebrow: {
    fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
    color: T.purple, fontFamily: T.disp, marginBottom: 4,
  },
  title: {
    fontSize: 24, fontWeight: 700, margin: 0,
    color: T.text, fontFamily: T.disp, lineHeight: 1.2,
  },
  totalPill: {
    fontSize: 12, fontWeight: 600,
    color: T.purple,
    background: "rgba(167,139,250,0.12)",
    padding: "5px 14px", borderRadius: 20,
    border: "1px solid rgba(167,139,250,0.3)",
    fontFamily: T.disp,
  },

  /* Stats */
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(3,1fr)",
    gap: 14, marginBottom: 20,
  },
  statCard: {
    background: T.card, borderRadius: 14,
    padding: "18px 20px",
    border: `1px solid ${T.bdr}`,
  },
  statNum: {
    fontSize: 28, fontWeight: 700,
    color: T.text, fontFamily: T.disp, lineHeight: 1,
  },
  statLabel: {
    fontSize: 12, color: T.muted, marginTop: 5,
  },

  /* Search */
  searchWrap: {
    position: "relative", marginBottom: 16,
  },
  searchIcon: {
    position: "absolute", left: 14, top: "50%",
    transform: "translateY(-50%)", fontSize: 13,
    pointerEvents: "none",
  },
  search: {
    width: "100%",
    padding: "11px 14px 11px 40px",
    borderRadius: 10,
    border: `1px solid ${T.bdr}`,
    fontSize: 14,
    background: T.card,
    color: T.text,
    boxSizing: "border-box",
    fontFamily: T.body,
    transition: "border-color 0.15s",
  },

  /* Table card */
  card: {
    background: T.card,
    borderRadius: 16,
    border: `1px solid ${T.bdr}`,
    overflow: "hidden",
  },
  table: {
    width: "100%", borderCollapse: "collapse",
  },
  th: {
    padding: "12px 16px", textAlign: "left",
    fontSize: 10, fontWeight: 600,
    color: T.muted, letterSpacing: "0.08em",
    textTransform: "uppercase",
    background: T.faint,
    borderBottom: `1px solid ${T.bdr}`,
    fontFamily: T.disp,
  },
  row: {
    borderBottom: `1px solid ${T.bdr}`,
  },
  td: {
    padding: "12px 16px", fontSize: 13,
    color: T.text, verticalAlign: "middle",
  },

  /* Member cell */
  memberCell: {
    display: "flex", alignItems: "center", gap: 10,
  },
  avatar: {
    width: 32, height: 32, borderRadius: "50%",
    background: "rgba(167,139,250,0.2)",
    border: "1px solid rgba(167,139,250,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, color: T.purple,
    flexShrink: 0, fontFamily: T.disp,
  },
  memberName: {
    fontSize: 13, fontWeight: 600,
    color: T.text, fontFamily: T.disp,
  },

  /* Attendance badge */
  attBadge: {
    fontSize: 11, color: T.teal,
    background: "rgba(78,205,196,0.1)",
    padding: "3px 10px", borderRadius: 20,
    border: "1px solid rgba(78,205,196,0.2)",
    whiteSpace: "nowrap",
  },

  /* Status badges */
  badgeActive: {
    background: "rgba(34,197,94,0.12)",
    color: T.green,
    padding: "4px 12px", borderRadius: 20,
    fontSize: 11, fontWeight: 600,
    display: "inline-block", whiteSpace: "nowrap",
    border: "1px solid rgba(34,197,94,0.2)",
  },
  badgeExpired: {
    background: "rgba(248,113,113,0.12)",
    color: T.red,
    padding: "4px 12px", borderRadius: 20,
    fontSize: 11, fontWeight: 600,
    display: "inline-block", whiteSpace: "nowrap",
    border: "1px solid rgba(248,113,113,0.2)",
  },

 
  empty: {
    display: "flex", flexDirection: "column",
    alignItems: "center", padding: "52px 20px", gap: 6,
  },
  emptyIcon: { fontSize: 36, marginBottom: 4 },
  emptyText: {
    fontSize: 15, fontWeight: 600,
    color: T.text, fontFamily: T.disp,
  },
  emptyHint: { fontSize: 13, color: T.muted },
};

export default Members;