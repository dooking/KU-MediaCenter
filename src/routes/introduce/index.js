const express = require("express");
const router = express.Router();

const IntroRouter = require("./introduce");
const IntroduceController = require("./controller");

/* GET home page. */
router.get("/", IntroduceController.tab1);

router.use("/introduce", IntroRouter);

module.exports = router;
