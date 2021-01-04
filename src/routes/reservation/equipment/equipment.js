const express = require("express");
const router = express.Router();

const ReservationController = require("./controller");
const { isLogin } = require("../../../middleware/auth");

router.get("/intro", ReservationController.equipmentIntro);

router.get("/step1", ReservationController.equipmentStep1);
router.post("/step1", ReservationController.equipmentStep1);

router.get("/step2", ReservationController.equipmentStep1);
router.post("/step2", ReservationController.equipmentStep2);

router.post("/finish", ReservationController.equipmentFinish);

module.exports = router;