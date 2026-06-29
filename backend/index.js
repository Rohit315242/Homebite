const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const reviewRoutes = require("./routes/reviewRoutes");


dotenv.config();

// Connect MongoDB
connectDB();

const app = express();



app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));





app.use("/api/owner", require("./routes/ownerRoutes"));


app.use("/api/user", require("./routes/userRoutes"));


app.use("/api/mess", require("./routes/messRoutes"));


app.use("/api/menu", require("./routes/menuRoutes"));


app.use("/api/reviews", require("./routes/reviewRoutes"));


app.use("/api/subscriptions", require("./routes/subscriptionRoutes"));


app.use("/api/payments", require("./routes/paymentRoutes"));


app.use("/api/analytics", require("./routes/analyticsRoutes"));


app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/attendance",require("./routes/attendanceRoutes"));




app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "🚀 HomeBite Backend Running Successfully"

    });

});



app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Production server running on port ${PORT}`);

});