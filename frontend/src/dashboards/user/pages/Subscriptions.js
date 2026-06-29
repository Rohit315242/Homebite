import { useEffect, useState } from "react";
import api from "../../../services/api";
import SubscriptionList from "../components/SubscriptionList";

function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await api.get("/subscriptions/my");
        setSubs(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
        setError("Could not load subscriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubs();
  }, []);

  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header}>
        <h2 style={s.title}>📦 My Subscriptions</h2>
        <p style={s.subtitle}>All your active mess subscriptions</p>
      </div>

      {/* States */}
      {loading ? (
        <div style={s.centerMsg}>Loading subscriptions...</div>

      ) : error ? (
        <div style={s.errorMsg}>{error}</div>

      ) : subs.length === 0 ? (
        <div style={s.emptyState}>
          <div style={s.emptyIcon}>📦</div>
          <div style={s.emptyText}>No subscriptions yet</div>
          <a href="/user/search" style={s.findBtn}>Find a Mess</a>
        </div>

      ) : (
        <>
          {/* Count Badge */}
          <div style={s.countBadge}>
            {subs.length} active subscription{subs.length > 1 ? "s" : ""}
          </div>

          {/* Subscription List */}
          <SubscriptionList subs={subs} />
        </>
      )}

    </div>
  );
}

const s = {
  page: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    background: "#0f1117",
    minHeight: "100vh",
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748b",
    margin: "4px 0 0",
  },
  centerMsg: {
    textAlign: "center",
    padding: "40px 0",
    fontSize: 14,
    color: "#64748b",
  },
  errorMsg: {
    textAlign: "center",
    padding: "40px 0",
    fontSize: 14,
    color: "#f87171",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "48px 0",
    gap: 10,
  },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 14, color: "#475569" },
  findBtn: {
    marginTop: 6,
    padding: "8px 20px",
    background: "#6366f1",
    color: "#fff",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
  },
  countBadge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    color: "#a78bfa",
    background: "rgba(167,139,250,0.12)",
    border: "1px solid rgba(167,139,250,0.25)",
    padding: "5px 14px",
    borderRadius: 20,
    width: "fit-content",
  },
};

export default Subscriptions;