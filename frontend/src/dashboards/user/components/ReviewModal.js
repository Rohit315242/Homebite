import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import api from "../../../services/api";

function ReviewModal({ messId, open, onClose }) {

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (open) loadReviews();
  }, [open]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/reviews/${messId}`);
      setReviews(res.data.reviews || []);
      setAverageRating(res.data.averageRating || 0);
      setTotalReviews(res.data.totalReviews || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!comment.trim()) return alert("Please enter review.");
    try {
      setSubmitting(true);
      await api.post("/reviews", { messId, rating, comment });
      alert("Review Submitted Successfully");
      setRating(5);
      setComment("");
      loadReviews();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    (<>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

        .rm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
          backdrop-filter: blur(6px);
          padding: 12px;
          box-sizing: border-box;
        }

        .rm-modal {
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          background: #16162A;
          border: 1px solid #2A2A45;
          border-radius: 18px;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
          overflow: hidden;
        }

        /* Sticky header — never scrolls away */
        .rm-sticky-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px 12px;
          border-bottom: 1px solid #2A2A45;
          flex-shrink: 0;
          background: #16162A;
        }

        /* Scrollable body */
        .rm-body {
          overflow-y: auto;
          padding: 16px 18px 18px;
          flex: 1;
        }
        .rm-body::-webkit-scrollbar { width: 4px; }
        .rm-body::-webkit-scrollbar-track { background: transparent; }
        .rm-body::-webkit-scrollbar-thumb { background: #2A2A45; border-radius: 4px; }

        /* Header text */
        .rm-header {
          display: flex;
          flex-direction: column;
        }
        .rm-header-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #F0F0F0;
        }
        .rm-header-sub {
          font-size: 12px;
          color: #8888AA;
          margin-top: 2px;
        }
        .rm-close {
          background: #1E1E38;
          border: 1px solid #2A2A45;
          border-radius: 8px;
          width: 30px;
          height: 30px;
          font-size: 14px;
          cursor: pointer;
          color: #8888AA;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.15s, color 0.15s;
        }
        .rm-close:hover { border-color: #FF6B35; color: #FF6B35; }

        /* Summary */
        .rm-summary {
          background: linear-gradient(135deg, #1E1A00, #2A2000);
          border: 1px solid #3D3000;
          border-radius: 12px;
          padding: 14px 18px;
          text-align: center;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .rm-summary-rating {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #f59e0b;
        }
        .rm-summary-right {}
        .rm-summary-label {
          font-size: 9px;
          color: #92400e;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .rm-summary-count {
          font-size: 13px;
          color: #f59e0b;
          font-weight: 600;
          margin-top: 2px;
        }

        .rm-center {
          text-align: center;
          padding: 20px 0;
          font-size: 13px;
          color: #8888AA;
        }

        /* Review list */
        .rm-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
          max-height: 260px;
          overflow-y: auto;
        }
        .rm-list::-webkit-scrollbar { width: 3px; }
        .rm-list::-webkit-scrollbar-thumb { background: #2A2A45; border-radius: 4px; }

        .rm-review-card {
          background: #1C1C34;
          border: 1px solid #2A2A45;
          border-radius: 10px;
          padding: 12px 14px;
        }
        .rm-review-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
          gap: 8px;
        }
        .rm-review-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .rm-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6B35, #FF9A6C);
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 13px;
          font-family: 'Space Grotesk', sans-serif;
          flex-shrink: 0;
        }
        .rm-username {
          font-size: 13px;
          font-weight: 700;
          color: #F0F0F0;
          font-family: 'Space Grotesk', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rm-date {
          font-size: 10px;
          color: #8888AA;
          margin-top: 1px;
        }
        .rm-stars { font-size: 13px; flex-shrink: 0; }
        .rm-comment {
          font-size: 12px;
          color: #AAAACC;
          line-height: 1.55;
        }

        /* Form */
        .rm-form {
          border-top: 1px solid #2A2A45;
          padding-top: 14px;
        }
        .rm-form-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #F0F0F0;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .rm-star-row {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }
        .rm-star {
          font-size: 26px;
          cursor: pointer;
          user-select: none;
          transition: transform 0.1s;
        }
        .rm-star:hover { transform: scale(1.15); }

        .rm-textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #2A2A45;
          background: #1C1C34;
          color: #F0F0F0;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          resize: none;
          outline: none;
          box-sizing: border-box;
          margin-bottom: 12px;
          transition: border-color 0.15s;
        }
        .rm-textarea::placeholder { color: #8888AA; }
        .rm-textarea:focus { border-color: #FF6B35; }

        .rm-btn-row { display: flex; justify-content: flex-end; }
        .rm-submit {
          background: #22C55E;
          color: #fff;
          border: none;
          border-radius: 9px;
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          transition: opacity 0.15s;
        }
        .rm-submit:hover { opacity: 0.85; }
        .rm-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 480px) {
          .rm-modal { border-radius: 14px; }
          .rm-summary { flex-direction: column; gap: 4px; padding: 12px; }
          .rm-summary-rating { font-size: 24px; }
        }
      `}</style>

      <div className="rm-overlay">
        <div className="rm-modal">

          {/* Sticky header — X always visible */}
          <div className="rm-sticky-bar">
            <div className="rm-header">
              <div className="rm-header-title">⭐ Reviews</div>
              <div className="rm-header-sub">Share your experience</div>
            </div>
            <button className="rm-close" onClick={onClose} title="Close">✕</button>
          </div>

          {/* Scrollable body */}
          <div className="rm-body">

          {/* Summary */}
          <div className="rm-summary">
            <div className="rm-summary-rating">⭐ {averageRating}</div>
            <div className="rm-summary-right">
              <div className="rm-summary-label">Average Rating</div>
              <div className="rm-summary-count">{totalReviews} Reviews</div>
            </div>
          </div>

          {/* Reviews */}
          {loading ? (
            <div className="rm-center">Loading reviews…</div>
          ) : reviews.length === 0 ? (
            <div className="rm-center">No reviews yet — be the first!</div>
          ) : (
            <div className="rm-list">
              {reviews.map((review) => (
                <div key={review._id} className="rm-review-card">
                  <div className="rm-review-top">
                    <div className="rm-review-left">
                      <div className="rm-avatar">
                        {review.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <div className="rm-username">{review.user?.name}</div>
                        <div className="rm-date">
                          {new Date(review.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="rm-stars">{"⭐".repeat(review.rating)}</div>
                  </div>
                  <div className="rm-comment">{review.comment}</div>
                </div>
              ))}
            </div>
          )}

          {/* Write Review Form */}
          <div className="rm-form">
            <div className="rm-form-title">✍️ Write a Review</div>
            <div className="rm-star-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="rm-star"
                  onClick={() => setRating(star)}
                  style={{ color: star <= rating ? "#f59e0b" : "#3A3A5C" }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              rows={3}
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rm-textarea"
            />
            <div className="rm-btn-row">
              <button
                className="rm-submit"
                disabled={submitting}
                onClick={submitReview}
                style={{ opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? "Please wait…" : "Submit Review"}
              </button>
            </div>
          </div>

          </div>{/* end rm-body */}
        </div>
      </div>
    </>),
    document.body
  );
}

export default ReviewModal;