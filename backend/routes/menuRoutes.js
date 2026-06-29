const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    createMenu,
    getMenu,
    updateMenu,
    deleteMenu,
    getMenuByMess,
} = require("../controllers/menuController");


router.post("/", auth, createMenu);

router.get("/", auth, getMenu);

router.delete("/:id", auth, deleteMenu);
router.put("/:id", auth, updateMenu);

router.get("/mess/:messId", getMenuByMess);

module.exports = router;