import { useEffect, useState } from "react";
import api from "../../../services/api";

function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/user/me");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      await api.put("/user/me", profile);
      alert("Profile Updated Successfully ✅");
      setEditMode(false);
    } catch (err) {
      console.log(err);
      alert("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <div style={s.spinner} />
        <div style={s.loadingText}>Loading profile…</div>
      </div>
    );
  }

  const initials = profile.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

        .pf-input {
          width: 100%;
          padding: 11px 14px;
          background: #1C1C34;
          border: 1px solid #2A2A45;
          border-radius: 10px;
          font-size: 13px;
          color: #F0F0F0;
          font-family: 'Inter', sans-serif;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .pf-input:focus {
          border-color: #FF6B35;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.12);
        }
        .pf-input:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .pf-input::placeholder { color: #4A4A6A; }

        .pf-textarea {
          width: 100%;
          padding: 11px 14px;
          background: #1C1C34;
          border: 1px solid #2A2A45;
          border-radius: 10px;
          font-size: 13px;
          color: #F0F0F0;
          font-family: 'Inter', sans-serif;
          outline: none;
          resize: vertical;
          box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .pf-textarea:focus {
          border-color: #FF6B35;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.12);
        }
        .pf-textarea:disabled { opacity: 0.55; cursor: not-allowed; }

        .pf-edit-btn:hover  { background: #4f46e5 !important; transform: translateY(-1px); }
        .pf-save-btn:hover  { background: #15803d !important; transform: translateY(-1px); }
        .pf-cancel-btn:hover { background: #1C1C34 !important; color: #F0F0F0 !important; }
      `}</style>

      <div style={s.page}>
        <div style={s.shell}>

          {/* ── Left: Avatar card ── */}
          <div style={s.avatarCard}>
            <div style={s.avatarRing}>
              <div style={s.avatar}>{initials}</div>
            </div>
            <div style={s.avatarName}>{profile.name || "User"}</div>
            <div style={s.avatarEmail}>{profile.email || ""}</div>
            <div style={s.activeBadge}>● Active Member</div>

            <div style={s.avatarDivider} />

            <div style={s.infoRow}>
              <span style={s.infoIcon}>📱</span>
              <span style={s.infoVal}>{profile.phone || "Not set"}</span>
            </div>
            <div style={s.infoRow}>
              <span style={s.infoIcon}>📍</span>
              <span style={s.infoVal}>{profile.address || "Not set"}</span>
            </div>
          </div>

          {/* ── Right: Form card ── */}
          <div style={s.formCard}>

            {/* Header */}
            <div style={s.header}>
              <div>
                <div style={s.eyebrow}>ACCOUNT</div>
                <h2 style={s.title}>My Profile</h2>
                <p style={s.subtitle}>Manage your personal information</p>
              </div>
              <div style={s.btnGroup}>
                {editMode ? (
                  <>
                    <button
                      style={s.cancelBtn}
                      className="pf-cancel-btn"
                      onClick={() => setEditMode(false)}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      style={s.saveBtn}
                      className="pf-save-btn"
                      onClick={saveProfile}
                      disabled={saving}
                    >
                      {saving ? <><div style={s.btnSpinner} /> Saving…</> : "💾 Save"}
                    </button>
                  </>
                ) : (
                  <button
                    style={s.editBtn}
                    className="pf-edit-btn"
                    onClick={() => setEditMode(true)}
                  >
                    ✏ Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div style={s.divider} />

            {/* Form */}
            <div style={s.form}>

              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Your full name"
                    className="pf-input"
                  />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Email <span style={s.lockedBadge}>Locked</span></label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    disabled
                    className="pf-input"
                  />
                </div>
              </div>

              <div style={s.field}>
                <label style={s.label}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="Your phone number"
                  className="pf-input"
                />
              </div>

              <div style={s.field}>
                <label style={s.label}>Address</label>
                <textarea
                  rows={4}
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="Your delivery address"
                  className="pf-textarea"
                />
              </div>

            </div>

            {/* Edit mode hint */}
            {editMode && (
              <div style={s.hint}>
                ✦ Edit mode on — make your changes and hit Save
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

const T = {
  bg:     "#0F0F1A",
  card:   "#16162A",
  card2:  "#1C1C34",
  bdr:    "#2A2A45",
  orange: "#FF6B35",
  teal:   "#4ECDC4",
  text:   "#F0F0F0",
  muted:  "#8888AA",
  faint:  "#3A3A5C",
  green:  "#22C55E",
  disp:   "'Space Grotesk', sans-serif",
  body:   "'Inter', sans-serif",
};

const s = {
  page: {
    minHeight: "100vh",
    background: T.bg,
    padding: "24px 20px",
    fontFamily: T.body,
    boxSizing: "border-box",
  },

  shell: {
    maxWidth: 900,
    margin: "0 auto",
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    animation: "fadeUp 0.3s ease both",
  },

  /* ── Avatar card (left) ── */
  avatarCard: {
    width: 220,
    flexShrink: 0,
    background: T.card,
    border: `1px solid ${T.bdr}`,
    borderRadius: 16,
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  avatarRing: {
    padding: 3,
    borderRadius: "50%",
    background: `conic-gradient(${T.orange}, #FF9A6C, ${T.orange})`,
    marginBottom: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#1E1E38",
    border: `3px solid ${T.card}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
  },
  avatarName: {
    fontSize: 14,
    fontWeight: 700,
    color: T.text,
    fontFamily: T.disp,
    textAlign: "center",
    marginTop: 4,
  },
  avatarEmail: {
    fontSize: 11,
    color: T.muted,
    textAlign: "center",
    wordBreak: "break-all",
  },
  activeBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: T.green,
    marginTop: 2,
  },
  avatarDivider: {
    width: "100%",
    height: 1,
    background: T.bdr,
    margin: "10px 0",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 7,
    width: "100%",
    marginBottom: 4,
  },
  infoIcon: { fontSize: 13, flexShrink: 0, marginTop: 1 },
  infoVal: {
    fontSize: 11,
    color: T.muted,
    lineHeight: 1.5,
    wordBreak: "break-word",
  },

  /* ── Form card (right) ── */
  formCard: {
    flex: 1,
    background: T.card,
    border: `1px solid ${T.bdr}`,
    borderRadius: 16,
    padding: "22px 24px",
    minWidth: 0,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: 700,
    color: T.orange,
    letterSpacing: "0.14em",
    fontFamily: T.disp,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: T.text,
    margin: 0,
    fontFamily: T.disp,
  },
  subtitle: {
    fontSize: 12,
    color: T.muted,
    margin: "4px 0 0",
  },

  btnGroup: {
    display: "flex",
    gap: 8,
    flexShrink: 0,
  },
  editBtn: {
    padding: "9px 18px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 12,
    fontFamily: T.disp,
    transition: "background 0.15s, transform 0.1s",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  saveBtn: {
    padding: "9px 18px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 12,
    fontFamily: T.disp,
    transition: "background 0.15s, transform 0.1s",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  cancelBtn: {
    padding: "9px 14px",
    background: "transparent",
    color: T.muted,
    border: `1px solid ${T.bdr}`,
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 12,
    fontFamily: T.disp,
    transition: "all 0.15s",
  },
  btnSpinner: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    animation: "spin 0.7s linear infinite",
    display: "inline-block",
  },

  divider: {
    height: 1,
    background: T.bdr,
    marginBottom: 20,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: T.muted,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontFamily: T.disp,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  lockedBadge: {
    fontSize: 9,
    fontWeight: 700,
    color: "#475569",
    background: T.card2,
    border: `1px solid ${T.bdr}`,
    padding: "1px 6px",
    borderRadius: 4,
    letterSpacing: "0.05em",
  },

  hint: {
    marginTop: 16,
    fontSize: 11,
    color: T.orange,
    fontFamily: T.disp,
    opacity: 0.8,
  },

  /* Loading */
  loadingWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: T.bg,
    gap: 12,
  },
  spinner: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: `3px solid #2A2A45`,
    borderTopColor: T.orange,
    animation: "spin 0.7s linear infinite",
  },
  loadingText: {
    fontSize: 13,
    color: T.muted,
    fontFamily: T.disp,
  },
};

export default Profile;