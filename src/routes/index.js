var express = require("express");
var router = express.Router();

var adminpageRouter = require("./adminpage/index");
var introduceRouter = require("./introduce/index");
var reservationRouter = require("./reservation/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/admin", adminpageRouter);
router.use("/introduce", introduceRouter);
router.use("/reservation", reservationRouter);

module.exports = router;
