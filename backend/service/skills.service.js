const { Skills } = require("../models/skills.model");
const { uploadFile, checkFileExists } = require("./files.service");

const getAllSkill = async () => {
    const skills = await Skills.find({})
    return skills
}

const createSkill = async (body, file) => {
  if (await checkFileExists(body.name, "skills")) {
    throw new Error("Skill already exists");
  }

  const url = await uploadFile(file, "skills", body.name);

  const newSkill = new Skills({
    name: body.name,
    icon: url,
  });

  const newSkillSaved = await newSkill.save();
  return newSkillSaved;
};

module.exports = {
  createSkill,
  getAllSkill,
};
