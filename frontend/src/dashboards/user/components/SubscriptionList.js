function SubscriptionList({ subs }) {
  if (!subs || subs.length === 0) {
    return <div style={s.empty}>No subscriptions found</div>;
  }

  return (
    <div style={s.list}>
      {subs.map((sub) => (
        <div key={sub._id} style={s.card}>

          {/* Left — Mess Info */}
          <div style={s.cardLeft}>
            <div style={s.messIcon}>🍽</div>
            <div>
              <div style={s.messName}>
                {sub.mess?.name || "Mess"}
              </div>
              <div style={s.messLocation}>
                📍 {sub.mess?.location || "Location not available"}
              </div>
              <div style={s.messPrice}>
                💰 ₹{sub.mess?.subscriptionPrice || 0} / month
              </div>
            </div>
          </div>

          {/* Right — Status + Date */}
          <div style={s.cardRight}>
            <div
              style={{
                ...s.badge,
                ...(sub.status === "active" ? s.badgeActive : s.badgeInactive),
              }}
            >
              {sub.status === "active" ? "● Active" : "● Inactive"}
            </div>

            {sub.createdAt && (
              <div style={s.date}>
                Since {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}

const s = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  empty: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    padding: "40px 0",
  },
  card: {
    background: "#1e2130",
    borderRadius: 14,
    padding: "16px 20px",
    border: "1px solid #2d3348",
    boxShadow: "0 4px 12px rgba(0,0,0,.25)",
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
  messIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    background: "#1a1830",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    flexShrink: 0,
  },
  messName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#f1f5f9",
  },
  messLocation: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  messPrice: {
    fontSize: 12,
    fontWeight: 600,
    color: "#4ade80",
    marginTop: 4,
  },
  cardRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
    flexShrink: 0,
  },
  badge: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 20,
  },
  badgeActive: {
    background: "#052e16",
    color: "#4ade80",
    border: "1px solid #166534",
  },
  badgeInactive: {
    background: "#2d0a0a",
    color: "#f87171",
    border: "1px solid #7f1d1d",
  },
  date: {
    fontSize: 11,
    color: "#64748b",
  },
};

export default SubscriptionList;