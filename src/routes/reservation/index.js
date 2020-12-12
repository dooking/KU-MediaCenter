const express = require("express");
const router = express.Router();

const EquipmentRouter = require("./equipment");
const { isLogin } = require("../../middleware/auth")

/* GET home page. */
router.get("/", (req, res, next) => {
  console.log(req.session)

  res.render("./reservation/main", { user: req.session.user, otherObjects: {} });
});

router.use("/equipment", EquipmentRouter);

module.exports = router;
