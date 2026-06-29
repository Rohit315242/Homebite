const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const auth = require("../middleware/auth");


router.post("/register", user.register);
router.post("/login", user.login);


router.get("/me", auth, user.getProfile);
router.put("/me", auth, user.updateProfile);

module.exports = router;