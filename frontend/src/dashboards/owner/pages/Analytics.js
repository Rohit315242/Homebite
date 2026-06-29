import { useEffect, useState } from "react";
import api from "../../../services/api";

function Analytics() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalMembers: 0,
    activeMembers: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await api.get("/analytics");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const cards = [
    {
      label: "TOTAL REVENUE",
      value: `₹${stats.totalRevenue}`,
      icon: "💰",
      color: "#22C55E",
      bg: "rgba(34,197,94,0.08)",
      bdr: "rgba(34,197,94,0.2)",
    },
    {
      label: "TOTAL MEMBERS",
      value: stats.totalMembers,
      icon: "👥",
      color: "#0ea5e9",
      bg: "rgba(14,165,233,0.08)",
      bdr: "rgba(14,165,233,0.2)",
    },
    {
      label: "ACTIVE MEMBERS",
      value: stats.activeMembers,
      icon: "✅",
      color: "#FF6B35",
      bg: "rgba(255,107,53,0.08)",
      bdr: "rgba(255,107,53,0.2)",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .an-card { animation: fadeUp 0.3s ease both; }
        .an-card:nth-child(2) { animation-delay: 0.07s; }
        .an-card:nth-child(3) { animation-delay: 0.14s; }
      `}</style>

      <div style={s.page}>

        {/* Header */}
        <div style={s.header}>
          
          <h2 style={s.title}>📊 Analytics</h2>
          <p style={s.subtitle}>Your mess performance at a glance</p>
        </div>

        {/* Stat Cards */}
        <div style={s.grid}>
          {cards.map((c) => (
            <div
              key={c.label}
              className="an-card"
              style={{ ...s.card, background: c.bg, borderColor: c.bdr }}
            >
              <div style={s.iconWrap}>
                <span style={s.icon}>{c.icon}</span>
              </div>
              <div style={s.cardLabel}>{c.label}</div>
              <div style={{ ...s.cardValue, color: c.color }}>{c.value}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

const T = {
  bg:   "#0F0F1A",
  card: "#16162A",
  bdr:  "#2A2A45",
  text: "#F0F0F0",
  muted:"#8888AA",
  disp: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  orange: "#FF6B35",
};

const s = {
  page: {
    padding: 20,
    background: T.bg,
    minHeight: "100vh",
    fontFamily: T.body,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: { paddingLeft: 2 },
  eyebrow: {
    fontSize: 9, fontWeight: 600,
    letterSpacing: "0.12em", color: T.orange,
    fontFamily: T.disp, marginBottom: 4,
  },
  title: {
    fontSize: 22, fontWeight: 700,
    color: T.text, fontFamily: T.disp, margin: 0,
  },
  subtitle: { fontSize: 12, color: T.muted, margin: "4px 0 0" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
  },
  card: {
    borderRadius: 16,
    padding: "24px 22px",
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  iconWrap: {
    width: 44, height: 44, borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    display: "flex", alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 22 },
  cardLabel: {
    fontSize: 9, fontWeight: 700,
    letterSpacing: "0.1em", color: T.muted,
    fontFamily: T.disp,
  },
  cardValue: {
    fontSize: 34, fontWeight: 700,
    fontFamily: T.disp, lineHeight: 1,
  },
};

export default Analytics;