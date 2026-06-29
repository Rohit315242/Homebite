import { useState, useEffect } from "react";
import api from "../../../services/api";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mealTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
];

const foodTypes = [
  "Veg",
  "Non-Veg",
];

function MenuForm({
  refresh,
  selectedMenu,
  clearSelection,
}) {

  const [day, setDay] = useState("Monday");
  const [mealType, setMealType] = useState("Breakfast");
  const [foodType, setFoodType] = useState("Veg");
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Auto Fill while Edit

  useEffect(() => {

    if (!selectedMenu) {

      setDay("Monday");
      setMealType("Breakfast");
      setFoodType("Veg");
      setDishName("");
      setPrice("");
      setDescription("");

      return;

    }

    setDay(selectedMenu.day);
    setMealType(selectedMenu.mealType);
    setFoodType(selectedMenu.foodType);
    setDishName(selectedMenu.dishName);
    setPrice(selectedMenu.price);
    setDescription(selectedMenu.description || "");

  }, [selectedMenu]);

  const resetForm = () => {

    setDay("Monday");
    setMealType("Breakfast");
    setFoodType("Veg");
    setDishName("");
    setPrice("");
    setDescription("");

    if (clearSelection) {
      clearSelection();
    }

  };

  const saveMenu = async () => {

    if (!dishName || !price) {
      setError("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);
      setError("");
      setSuccess("");

      if (selectedMenu) {

        await api.put(
          `/menu/${selectedMenu._id}`,
          { day, mealType, foodType, dishName, price, description }
        );

        setSuccess("Menu Updated Successfully");

      } else {

        await api.post(
          "/menu",
          { day, mealType, foodType, dishName, price, description }
        );

        setSuccess("Menu Added Successfully");

      }

      resetForm();

      if (refresh) {
        refresh();
      }

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Unable to save menu."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div style={styles.card}>

      <h3 style={styles.title}>
        {selectedMenu ? "✏ Edit Menu" : "🍽 Add Daily Menu"}
      </h3>

      {success && (
        <div style={styles.success}>
          {success}
        </div>
      )}

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      <div style={styles.grid}>

        <div>
          <label style={styles.label}>Day</label>
          <select
            style={styles.input}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label}>Meal Type</label>
          <select
            style={styles.input}
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            {mealTypes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

      </div>

      <label style={styles.label}>Food Type</label>
      <select
        style={styles.input}
        value={foodType}
        onChange={(e) => setFoodType(e.target.value)}
      >
        {foodTypes.map((food) => (
          <option key={food} value={food}>{food}</option>
        ))}
      </select>

      <label style={styles.label}>Dish Name</label>
      <input
        style={styles.input}
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        placeholder="Enter Dish Name"
      />

      <label style={styles.label}>Price (₹)</label>
      <input
        type="number"
        style={styles.input}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price"
      />

      <label style={styles.label}>Description</label>
      <textarea
        rows={4}
        style={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
      />

      <div style={styles.btnRow}>

        <button
          style={styles.button}
          onClick={saveMenu}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : selectedMenu
            ? "✏ Update Menu"
            : "💾 Save Menu"}
        </button>

        {selectedMenu && (
          <button
            style={styles.cancelBtn}
            onClick={resetForm}
          >
            Cancel
          </button>
        )}

      </div>

    </div>

  );

}

const styles = {

  card: {
    background: "#1e2130",
    borderRadius: 18,
    padding: 25,
    boxShadow: "0 10px 30px rgba(0,0,0,.3)",
    border: "1px solid #2d3348",
  },

  title: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#f1f5f9",
  },

  label: {
    display: "block",
    marginTop: 15,
    marginBottom: 6,
    fontWeight: "600",
    color: "#94a3b8",
    fontSize: 14,
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #2d3348",
    boxSizing: "border-box",
    background: "#0f1117",
    color: "#f1f5f9",
    fontSize: 15,
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #2d3348",
    resize: "vertical",
    boxSizing: "border-box",
    background: "#0f1117",
    color: "#f1f5f9",
    fontSize: 15,
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  btnRow: {
    display: "flex",
    gap: 12,
    marginTop: 25,
  },

  button: {
    flex: 1,
    padding: 14,
    border: "none",
    borderRadius: 10,
    background: "#e11d48",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: 15,
  },

  cancelBtn: {
    padding: "14px 20px",
    border: "1px solid #2d3348",
    borderRadius: 10,
    background: "#0f1117",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: "600",
  },

  success: {
    background: "#052e16",
    color: "#4ade80",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    border: "1px solid #166534",
  },

  error: {
    background: "#2d0a0a",
    color: "#f87171",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    border: "1px solid #7f1d1d",
  },

};

export default MenuForm;