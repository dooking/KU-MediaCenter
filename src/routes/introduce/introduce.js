const express = require("express");
const router = express.Router();

const IntroduceController = require("./controller");

router.get("/tab1", IntroduceController.tab1);
router.get("/tab2", IntroduceController.tab2);
router.get("/tab3", IntroduceController.tab3);
router.get("/tab4", IntroduceController.tab4);
router.get("/tab5", IntroduceController.tab5);
router.get("/tab6", IntroduceController.tab6);
router.get("/tab7", IntroduceController.tab7);
router.get("/tab8", IntroduceController.tab8);


module.exports = router;