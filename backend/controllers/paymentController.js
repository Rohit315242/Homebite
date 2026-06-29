console.log("✅ Payment Controller Loaded");
const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET,

});
exports.createOrder = async (req, res) => {

    try {
console.log("BODY:", req.body);
console.log("KEY:", process.env.RAZORPAY_KEY_ID);

const { messId } = req.body;
        

const Mess = require("../models/Mess");

const mess = await Mess.findById(messId);

if (!mess) {

    return res.status(404).json({

        message: "Mess not found",

    });

}

const amount = mess.subscriptionPrice;
console.log("MESS:", mess);
console.log("AMOUNT:", amount);
        const order = await razorpay.orders.create({

            amount: amount * 100,

            currency: "INR",

            receipt: `HB${Date.now()}`,

        });

        res.json(order);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
            "Order Failed",

        });

    }

}; exports.verifyAndSavePayment = async (req, res) => {

    try {
const { messId } = req.body;

const Mess = require("../models/Mess");

const mess = await Mess.findById(messId);

if (!mess) {

    return res.status(404).json({

        message: "Mess not found",

    });

}

const amount = mess.subscriptionPrice;

        // Already Paid?
        const existingPayment = await Payment.findOne({

            user: req.user.id,
            mess: messId,
            amount,
            status: "paid",

        });

        if (existingPayment) {

            return res.status(400).json({

                message: "Payment already exists."

            });

        }

        // Save Payment
        const payment = await Payment.create({

    user: req.user.id,

    mess: messId,

    amount,

    status: "paid",

    razorpayOrderId: req.body.razorpay_order_id || "",

    razorpayPaymentId: req.body.razorpay_payment_id || "",

     });

        // Check Subscription
        let subscription = await Subscription.findOne({

            user: req.user.id,

            mess: messId,

        });

        if (subscription) {

            subscription.status = "active";
            subscription.plan = "monthly";

            await subscription.save();

        } else {

            subscription = await Subscription.create({

                user: req.user.id,

                mess: messId,

                plan: "monthly",

                status: "active",

            });

        }

        res.json({

            success: true,

            message: "Payment Successful",

            payment,

            subscription,

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Payment Verification Failed",

        });

    }

};
exports.getPayments = async (req, res) => {
  try {

    const payments = await Payment.find({
      user: req.user.id,
    })
      .populate("mess", "name location subscriptionPrice")
      .sort({ _id: -1 }) // ← newest top la

    res.json(payments);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Unable to fetch payments",
    });

  }
};
// ======================================
// Owner Payments
// ======================================

exports.getOwnerPayments = async (req, res) => {

  try {

    const Mess = require("../models/Mess");

    const mess = await Mess.findOne({

      owner: req.user.id,

    });

    if (!mess) {

      return res.json([]);

    }

    const payments = await Payment.find({

      mess: mess._id,

      status: "paid",

    })

      .populate("user", "name email")

      .populate("mess", "name")

      .sort({ _id: -1 }) // ← newest top la

    res.json(payments);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Unable to fetch owner payments",

    });

  }

};