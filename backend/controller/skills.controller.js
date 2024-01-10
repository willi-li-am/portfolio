const {
  createSkill,
  getAllSkill,
  updateSkill,
  deleteSkill,
} = require("../service/skills.service");

const getSkillController = async (req, res) => {
  getAllSkill()
    .then((skills) => {
      res.status(200).send(skills);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const createSkillController = (req, res) => {
  try {
    if (!req.user.auth) throw new Error("Unauthorized");

    createSkill(req.body.name, req.file, req.body.type)
      .then((newSkill) => {
        res.status(200).json(newSkill);
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

const updateSkillController = async (req, res) => {
  try {
    if (!req.user.auth) throw new Error("Unauthorized");

    const oldName = req.body.oldName;
    const newName = req.body.newName;
    const file = req.file;
    const type = req.body.type;

    console.log(req.body);

    updateSkill(oldName, newName, file, type)
      .then((updatedSkill) => {
        res.status(200).json(updatedSkill);
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

const deleteSkillController = async (req, res) => {
  try {
    if (!req.user.auth) throw new Error("Unauthorized");

    deleteSkill(req.params.name)
      .then(() => {
        res.status(200).send("successfully deleted");
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
  createSkillController,
  getSkillController,
  updateSkillController,
  deleteSkillController,
};
