import { useEffect, useState } from "react";
import api from "../../../services/api";
console.log("✅ USER Payments Component Loaded");

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        console.log("➡️ Request:", api.defaults.baseURL + "/payments");
        const res = await api.get("/payments");
        console.log("Response:", res.data);
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        setError("Could not load payments");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header}>
        <h2 style={s.title}>💳 My Payments</h2>
        <p style={s.subtitle}>All your mess payment history</p>
      </div>

      {/* States */}
      {loading ? (
        <div style={s.centerMsg}>Loading payments...</div>

      ) : error ? (
        <div style={s.errorMsg}>{error}</div>

      ) : payments.length === 0 ? (
        <div style={s.emptyState}>
          <div style={s.emptyIcon}>💳</div>
          <div style={s.emptyText}>No payments yet</div>
          <a href="/user/search" style={s.findBtn}>Subscribe to a Mess</a>
        </div>

      ) : (
        <>
          {/* Summary Card */}
          <div style={s.summaryCard}>
            <div style={s.summaryItem}>
              <div style={s.summaryVal}>{payments.length}</div>
              <div style={s.summaryLabel}>Total Payments</div>
            </div>
            <div style={s.summaryDivider} />
            <div style={s.summaryItem}>
              <div style={{ ...s.summaryVal, color: "#a78bfa" }}>
                ₹{total}
              </div>
              <div style={s.summaryLabel}>Total Spent</div>
            </div>
            <div style={s.summaryDivider} />
            <div style={s.summaryItem}>
              <div style={{ ...s.summaryVal, color: "#4ade80" }}>
                ₹{payments[0]?.amount || 0}
              </div>
              <div style={s.summaryLabel}>Last Payment</div>
            </div>
          </div>

          {/* Payment List */}
          <div style={s.list}>
            {payments.map((p) => (
              <div key={p._id} style={s.card}>

                {/* Left */}
                <div style={s.cardLeft}>
                  <div style={s.payIcon}>💳</div>
                  <div>
                    <div style={s.messName}>
                      {p.mess?.name || "Mess"}
                    </div>
                    <div style={s.payDate}>
                      {new Date(p.date || p.createdAt).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div style={s.cardRight}>
                  <div style={s.amount}>₹{p.amount}</div>
                  <div style={s.successBadge}>✅ Paid</div>
                </div>

              </div>
            ))}
          </div>
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

  // Summary
  summaryCard: {
    background: "#1e2130",
    borderRadius: 16,
    padding: "20px 24px",
    border: "1px solid #2d3348",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 16,
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  summaryVal: {
    fontSize: 24,
    fontWeight: 700,
    color: "#f1f5f9",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    background: "#2d3348",
  },

  // Payment List
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    background: "#1e2130",
    borderRadius: 14,
    padding: "16px 20px",
    border: "1px solid #2d3348",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  cardLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  payIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#1a1830",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },
  messName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#f1f5f9",
  },
  payDate: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 3,
  },
  cardRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    flexShrink: 0,
  },
  amount: {
    fontSize: 17,
    fontWeight: 700,
    color: "#a78bfa",
  },
  successBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: "#4ade80",
    background: "#052e16",
    border: "1px solid #166534",
    padding: "3px 10px",
    borderRadius: 20,
  },
};

export default Payments;