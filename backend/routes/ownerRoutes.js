const express = require("express");
const router = express.Router();
const owner = require("../controllers/ownerController");
const auth = require("../middleware/auth");

router.post("/register", owner.register);
router.post("/login", owner.login);


router.get("/me", auth, owner.getProfile);

module.exports = router;
