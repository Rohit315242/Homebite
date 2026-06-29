import { useEffect, useState } from "react";
import api from "../../../services/api";

function OwnerReviews() {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =====================================
  // Load Reviews
  // =====================================

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      console.log("🚀 Calling Owner Reviews API...");
      const res = await api.get("/reviews/owner/all");
      console.log("✅ API Response:", res.data);
      setReviews(res.data.reviews || []);
      setAverageRating(res.data.averageRating || 0);
      setTotalReviews(res.data.totalReviews || 0);
    } catch (err) {
      console.log("❌ Error:", err);
      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Search Reviews
  // =====================================

  const filteredReviews = reviews.filter((review) =>
    review.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div style={s.loading}>Loading Reviews...</div>;
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <h2 style={s.headerTitle}>⭐ Reviews</h2>
        <p style={s.headerSub}>View all reviews submitted by users.</p>
      </div>

      {/* Summary */}
      <div style={s.summaryGrid}>
        <div style={s.summaryCard}>
          <div style={s.summaryValue}>⭐ {averageRating}</div>
          <div style={s.summaryLabel}>Average Rating</div>
        </div>
        <div style={s.summaryCard}>
          <div style={s.summaryValue}>{totalReviews}</div>
          <div style={s.summaryLabel}>Total Reviews</div>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by user name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={s.search}
      />

      {/* Review List */}
      {filteredReviews.length === 0 ? (
        <div style={s.empty}>No Reviews Found</div>
      ) : (
        <div style={s.reviewList}>
          {filteredReviews.map((review) => (
            <div key={review._id} style={s.reviewCard}>
              <div style={s.reviewTop}>
                <div>
                  <div style={s.userName}>👤 {review.user?.name}</div>
                  <div style={s.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={s.rating}>{"⭐".repeat(review.rating)}</div>
              </div>
              <div style={s.comment}>{review.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    padding: 24,
    background: "#0f1117",
    minHeight: "100vh",
  },

  loading: {
    textAlign: "center",
    padding: 50,
    fontSize: 18,
    color: "#94a3b8",
    fontWeight: "600",
    background: "#0f1117",
    minHeight: "100vh",
  },

  header: {
    marginBottom: 25,
  },

  headerTitle: {
    color: "#f1f5f9",
    margin: 0,
    fontSize: 24,
    fontWeight: "700",
  },

  headerSub: {
    color: "#64748b",
    marginTop: 6,
    fontSize: 14,
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 20,
    marginBottom: 25,
  },

  summaryCard: {
    background: "#1e2130",
    borderRadius: 14,
    padding: 25,
    textAlign: "center",
    border: "1px solid #2d3348",
    boxShadow: "0 4px 16px rgba(0,0,0,.3)",
  },

  summaryValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#60a5fa",
  },

  summaryLabel: {
    marginTop: 8,
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "600",
  },

  search: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #2d3348",
    marginBottom: 25,
    outline: "none",
    fontSize: 15,
    background: "#1e2130",
    color: "#f1f5f9",
    boxSizing: "border-box",
  },

  empty: {
    textAlign: "center",
    padding: 40,
    background: "#1e2130",
    borderRadius: 12,
    color: "#475569",
    border: "1px solid #2d3348",
  },

  reviewList: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  reviewCard: {
    background: "#1e2130",
    borderRadius: 14,
    padding: 20,
    border: "1px solid #2d3348",
    boxShadow: "0 3px 12px rgba(0,0,0,.25)",
  },

  reviewTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  userName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#f1f5f9",
  },

  reviewDate: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  rating: {
    fontSize: 22,
  },

  comment: {
    fontSize: 15,
    color: "#94a3b8",
    lineHeight: 1.6,
  },
};

export default OwnerReviews;