const express = require("express");
const router = express.Router();

const AdminController = require("./controller");

router.get("/main", AdminController.mainPage);

router.get("/manage/equipment", AdminController.manageEquipment);
router.get("/manage/equipment/add", AdminController.addEquipment);
router.get("/manage/equipment/detail/:id", AdminController.detailEquipment);
router.get("/manage/equipment/update/:id", AdminController.modifyEquipment);
router.get("/manage/equipment/history/:id", AdminController.historyEquipment);

router.post("/manage/equipment/add", AdminController.createEquipment);
router.post("/manage/equipment/update/:id", AdminController.updateEquipment);
router.post("/manage/equipment/delete", AdminController.deleteEquipment);

module.exports = router;