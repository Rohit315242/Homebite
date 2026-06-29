import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AttendanceCalendar from "./components/AttendanceCalendar";

function UserSidebar() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

       const profileRes = await fetch(
  "https://homebite-backend-lnkr.onrender.com/api/user/me",
  { headers }
);

const profileData = await profileRes.json();

setUser({
  name: profileData?.name || "User",
  email: profileData?.email || "",
});

        const subRes = await fetch("https://homebite-backend-lnkr.onrender.com/api/user/me", { headers });
        const subData = await subRes.json();
        setIsSubscribed(subData.length > 0);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { to: "/user", end: true, icon: "🏠", label: "Dashboard" },
    { to: "/user/search", icon: "🔍", label: "Search Mess" },
    { to: "/user/subscriptions", icon: "📦", label: "Subscriptions" },
    { to: "/user/payments", icon: "💳", label: "Payments" },
  ];

  const SidebarContent = () => (
    <div style={s.sidebar} className="sb-scroll">
      {/* Brand */}
      <div style={s.brand}>
        <div style={s.brandIcon}>🏠</div>
        <div>
          <div style={s.brandName}>HomeBite</div>
          <div style={s.brandSub}>User Panel</div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          style={s.closeBtn}
          className="sb-close-btn"
          aria-label="Close menu"
        >✕</button>
      </div>

      {/* Scrollable body */}
      <div style={s.body}>

        <div style={s.profileCard}>
          <div style={s.avatar}>
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div style={s.profileInfo}>
            <div style={s.profileName}>{user.name || "User"}</div>
            <div style={s.profileEmail}>{user.email || ""}</div>
            <div style={s.activeBadge}>● Active</div>
          </div>
        </div>

        <div style={s.section}>
          <div style={s.sectionLabel}>Main</div>
          {navItems.map(({ to, end, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={handleNavClick}
              className={({ isActive }) => "sb-nav-item" + (isActive ? " active" : "")}
            >
              <span style={s.navIcon}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </div>

        <div style={s.divider} />

        <div style={s.section}>
          <div style={s.sectionLabel}>Attendance</div>
          {loading ? (
            <div style={s.attMessage}>Loading...</div>
          ) : isSubscribed ? (
            <div style={s.attBox}><AttendanceCalendar /></div>
          ) : (
            <div style={s.lockedBox}>
              <span style={s.lockIcon}>🔒</span>
              <div style={s.lockedText}>Subscribe to a mess first</div>
              <NavLink to="/user/search" onClick={handleNavClick} style={s.subscribeBtn} className="sb-subscribe">
                Find a Mess
              </NavLink>
            </div>
          )}
        </div>

        <div style={s.divider} />

        <div style={s.section}>
          <div style={s.sectionLabel}>Account</div>
          <NavLink to="/user/profile" onClick={handleNavClick} className={({ isActive }) => "sb-nav-item" + (isActive ? " active" : "")}>
            <span style={s.navIcon}>👤</span>Profile
          </NavLink>
        </div>

      </div>

      {/* Sticky footer */}
      <div style={s.footer}>
        <div style={s.statusRow}>
          <div style={s.statusDot} />
          <span style={s.statusText}>System online</span>
        </div>
        <button onClick={handleLogout} style={s.logoutBtn} className="sb-logout">
          <span>🚪</span>Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }

        .sb-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 8px;
          color: #94a3b8; text-decoration: none;
          font-size: 13px; border: 1px solid transparent;
          margin-bottom: 2px;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .sb-nav-item:hover  { background: #1e293b; color: #e2e8f0; }
        .sb-nav-item.active { background: #1e1b4b; color: #a5b4fc; border-color: #3730a3; }
        .sb-logout:hover    { background: #1e293b !important; color: #e2e8f0 !important; border-color: #475569 !important; }
        .sb-subscribe:hover { background: #4f46e5 !important; }

        .sb-scroll::-webkit-scrollbar       { width: 4px; }
        .sb-scroll::-webkit-scrollbar-track  { background: transparent; }
        .sb-scroll::-webkit-scrollbar-thumb  { background: #1e293b; border-radius: 4px; }
        .sb-scroll::-webkit-scrollbar-thumb:hover { background: #334155; }

        /* Desktop: show sidebar, hide hamburger & drawer */
        .sb-desktop  { display: block; }
        .sb-hamburger{ display: none;  }
        .sb-close-btn{ display: none !important; }
        .sb-overlay  { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 99; }
        .sb-overlay.open { display: block; }
        .sb-drawer   { display: none; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }
        .sb-drawer.open  { display: block; animation: slideIn 0.22s ease; }

        /* Mobile: hide sidebar, show hamburger & drawer */
        @media (max-width: 768px) {
          .sb-desktop   { display: none !important; }
          .sb-hamburger { display: flex !important; }
          .sb-close-btn { display: flex !important; }
        }
      `}</style>

      {/* Desktop sidebar */}
      <div className="sb-desktop">
        <SidebarContent />
      </div>

      {/* Mobile hamburger topbar */}
      <div style={s.hamburgerBar} className="sb-hamburger">
        <button onClick={() => setMobileOpen(true)} style={s.hamburgerBtn} aria-label="Open menu">
          ☰
        </button>
        <div style={s.hamburgerBrand}>
          <div style={{ ...s.brandIcon, width: 28, height: 28, fontSize: 14, borderRadius: 7 }}>🏠</div>
          <span style={{ ...s.brandName, fontSize: 13 }}>HomeBite</span>
        </div>
      </div>

      {/* Overlay */}
      <div className={`sb-overlay${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(false)} />

      {/* Mobile drawer */}
      <div className={`sb-drawer${mobileOpen ? " open" : ""}`}>
        <SidebarContent />
      </div>
    </>
  );
}

const s = {
  sidebar: {
    width: 240,
    height: "100vh",
    position: "sticky",
    top: 0,
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', sans-serif",
    borderRight: "1px solid #1e293b",
    overflowY: "auto",
    flexShrink: 0,
  },
  brand: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "18px 16px 14px",
    borderBottom: "1px solid #1e293b",
    flexShrink: 0,
    position: "sticky", top: 0,
    background: "#0f172a", zIndex: 1,
  },
  brandIcon: {
    width: 36, height: 36, borderRadius: 10,
    background: "#6366f1",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, flexShrink: 0,
  },
  brandName: { fontSize: 14, fontWeight: 600, color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" },
  brandSub:  { fontSize: 11, color: "#64748b" },
  closeBtn: {
    marginLeft: "auto", background: "transparent", border: "none",
    color: "#64748b", fontSize: 16, cursor: "pointer",
    padding: "4px 6px", borderRadius: 6, lineHeight: 1,
  },
  body: { flex: 1, overflowY: "auto", padding: "8px 0" },
  profileCard: {
    margin: "12px 12px 8px", background: "#1e293b",
    borderRadius: 12, padding: 12,
    display: "flex", alignItems: "center", gap: 10,
    border: "1px solid #334155",
  },
  avatar: {
    width: 38, height: 38, borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14, fontWeight: 700, color: "#fff",
    flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif",
  },
  profileInfo:  { minWidth: 0 },
  profileName:  { fontSize: 13, fontWeight: 600, color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  profileEmail: { fontSize: 10, color: "#64748b", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  activeBadge:  { fontSize: 10, fontWeight: 600, color: "#22c55e", marginTop: 3 },
  section:      { padding: "6px 12px 4px" },
  sectionLabel: { fontSize: 10, fontWeight: 600, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 6px 6px" },
  navIcon:      { fontSize: 15, width: 20, textAlign: "center", flexShrink: 0 },
  divider:      { height: 1, background: "#1e293b", margin: "6px 12px" },
  attMessage:   { fontSize: 12, color: "#64748b", padding: "6px 6px" },
  attBox:       { background: "#1e293b", borderRadius: 12, padding: 12, border: "1px solid #334155" },
  lockedBox:    { background: "#1e293b", borderRadius: 12, padding: "16px 12px", border: "1px solid #334155", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" },
  lockIcon:     { fontSize: 22 },
  lockedText:   { fontSize: 12, color: "#64748b", lineHeight: 1.4 },
  subscribeBtn: { marginTop: 2, padding: "7px 16px", background: "#6366f1", color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none", display: "inline-block", transition: "background 0.15s" },
  footer: {
    flexShrink: 0, padding: "12px 12px 18px",
    borderTop: "1px solid #1e293b",
    background: "#0f172a",
    position: "sticky", bottom: 0,
  },
  statusRow:  { display: "flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "0 4px" },
  statusDot:  { width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulseGreen 2s ease-in-out infinite" },
  statusText: { fontSize: 11, color: "#475569" },
  logoutBtn:  { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#64748b", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s", fontFamily: "'Inter', sans-serif" },
  hamburgerBar: {
    alignItems: "center", gap: 12,
    padding: "12px 16px",
    background: "#0f172a",
    borderBottom: "1px solid #1e293b",
    position: "sticky", top: 0, zIndex: 50,
    width: "100%", boxSizing: "border-box",
  },
  hamburgerBtn: { background: "transparent", border: "1px solid #1e293b", color: "#94a3b8", fontSize: 18, cursor: "pointer", padding: "6px 10px", borderRadius: 8, lineHeight: 1 },
  hamburgerBrand: { display: "flex", alignItems: "center", gap: 8 },
};

export default UserSidebar;