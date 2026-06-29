import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const endpoint =
        role === "owner"
          ? "/owner/register"
          : "/user/register";

      await api.post(endpoint, {
  name,
  email,
  password,
});


      setMessage("Signup successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      console.error(err);
      setMessage("Signup failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>

      {message && <p>{message}</p>}

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="owner">Owner</option>
      </select>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

export default Signup;
