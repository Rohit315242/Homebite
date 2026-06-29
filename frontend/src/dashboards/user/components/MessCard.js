import { useEffect, useState } from "react";
import api from "../../../services/api";
import ReviewModal from "./ReviewModal";

function MessCard({ mess }) {

  const [menus, setMenus] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    checkSubscription();
    loadRating();
  }, []);

  const checkSubscription = async () => {
    try {
      const res = await api.get(`/subscriptions/status/${mess._id}`);
      setSubscribed(res.data.subscribed);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRating = async () => {
    try {
      const res = await api.get(`/reviews/${mess._id}`);
      setAverageRating(res.data.averageRating);
      setTotalReviews(res.data.totalReviews);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubscribe = async () => {
    const confirmSub = window.confirm(
      `Subscribe to ${mess.name} for ₹${mess.subscriptionPrice}/month?`
    );
    if (!confirmSub) return;
    try {
      setLoading(true);
      const res = await api.post("/payments/order", { messId: mess._id });
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "HomeBite",
        description: `Subscription - ${mess.name}`,
        order_id: res.data.id,
        handler: async function (response) {
          try {
            await api.post("/payments/verify", {
              messId: mess._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            });
            setSubscribed(true);
            alert("Subscription Successful 🎉");
          } catch (err) {
            console.log(err);
            alert("Payment Verification Failed");
          }
        },
        prefill: { name: "", email: "" },
        theme: { color: "#FF6B35" },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.log(err);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    const confirmCancel = window.confirm(`Cancel subscription for ${mess.name}?`);
    if (!confirmCancel) return;
    try {
      await api.post("/subscriptions/cancel", { messId: mess._id });
      setSubscribed(false);
      alert("Subscription Cancelled");
    } catch (err) {
      console.log(err);
      alert("Unable to cancel subscription.");
    }
  };

  const loadMenu = async () => {
    try {
      const res = await api.get(`/menu/mess/${mess._id}`);
      setMenus(res.data);
      setShowMenu(!showMenu);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

        .mc-card {
          background: #16162A;
          border-radius: 14px;
          padding: 14px;
          border: 1px solid #2A2A45;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.2s, transform 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .mc-card:hover {
          border-color: #FF6B35;
          transform: translateY(-2px);
        }

        /* Top row */
        .mc-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }
        .mc-info { flex: 1; min-width: 0; }
        .mc-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #F0F0F0;
          white-space: normal;
          word-break: break-word;
          line-height: 1.3;
        }
        .mc-location {
          font-size: 11px;
          color: #8888AA;
          margin-top: 2px;
          white-space: normal;
          word-break: break-word;
        }
        .mc-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #f59e0b;
          margin-top: 5px;
        }
        .mc-review-count { color: #8888AA; font-weight: 400; }

        .mc-price {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #4ECDC4;
          text-align: right;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .mc-price span { font-size: 10px; color: #8888AA; font-weight: 400; }

        /* Buttons */
        .mc-btns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
        }
        .mc-btn {
          border: none;
          border-radius: 8px;
          padding: 8px 4px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          transition: opacity 0.15s, transform 0.15s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mc-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .mc-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .mc-btn-sub    { background: #FF6B35; color: #fff; }
        .mc-btn-cancel { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3) !important; }
        .mc-btn-menu   { background: #1E1E38; color: #F0F0F0; border: 1px solid #2A2A45 !important; }
        .mc-btn-review { background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25) !important; }

        /* Badge */
        .mc-badge {
          background: rgba(34,197,94,0.12);
          color: #22C55E;
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.03em;
        }

        /* Menu */
        .mc-menu-wrap {
          border-top: 1px solid #2A2A45;
          padding-top: 10px;
        }
        .mc-menu-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #F0F0F0;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .mc-menu-empty {
          text-align: center;
          color: #8888AA;
          font-size: 12px;
          padding: 12px 0;
        }
        .mc-menu-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 180px;
          overflow-y: auto;
        }
        .mc-menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 10px;
          background: #1C1C34;
          border-radius: 8px;
          border: 1px solid #2A2A45;
          gap: 8px;
        }
        .mc-dish-name {
          font-size: 12px;
          font-weight: 600;
          color: #F0F0F0;
          font-family: 'Space Grotesk', sans-serif;
        }
        .mc-dish-meta {
          font-size: 10px;
          color: #8888AA;
          margin-top: 1px;
        }
        .mc-dish-price {
          font-size: 12px;
          font-weight: 700;
          color: #4ECDC4;
          flex-shrink: 0;
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>

      <div className="mc-card">

   
        <div className="mc-top">
          <div className="mc-info">
            <div className="mc-name">{mess.name}</div>
            <div className="mc-location">📍 {mess.location}</div>
            <div className="mc-rating">
              ⭐ {averageRating || 0}
              <span className="mc-review-count">({totalReviews})</span>
            </div>
          </div>
          <div className="mc-price">
            ₹{mess.subscriptionPrice}
            <span>/mo</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mc-btns">
          {subscribed ? (
            <button className="mc-btn mc-btn-cancel" onClick={cancelSubscription}>
              ❌ Cancel
            </button>
          ) : (
            <button
              className="mc-btn mc-btn-sub"
              disabled={loading}
              onClick={handleSubscribe}
            >
              {loading ? "..." : `₹${mess.subscriptionPrice}`}
            </button>
          )}
          <button className="mc-btn mc-btn-menu" onClick={loadMenu}>
            {showMenu ? "Hide" : "Menu"}
          </button>
          <button className="mc-btn mc-btn-review" onClick={() => setShowReview(true)}>
            ⭐ Reviews
          </button>
        </div>

        {/* Subscribed Badge */}
        {subscribed && (
          <div className="mc-badge">✅ Subscription Active</div>
        )}

        {/* Menu */}
        {showMenu && (
          <div className="mc-menu-wrap">
            <div className="mc-menu-title">🍽 Today's Menu</div>
            {menus.length === 0 ? (
              <div className="mc-menu-empty">Menu not available</div>
            ) : (
              <div className="mc-menu-list">
                {menus.map((m) => (
                  <div key={m._id} className="mc-menu-item">
                    <div>
                      <div className="mc-dish-name">{m.dishName}</div>
                      <div className="mc-dish-meta">{m.mealType} • {m.foodType}</div>
                    </div>
                    <div className="mc-dish-price">₹{m.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Review Modal */}
        <ReviewModal
          messId={mess._id}
          open={showReview}
          onClose={() => {
            setShowReview(false);
            loadRating();
          }}
        />

      </div>
    </>
  );
}

export default MessCard;