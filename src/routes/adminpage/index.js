const express = require("express");
const router = express.Router();

const AdminController = require("./controller");

router.get("/main", AdminController.mainPage);

module.exports = router;