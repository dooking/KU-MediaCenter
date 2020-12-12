const express = require("express");
const router = express.Router();

const { isLogin } = require("../../middleware/auth")

/* GET home page. */
router.get("/intro", (req, res, next) => {
    res.render("./reservation/equipment/intro", { user: req.user });
});

router.get("/step1", (req, res, next) => {
    res.render("./reservation/equipment/step1", { user: req.user });
});

module.exports = router;
