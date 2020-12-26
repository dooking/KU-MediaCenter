const express = require("express");
const router = express.Router();

const ReservationController = require("./controller");
const { isLogin } = require("../../middleware/auth");

router.get("/intro", ReservationController.equipmentIntro);
router.get("/step1", ReservationController.equipmentStep1);

module.exports = router;
