const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const attendance = require("../controllers/attendanceController");



router.post("/mark", auth, attendance.markAttendance);


router.get("/my", auth, attendance.getMyAttendance);


router.get("/today", auth, attendance.checkTodayAttendance);


router.get("/owner", auth, attendance.getOwnerAttendance);


router.get("/owner-members", auth, attendance.getOwnerMembers);

module.exports = router;