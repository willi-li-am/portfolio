const { createProject } = require("../service/projects.service");

const createProjectController = (req, res) => {
  try {
    if (!req.user.auth) throw new Error("Unauthorized");
    createProject(req.body, req.files)
      .then((newProject) => {
        res.status(200).json(newProject);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  createProjectController,
};
