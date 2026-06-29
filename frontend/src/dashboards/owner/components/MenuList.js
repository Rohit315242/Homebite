import { useEffect, useState } from "react";
import api from "../../../services/api";

function MenuList({ reload, onEdit }) {

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenus = async () => {

    try {

      const res = await api.get("/menu");

      setMenus(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchMenus();

  }, [reload]);

  const deleteMenu = async (id) => {

    const ok = window.confirm(
      "Delete this menu item?"
    );

    if (!ok) return;

    try {

      await api.delete(`/menu/${id}`);

      fetchMenus();

    } catch (err) {

      console.log(err);

    }

  };

  if (loading)
    return <p style={styles.loadingText}>Loading Menu...</p>;

  if (menus.length === 0)
    return (
      <div style={styles.empty}>
        No Menu Added Yet
      </div>
    );

  return (

    <div style={styles.grid}>

      {menus.map((menu) => (

        <div
          key={menu._id}
          style={styles.card}
        >

          <div style={styles.topRow}>

            <span style={styles.day}>
              {menu.day}
            </span>

            <span style={styles.price}>
              ₹ {menu.price}
            </span>

          </div>

          <h3 style={styles.dish}>
            {menu.dishName}
          </h3>

          <div style={styles.row}>

            <span style={styles.meal}>
              🍽 {menu.mealType}
            </span>

            <span
              style={{
                ...styles.food,
                background:
                  menu.foodType === "Veg"
                    ? "#052e16"
                    : "#2d0a0a",
                color:
                  menu.foodType === "Veg"
                    ? "#4ade80"
                    : "#f87171",
              }}
            >
              {menu.foodType}
            </span>

          </div>

          <p style={styles.description}>
            {menu.description || "No Description"}
          </p>

          <div style={styles.buttonRow}>

            <button
              style={styles.editBtn}
              onClick={() => onEdit(menu)}
            >
              ✏ Edit
            </button>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteMenu(menu._id)}
            >
              🗑 Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}

const styles = {

  loadingText: {
    color: "#94a3b8",
    padding: 20,
    textAlign: "center",
  },

  empty: {
    padding: 30,
    textAlign: "center",
    color: "#64748b",
    background: "#1e2130",
    borderRadius: 15,
    fontWeight: "600",
    border: "1px solid #2d3348",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill,minmax(300px,1fr))",
    gap: 20,
  },

  card: {
    background: "#1e2130",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 8px 24px rgba(0,0,0,.3)",
    border: "1px solid #2d3348",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  day: {
    background: "#e11d48",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },

  price: {
    color: "#4ade80",
    fontWeight: "700",
    fontSize: 18,
  },

  dish: {
    marginTop: 15,
    marginBottom: 10,
    color: "#f1f5f9",
    fontSize: 20,
    fontWeight: "700",
  },

  row: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
  },

  meal: {
    background: "#0f2044",
    color: "#60a5fa",
    padding: "5px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },

  food: {
    padding: "5px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },

  description: {
    color: "#94a3b8",
    fontSize: 14,
    minHeight: 50,
    marginBottom: 20,
    lineHeight: 1.6,
  },

  buttonRow: {
    display: "flex",
    gap: 12,
    marginTop: 10,
  },

  editBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: 10,
    background: "#facc15",
    color: "#111827",
    fontWeight: "600",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: 10,
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

};

export default MenuList;