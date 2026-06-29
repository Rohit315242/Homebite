import { useState, useEffect } from "react";
import api from "../../../services/api";

function MessProfile() {
  const [name, setName]                   = useState("");
  const [location, setLocation]           = useState("");
  const [description, setDescription]     = useState("");
  const [mess, setMess]                   = useState(null);
  const [editMode, setEditMode]           = useState(false);
  const [loading, setLoading]             = useState(true);
  const [saving, setSaving]               = useState(false);
  const [error, setError]                 = useState(null);
  const [success, setSuccess]             = useState(null);
  const [subscriptionPrice, setSubscriptionPrice] = useState("");

  const fetchMess = async () => {
    try {
      const res = await api.get("/mess/owner");
      setMess(res.data);
      if (res.data) {
        setName(res.data.name);
        setLocation(res.data.location);
        setSubscriptionPrice(res.data.subscriptionPrice || "");
        setDescription(res.data.description || "");
      }
    } catch (err) {
      console.error("Failed to fetch mess:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMess(); }, []);

  const saveMess = async () => {
    if (!name || !location) {
      setError("Please fill all fields.");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      if (mess) {
        await api.put(`/mess/${mess._id}`, { name, location, subscriptionPrice, description });
        setSuccess("Mess updated successfully!");
        setEditMode(false);
      } else {
        await api.post("/mess", { name, location, subscriptionPrice, description });
        setSuccess("Mess created successfully!");
      }
      fetchMess();
    } catch (err) {
      console.error("Save failed:", err);
      setError("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setName(mess?.name || "");
    setLocation(mess?.location || "");
    setSubscriptionPrice(mess?.subscriptionPrice || "");
    setDescription(mess?.description || "");
    setEditMode(false);
    setError(null);
  };

  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <div style={s.loadingText}>Loading mess profile...</div>
      </div>
    );
  }

  const isDisabled = !editMode && !!mess;

  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header}>
        <h2 style={s.title}>🏠 Mess Profile</h2>
        <p style={s.subtitle}>
          {mess ?" Manage your mess information, pricing and description" : "Create your mess profile"}
        </p>
      </div>

      {/* Form Card */}
      <div style={s.card}>
        <div style={s.cardTitle}>
          {mess ? "Mess Details" : "Create Mess"}
        </div>

        {/* Mess Name */}
        <div style={s.fieldWrap}>
          <label style={s.label}>Mess Name</label>
          <input
            style={{ ...s.input, ...(isDisabled ? s.inputDisabled : {}) }}
            value={name}
            disabled={isDisabled}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter mess name"
          />
        </div>

        {/* Location */}
        <div style={s.fieldWrap}>
          <label style={s.label}>Location</label>
          <input
            style={{ ...s.input, ...(isDisabled ? s.inputDisabled : {}) }}
            value={location}
            disabled={isDisabled}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        {/* Monthly Subscription Price */}
        <div style={s.fieldWrap}>
          <label style={s.label}>Monthly Subscription Price (₹)</label>
          <input
            type="number"
            style={{ ...s.input, ...(isDisabled ? s.inputDisabled : {}) }}
            value={subscriptionPrice}
            disabled={isDisabled}
            onChange={(e) => setSubscriptionPrice(e.target.value)}
            placeholder="Enter monthly subscription price"
          />
        </div>

        {/* Description */}
        <div style={s.fieldWrap}>
          <label style={s.label}>Description</label>
          <textarea
            rows={3}
            style={{ ...s.textarea, ...(isDisabled ? s.inputDisabled : {}) }}
            value={description}
            disabled={isDisabled}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell users about your mess, meal timings, speciality and facilities..)"
          />
        </div>

        {/* Error / Success */}
        {error && <div style={s.errorMsg}>❌ {error}</div>}
        {success && <div style={s.successMsg}>✅ {success}</div>}

        {/* Buttons */}
        <div style={s.btnRow}>
          {mess && !editMode ? (
            <button
              style={s.editBtn}
              onClick={() => { setEditMode(true); setSuccess(null); }}
            >
              ✏️ Edit
            </button>
          ) : (
            <>
              <button
                style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }}
                onClick={saveMess}
                disabled={saving}
              >
                {saving ? "Saving..." : mess ? "Update" : "Create Mess"}
              </button>
              {mess && (
                <button style={s.cancelBtn} onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Saved Mess Display */}
      {mess && (
        <div style={s.messCard}>
          <div style={s.messCardTop}>
            <div style={s.messIcon}>🍽</div>
            <div>
              <div style={s.messName}>{mess.name}</div>
              <div style={s.messLocation}>📍 {mess.location}</div>
              <div style={s.messLocation}>💰 ₹{mess.subscriptionPrice}/month</div>
              {mess.description && (
                <div style={s.messDesc}>📝 {mess.description}</div>
              )}
            </div>
          </div>
          <div style={s.activeBadge}>● Active</div>
        </div>
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
  loadingWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#0f1117",
  },
  loadingText: { fontSize: 14, color: "#64748b" },
  header: { marginBottom: 4 },
  title: { fontSize: 22, fontWeight: 700, color: "#f1f5f9", margin: 0 },
  subtitle: { fontSize: 13, color: "#64748b", margin: "4px 0 0" },

  card: {
    background: "#1e2130",
    borderRadius: 16,
    padding: "20px 24px",
    border: "1px solid #2d3348",
    boxShadow: "0 4px 16px rgba(0,0,0,.3)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#f1f5f9" },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 600, color: "#94a3b8" },
  input: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #2d3348",
    fontSize: 13,
    color: "#f1f5f9",
    outline: "none",
    background: "#0f1117",
    transition: "border-color 0.15s",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #2d3348",
    fontSize: 13,
    color: "#f1f5f9",
    outline: "none",
    background: "#0f1117",
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box",
    width: "100%",
  },
  inputDisabled: {
    background: "#161820",
    color: "#475569",
    cursor: "not-allowed",
  },

  errorMsg: {
    fontSize: 13,
    color: "#f87171",
    background: "#2d0a0a",
    border: "1px solid #7f1d1d",
    padding: "10px 14px",
    borderRadius: 8,
  },
  successMsg: {
    fontSize: 13,
    color: "#4ade80",
    background: "#052e16",
    border: "1px solid #166534",
    padding: "10px 14px",
    borderRadius: 8,
  },

  btnRow: { display: "flex", gap: 10, marginTop: 4 },
  editBtn: {
    padding: "10px 24px",
    background: "#2d2508",
    color: "#fbbf24",
    border: "1px solid #78350f",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 24px",
    background: "#e11d48",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 20px",
    background: "#0f1117",
    color: "#94a3b8",
    border: "1px solid #2d3348",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },

  messCard: {
    background: "#1e2130",
    borderRadius: 16,
    padding: "18px 22px",
    border: "1px solid #2d3348",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messCardTop: { display: "flex", alignItems: "center", gap: 14 },
  messIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    background: "#2d0a14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    flexShrink: 0,
  },
  messName: { fontSize: 15, fontWeight: 700, color: "#f1f5f9" },
  messLocation: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  messDesc: { fontSize: 12, color: "#64748b", marginTop: 4, fontStyle: "italic" },
  activeBadge: {
    fontSize: 12,
    fontWeight: 600,
    color: "#4ade80",
    background: "#052e16",
    border: "1px solid #166534",
    padding: "4px 12px",
    borderRadius: 20,
  },
};

export default MessProfile;