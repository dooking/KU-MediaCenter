const express = require("express");
const router = express.Router();

const IntroRouter = require("./introduce");
const IntroduceController = require("./controller");

/* GET home page. */
router.use("", IntroRouter);

router.get("", IntroduceController.tab1);
// router.get("", IntroduceController.tab1);

module.exports = router;
