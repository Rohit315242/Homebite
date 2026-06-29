const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");
const Mess = require("../models/Mess");

exports.getStats = async (req, res) => {
  try {

    
    const mess = await Mess.findOne({
      owner: req.user.id,
    });

    
    if (!mess) {
      return res.json({
        totalRevenue: 0,
        totalMembers: 0,
        activeMembers: 0,
        todayAttendance: 0,
      });
    }

    
    const revenueData = await Payment.aggregate([
      {
        $match: {
          mess: mess._id,
          status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueData[0]?.totalRevenue || 0;

    // Total Members
    const totalMembers =
      await Subscription.countDocuments({
        mess: mess._id,
      });

    const activeMembers =
      await Subscription.countDocuments({
        mess: mess._id,
        status: "active",
      });

    res.json({
      totalRevenue,
      totalMembers,
      activeMembers,
      todayAttendance: 0, 
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Analytics Error",
    });

  }
};