import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      const endpoint =
        role === "owner" ? "/owner/register" : "/user/register";

      await api.post(endpoint, { name, email, password });

      const loginRes = await api.post(
        role === "owner" ? "/owner/login" : "/user/login",
        { email, password }
      );

      localStorage.setItem("token", loginRes.data.token);

      navigate(role === "owner" ? "/owner" : "/user");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={s.page}>

     
      <div style={s.bgCircle1} />
      <div style={s.bgCircle2} />

      <div style={s.wrapper}>

        {/* Left side — branding */}
        <div style={s.left}>
          <div style={s.tagline}>Join us today on</div>
          <div style={s.brand}>
            <span style={s.brandGreen}>Home</span>
            <span style={s.brandRed}>Bite</span>
          </div>
          <p style={s.brandDesc}>
            Create your account and start managing meals, finding messes, and tracking attendance — all in one place.
          </p>
          <div style={s.features}>
            <div style={s.featureItem}>🍽 Access daily menus</div>
            <div style={s.featureItem}>📍 Find nearby messes</div>
            <div style={s.featureItem}>🤖 AI Nutrition Assistant</div>
          </div>
        </div>

        {/* Right side — form */}
        <div style={s.card}>
          <h3 style={s.title}>Create Account</h3>
          <p style={s.subtitle}>Choose your role to get started</p>

          {/* Role Toggle */}
          <div style={s.roleRow}>
            <button
              style={{ ...s.roleBtn, ...(role === "user" ? s.roleActive : s.roleInactive) }}
              onClick={() => setRole("user")}
            >
              👤 User
            </button>
            <button
              style={{ ...s.roleBtn, ...(role === "owner" ? s.roleActive : s.roleInactive) }}
              onClick={() => setRole("owner")}
            >
              🏠 Owner
            </button>
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label}>Full Name</label>
            <input
              style={s.input}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label}>Email</label>
            <input
              style={s.input}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label}>Password</label>
            <input
              type="password"
              style={s.input}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button style={s.button} onClick={register}>
            Register →
          </button>

          <p style={s.loginHint}>
            Already have an account?{" "}
            <a href="/login" style={s.loginLink}>Login</a>
          </p>
        </div>

      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "linear-gradient(135deg, #f0f4ff 0%, #fef2f4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },

  bgCircle1: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "rgba(225, 29, 72, 0.06)",
    top: -100,
    right: -100,
    pointerEvents: "none",
  },

  bgCircle2: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "rgba(37, 99, 235, 0.06)",
    bottom: -80,
    left: -80,
    pointerEvents: "none",
  },

  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 60,
    maxWidth: 900,
    width: "100%",
    zIndex: 1,
  },

  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  tagline: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "500",
  },

  brand: {
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 1.1,
  },

  brandGreen: { color: "#16a34a" },
  brandRed: { color: "#e11d48" },

  brandDesc: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.7,
    maxWidth: 320,
    margin: 0,
  },

  features: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 8,
  },

  featureItem: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    background: "#fff",
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  },

  card: {
    flex: 1,
    background: "#fff",
    borderRadius: 20,
    padding: "36px 32px",
    boxShadow: "0 20px 50px rgba(0,0,0,.10)",
    border: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    maxWidth: 400,
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },

  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    margin: "-10px 0 0",
  },

  roleRow: {
    display: "flex",
    gap: 10,
  },

  roleBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
    border: "2px solid transparent",
  },

  roleActive: {
    background: "#e11d48",
    color: "#fff",
    border: "2px solid #e11d48",
  },

  roleInactive: {
    background: "#f8fafc",
    color: "#64748b",
    border: "2px solid #e2e8f0",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },

  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid #e2e8f0",
    background: "#f8fafc",
    color: "#0f172a",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "13px",
    borderRadius: 10,
    border: "none",
    background: "#e11d48",
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    cursor: "pointer",
    marginTop: 4,
  },

  loginHint: {
    textAlign: "center",
    fontSize: 13,
    color: "#94a3b8",
    margin: 0,
  },

  loginLink: {
    color: "#e11d48",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Register;