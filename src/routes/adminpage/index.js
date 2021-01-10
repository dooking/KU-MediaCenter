const express = require("express");
const router = express.Router();

const AdminController = require("./controller");

router.get("/main", AdminController.mainPage);
router.get("/manage/equipment", AdminController.manageEquipment);
router.get("/manage/equipment/:id", AdminController.detailEquipment);

module.exports = router;