import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";

console.log("✅ OWNER Payments Component Loaded");

function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await api.get("/payments/owner");
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const name = p.user?.name?.toLowerCase() || "";
      const email = p.user?.email?.toLowerCase() || "";
      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [payments, search]);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPayments = payments.length;
  const totalCustomers = new Set(payments.map((p) => p.user?._id)).size;

  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <div style={s.spinner} />
        <div style={s.loadingText}>Loading payments…</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        .pay-search:focus { border-color: #a78bfa !important; outline: none; }
        .pay-row:hover { background: rgba(255,255,255,0.04) !important; }
        .pay-row { transition: background 0.12s; cursor: default; }
      `}</style>

      <div style={s.page}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <div style={s.eyebrow}>FINANCIALS</div>
            <h2 style={s.title}>💳 Payments</h2>
          </div>
          <div style={s.totalPill}>{totalPayments} transactions</div>
        </div>

        {/* Stat cards */}
        <div style={s.statsGrid}>
          <div style={{ ...s.statCard, borderColor: "rgba(167,139,250,0.25)", background: "rgba(167,139,250,0.08)" }}>
            <div style={{ ...s.statNum, color: "#a78bfa" }}>₹{totalRevenue.toLocaleString()}</div>
            <div style={{ ...s.statLabel, color: "#a78bfa" }}>Total revenue</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statNum}>{totalPayments}</div>
            <div style={s.statLabel}>Total payments</div>
          </div>
          <div style={{ ...s.statCard, borderColor: "rgba(78,205,196,0.25)", background: "rgba(78,205,196,0.08)" }}>
            <div style={{ ...s.statNum, color: "#4ECDC4" }}>{totalCustomers}</div>
            <div style={{ ...s.statLabel, color: "#4ECDC4" }}>Unique customers</div>
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
            className="pay-search"
          />
        </div>

        {/* Table card */}
        <div style={s.card}>
          {filteredPayments.length === 0 ? (
            <div style={s.empty}>
              <div style={s.emptyIcon}>💳</div>
              <div style={s.emptyText}>No payments found</div>
              <div style={s.emptyHint}>Try a different search term</div>
            </div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {["User", "Email", "Mess", "Amount", "Date", "Status"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p, i) => (
                  <tr
                    key={p._id}
                    style={{
                      ...s.row,
                      background: i % 2 === 0
                        ? "rgba(255,255,255,0.02)"
                        : "transparent",
                    }}
                    className="pay-row"
                  >
                    <td style={s.td}>
                      <div style={s.userCell}>
                        <div style={s.avatar}>
                          {(p.user?.name?.charAt(0) || "U").toUpperCase()}
                        </div>
                        <span style={s.userName}>{p.user?.name || "User"}</span>
                      </div>
                    </td>
                    <td style={{ ...s.td, color: "#8888AA" }}>{p.user?.email || "—"}</td>
                    <td style={{ ...s.td, color: "#8888AA" }}>{p.mess?.name || "—"}</td>
                    <td style={s.td}>
                      <span style={s.amountBadge}>₹{p.amount.toLocaleString()}</span>
                    </td>
                    <td style={{ ...s.td, color: "#8888AA" }}>
                      {new Date(p.date).toLocaleDateString()}
                    </td>
                    <td style={s.td}>
                      <span style={p.status === "paid" ? s.badgePaid : s.badgePending}>
                        {p.status === "paid" ? "✅ Paid" : "⏳ Pending"}
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
  amber:  "#fbbf24",
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
    fontSize: 26, fontWeight: 700,
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

  /* User cell */
  userCell: {
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
  userName: {
    fontSize: 13, fontWeight: 600,
    color: T.text, fontFamily: T.disp,
  },

  /* Amount badge */
  amountBadge: {
    fontSize: 13, fontWeight: 700,
    color: T.purple, fontFamily: T.disp,
  },

  /* Status badges */
  badgePaid: {
    background: "rgba(34,197,94,0.12)",
    color: T.green,
    padding: "4px 12px", borderRadius: 20,
    fontSize: 11, fontWeight: 600,
    display: "inline-block", whiteSpace: "nowrap",
    border: "1px solid rgba(34,197,94,0.2)",
  },
  badgePending: {
    background: "rgba(251,191,36,0.12)",
    color: T.amber,
    padding: "4px 12px", borderRadius: 20,
    fontSize: 11, fontWeight: 600,
    display: "inline-block", whiteSpace: "nowrap",
    border: "1px solid rgba(251,191,36,0.2)",
  },

  /* Empty state */
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

export default Payments;