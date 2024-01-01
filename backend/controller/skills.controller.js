const { createSkill, getAllSkill } = require("../service/skills.service");

const getSkillController = async (req, res) => {
    getAllSkill()
        .then((skills) => {res.status(200).send(skills)})
        .catch((err) => {console.log(err); res.status(400).send(err)})
}

const createSkillController = (req, res) => {
  try {
    if (!req.user.auth) throw new Error("Unauthorized");
    createSkill(req.body, req.file)
      .then((newSkill) => {
        res.status(200).json(newSkill);
      })
      .catch((err) => {console.log(err); res.status(400).send(err)})
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};

module.exports = {
  createSkillController,
  getSkillController,
};
