console.log(__filename);
console.log("✅ Payment Routes Loaded");
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const payment = require("../controllers/paymentController");

router.post("/order", payment.createOrder);

router.post("/verify", auth, payment.verifyAndSavePayment);

router.get("/", auth, payment.getPayments);

router.get("/my", auth, payment.getPayments);

router.get("/owner", auth, payment.getOwnerPayments);
router.get("/ping", (req, res) => {
  res.json({
    success: true,
    message: "Ping OK",
  });
});
module.exports = router;