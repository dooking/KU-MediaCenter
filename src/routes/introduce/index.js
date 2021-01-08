const express = require("express");
const router = express.Router();

const IntroRouter = require("./introduce");
const IntroduceController = require("./controller");

/* GET home page. */
router.use("/introduce", IntroRouter);

router.get("/", IntroduceController.tab8);

module.exports = router;
