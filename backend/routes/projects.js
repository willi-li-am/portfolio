const express = require("express");
const { authenticate } = require("../middleware/auth");
const projectController = require("..controller/projects.controller");
const multer = require("multer");
const {
  createProjectController,
} = require("../controller/projects.controller");

const upload = multer();
const router = express.Router();

router.route("/").get(); //get all projects, retrieve all info at once

router.post(
  "/",
  [upload.array("images", 10), authenticate],
  createProjectController,
);

router.route("/").patch([upload.single("file"), authenticate]);

router.route("/").delete(authenticate);

module.exports = router;
