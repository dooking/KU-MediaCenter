const express = require("express");
const router = express.Router();

const AdminController = require("./controller");

router.get("/main", AdminController.mainPage);

// 장비 관리
router.get("/manage/equipment", AdminController.manageEquipment);
router.get("/manage/equipment/add", AdminController.addEquipment);
router.get("/manage/equipment/detail/:id", AdminController.detailEquipment);
router.get("/manage/equipment/update/:id", AdminController.modifyEquipment);
router.get("/manage/equipment/history/:id", AdminController.historyEquipment);

router.post("/manage/equipment/add", AdminController.createEquipment);
router.post("/manage/equipment/update/:id", AdminController.updateEquipment);
router.post("/manage/equipment/delete", AdminController.deleteEquipment);

// 유저 관리
router.get("/manage/user", AdminController.manageUser);
router.get("/manage/user/detail/:id", AdminController.detailUser);
router.get("/manage/user/history/:id", AdminController.historyUser);

module.exports = router;