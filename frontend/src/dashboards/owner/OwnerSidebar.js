import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

const navItems = [
  { to: "/owner",               end: true, icon: "🏠", label: "Dashboard"    },
  { to: "/owner/mess",                     icon: "🍽", label: "Mess Profile" },
  { to: "/owner/menu",                     icon: "📋", label: "Menu"         },
  { to: "/owner/subscriptions",            icon: "👥", label: "Members"      },
  { to: "/owner/payments",                 icon: "💳", label: "Payments"     },
  { to: "/owner/analytics",               icon: "📊", label: "Analytics"    },
   { to: "/owner/reviews",               icon: "⭐", label: "reviews"    },
];

function OwnerSidebar() {
  const [owner, setOwner] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchOwner = async () => {
      try {
       
      } catch (err) {
        console.error("Failed to fetch owner profile:", err);
      }
    };

    fetchOwner();
  }, []);

  // ── Logout ────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={s.sidebar}>

      {/* Brand */}
      <div style={s.brand}>
        <div style={s.brandIcon}>🏠</div>
        <div>
          <div style={s.brandName}>HomeBite</div>
          <div style={s.brandSub}>Owner Panel</div>
        </div>
      </div>

      {/* Owner Profile */}
      <div style={s.profileCard}>
        <div style={s.avatar}>
          {owner.name?.charAt(0).toUpperCase() || "O"}
        </div>
        <div>
          <div style={s.name}>{owner.name || "Owner"}</div>
          <div style={s.role}>{owner.email || "Admin"}</div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={s.navSection}>
        <div style={s.navLabel}>Main</div>
        {navItems.map(({ to, end, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              ...s.navItem,
              ...(isActive ? s.activeItem : {}),
            })}
          >
            <span style={s.navIcon}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <div style={s.statusRow}>
          <div style={s.statusDot} />
          <span style={s.statusText}>System online</span>
        </div>
        <button onClick={handleLogout} style={s.logoutBtn}>
          <span>🚪</span> Log out
        </button>
      </div>

    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const s = {
  sidebar: {
    width: 240,
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
    borderRight: "1px solid #1e293b",
    overflowY: "auto",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "18px 16px 14px",
    borderBottom: "1px solid #1e293b",
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "#e11d48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  brandName: { fontSize: 14, fontWeight: 600, color: "#f1f5f9" },
  brandSub:  { fontSize: 11, color: "#64748b" },
  profileCard: {
    margin: "12px 12px 8px",
    background: "#1e293b",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid #334155",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#e11d48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
  },
  name: { fontSize: 13, fontWeight: 600, color: "#e2e8f0" },
  role: { fontSize: 11, color: "#64748b" },
  navSection: { padding: "6px 12px 2px" },
  navLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "#475569",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "4px 6px 6px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 12px",
    borderRadius: 8,
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: 13,
    border: "1px solid transparent",
    marginBottom: 2,
    transition: "all 0.15s",
  },
  activeItem: {
    background: "#4c0519",
    color: "#fda4af",
    border: "1px solid #9f1239",
  },
  navIcon: { fontSize: 16, width: 20, textAlign: "center" },
  divider: { height: 1, background: "#1e293b", margin: "8px 12px" },
  footer: {
    marginTop: "auto",
    padding: "12px 12px 18px",
    borderTop: "1px solid #1e293b",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
    padding: "0 4px",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#22c55e",
  },
  statusText: { fontSize: 11, color: "#475569" },
  logoutBtn: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #334155",
    background: "transparent",
    color: "#64748b",
    fontSize: 13,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10,
    transition: "all 0.15s",
  },
};

export default OwnerSidebar;