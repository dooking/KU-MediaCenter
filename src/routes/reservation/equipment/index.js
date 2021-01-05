const express = require("express");
const moment = require('moment');
const router = express.Router();

const EquipmentController = require("./controller");

router.get("/intro", EquipmentController.intro);

router.get("/step1", EquipmentController.step1);
router.post("/step1", EquipmentController.step1);

router.get("/step2", EquipmentController.step1);
router.post("/step2", EquipmentController.step2);

router.post("/finish", EquipmentController.finish);

module.exports = router;
