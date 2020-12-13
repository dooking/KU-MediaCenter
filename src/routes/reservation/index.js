const express = require("express");
const router = express.Router();

const EquipmentRouter = require("./equipment");
const ReservationController = require("./controller");
const { isLogin } = require("../../middleware/auth")

/* GET home page. */
router.get("/", ReservationController.mainPage);

router.use("/equipment", EquipmentRouter);

module.exports = router;
