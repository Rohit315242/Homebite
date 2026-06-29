const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const reviewRoutes = require("./routes/reviewRoutes");

// Load Environment Variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// =============================
// Middlewares
// =============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// =============================
// API Routes
// =============================

// Owner
app.use("/api/owner", require("./routes/ownerRoutes"));

// User
app.use("/api/user", require("./routes/userRoutes"));

// Mess
app.use("/api/mess", require("./routes/messRoutes"));

// Menu
app.use("/api/menu", require("./routes/menuRoutes"));

// Reviews
app.use("/api/reviews", require("./routes/reviewRoutes"));

// Subscriptions
app.use("/api/subscriptions", require("./routes/subscriptionRoutes"));

// Payments
app.use("/api/payments", require("./routes/paymentRoutes"));

// Analytics
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// AI Chat
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/attendance",require("./routes/attendanceRoutes"));


// =============================
// Health Check
// =============================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "🚀 HomeBite Backend Running Successfully"

    });

});

// =============================
// Error Handler
// =============================

app.use(errorHandler);

// =============================
// Start Server
// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Production server running on port ${PORT}`);

});