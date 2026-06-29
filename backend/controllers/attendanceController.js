const Attendance = require("../models/Attendance");
const Subscription = require("../models/Subscription");
const Mess = require("../models/Mess");

// Mark Today's Attendance


exports.markAttendance = async (req, res) => {

  try {

    const { messId } = req.body;

    // Check Active Subscription
    const subscription = await Subscription.findOne({
      user: req.user.id,
      mess: messId,
      status: "active",
    });

    if (!subscription) {
      return res.status(400).json({
        message: "Please subscribe first.",
      });
    }

    // Today's Date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Already Marked?
    const existing = await Attendance.findOne({
      user: req.user.id,
      mess: messId,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked today.",
      });
    }

    // Save Attendance
    const attendance = await Attendance.create({
      user: req.user.id,
      mess: messId,
      date: today,
      status: "present",
    });

    res.json({
      success: true,
      message: "Attendance Marked Successfully",
      attendance,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};



exports.getMyAttendance = async (req, res) => {

  try {

    
    const subscriptions = await Subscription.find({
      user: req.user.id,
      status: "active",
    });

   
    const startDateMap = {};
    subscriptions.forEach(sub => {
      startDateMap[sub.mess.toString()] = sub.startDate || sub.createdAt;
    });

   
    const allAttendance = await Attendance.find({
      user: req.user.id,
    })
      .populate("mess", "name location")
      .sort({ date: -1 });

   
    const attendance = allAttendance.filter(a => {
      const messId = a.mess?._id?.toString();
      const startDate = startDateMap[messId];
      if (!startDate) return false; 
      return new Date(a.date) >= new Date(startDate);
    });

    res.json(attendance);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Unable to fetch attendance",
    });

  }

};


// Check Today's Attendance


exports.checkTodayAttendance = async (req, res) => {

  try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      user: req.user.id,
      date: today,
    });

    res.json({
      marked: !!attendance,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// Owner Dashboard Attendance


exports.getOwnerAttendance = async (req, res) => {

  try {

    const mess = await Mess.findOne({
      owner: req.user.id,
    });

    if (!mess) {
      return res.json([]);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.find({
      mess: mess._id,
      date: today,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(attendance);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// Owner Members Details


exports.getOwnerMembers = async (req, res) => {

  try {

    const mess = await Mess.findOne({
      owner: req.user.id,
    });

    if (!mess) {
      return res.json([]);
    }

    const subscriptions = await Subscription.find({
      mess: mess._id,
      status: "active",
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const members = [];

    for (const sub of subscriptions) {

      
      const startDate = sub.startDate || sub.createdAt;

      const attendance = await Attendance.find({
        user: sub.user._id,
        mess: mess._id,
        date: { $gte: startDate }, 
      }).sort({ date: -1 });

      const attendanceDays = attendance.length;

      const lastMeal = attendanceDays > 0
        ? attendance[0].date
        : null;

      members.push({
        _id: sub.user._id,
        name: sub.user.name,
        email: sub.user.email,
        joinedDate: sub.createdAt,
        attendanceDays,
        lastMeal,
        status: sub.status,
      });

    }

    res.json(members);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};