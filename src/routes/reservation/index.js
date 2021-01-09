const express = require("express");
const router = express.Router();

const EquipmentRouter = require("./equipment/index");
const ReservationController = require("./controller");
const { isLogin } = require("../../middleware/auth")

router.get("/", ReservationController.mainPage);

router.use("/equipment", EquipmentRouter);

module.exports = router;
