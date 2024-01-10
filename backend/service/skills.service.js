const { SKILL_TYPES } = require("../models/constants");
const { Skills } = require("../models/skills.model");
const {
  uploadFile,
  checkFileExists,
  updateFileName,
  deleteFile,
} = require("./files.service");

const getAllSkill = async () => {
  const skills = await Skills.find({});
  return skills;
};

const createSkill = async (name, file, type) => {
  if (await checkFileExists(name, "skills")) {
    throw new Error("Skill already exists");
  }

  if (!SKILL_TYPES.includes(type)) {
    throw new Error("Invalid Skill Type");
  }

  const url = await uploadFile(file, "skills", name);

  const newSkill = new Skills({
    name: name,
    icon: url,
    type: type,
  });

  const newSkillSaved = await newSkill.save();
  return newSkillSaved;
};

const updateSkill = async (oldName, newName, file, type) => {
  if (newName && (await checkFileExists(newName, "skills"))) {
    throw new Error("Skill already exists");
  }

  if (file) {
    await uploadFile(file, "skills", oldName);
  }

  if (newName || type) {
    let url = "";

    if (newName) {
      url = await updateFileName(oldName, newName, "skills");
    }

    const skill = await Skills.findOne({ name: oldName });
    if (skill) {
      if (newName) {
        skill.name = newName;
        skill.icon = url;
      }

      if (type) {
        if (!SKILL_TYPES.includes(type)) {
          throw new Error("Invalid Skill Type");
        }
        skill.type = type;
      }

      const updatedSkill = await skill.save();
      return updatedSkill;
    } else {
      throw new Error("Skill does not exist");
    }
  }
};

const deleteSkill = async (name) => {
  if (!(await checkFileExists(name, "skills"))) {
    throw new Error("Skill does not exist");
  }
  const deletedFile = await deleteFile(name, "skills");
  const deletedSkill = await Skills.findOneAndDelete({ name: name });
  if (deletedSkill && deletedFile) {
    return 200;
  } else {
    throw new Error("Internal Error");
  }
};

module.exports = {
  createSkill,
  getAllSkill,
  updateSkill,
  deleteSkill,
};
