const express = require("express");
const router = express.Router();
const { isLogin } = require("../../middleware/auth")

/* GET home page. */
router.get("/", isLogin, (req, res, next) => {
  res.render("./reservation/main", { user: req.session.user });
});

module.exports = router;
