require("dotenv").config();

const connectDB = require("../config/db");

const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");
const Mess = require("../models/Mess");
async function seedPayments() {

  try {

    await connectDB();

    await Payment.deleteMany({});

    console.log("🗑 Old Payments Deleted");

    const subscriptions = await Subscription.find();

    console.log(
      "Subscriptions :",
      subscriptions.length
    );
        for (const sub of subscriptions) {

      const mess = await Mess.findById(sub.mess);

      if (!mess) continue;

      await Payment.create({

        user: sub.user,

        mess: sub.mess,

        amount: mess.subscriptionPrice,

        status: "paid",

        razorpayOrderId:
          "order_" + Math.random().toString(36).substring(2, 12),

        razorpayPaymentId:
          "pay_" + Math.random().toString(36).substring(2, 12),

      });

    }

    console.log(
      `✅ ${subscriptions.length} Payments Created`
    );

    process.exit();

  } catch (err) {

    console.error("❌ Payment Seed Error:", err);

    process.exit(1);

  }

}

seedPayments();