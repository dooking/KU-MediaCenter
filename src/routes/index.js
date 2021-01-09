const express = require("express");
const router = express.Router();

const IntroduceService = require('../service/introduce-service')
const adminpageRouter = require("./adminpage/index");
const introduceRouter = require("./introduce/index");
const reservationRouter = require("./reservation/index");
const userRouter = require("./user/index");
const { isLogin } = require("../middleware/auth")

/* GET home page. */
router.get("/", async (req, res, next) => {
  const items = await IntroduceService.getTabs()
  res.render("./introduce/main.ejs", {
    items
});
});

router.use("/admin", adminpageRouter);
router.use("/introduce", introduceRouter);
router.use("/reservation", reservationRouter);
router.use("/user", userRouter);

module.exports = router;
