const express = require("express");
const router = express.Router();

const AdminController = require("./controller");

router.get("/main", AdminController.mainPage);
router.get("/manage", AdminController.manageEquipment);

module.exports = router;