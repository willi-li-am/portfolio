const express = require("express");
const { authenticate } = require("../middleware/auth");
const skillController = require("../controller/skills.controller");
const multer = require("multer");

const upload = multer();
const router = express.Router();

router.route("/").get(skillController.getSkillController);

router.post(
  "/",
  [upload.single("file"), authenticate],
  skillController.createSkillController,
);

router.route("/").patch([upload.single("file"), authenticate], skillController.updateSkillController);

router.route('/').delete(skillController.deleteSkillController)

module.exports = router;
