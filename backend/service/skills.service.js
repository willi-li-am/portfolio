const { Skills } = require("../models/skills.model");
const { uploadFile, checkFileExists, updateFileName, deleteFile } = require("./files.service");

const getAllSkill = async () => {
    const skills = await Skills.find({})
    return skills
}

const createSkill = async (name, file) => {
  if (await checkFileExists(name, "skills")) {
    throw new Error("Skill already exists");
  }

  const url = await uploadFile(file, "skills", name);

  const newSkill = new Skills({
    name: name,
    icon: url,
  });

  const newSkillSaved = await newSkill.save();
  return newSkillSaved;
};

const updateSkill = async (oldName, newName, file) => {
    if (await checkFileExists(newName, "skills")) {
        throw new Error("Skill already exists");
    }

    if(file) {
        await uploadFile(file, "skills", oldName)
    }

    if(newName) {
        const url = await updateFileName(oldName, newName, "skills")

        const skill = await Skills.findOne({name: oldName})
        if (skill) {
            skill.name = newName
            skill.icon = url

            const updatedSkill = await skill.save()
            return updatedSkill
        } else {
            throw new Error("Skill does not exist")
        }
    }
}

const deleteSkill = async (name) => {
    if (! await checkFileExists(name, 'skills')) {
        throw new Error("Skill does not exist")
    }
    const deletedFile = await deleteFile(name, "skills")
    const deletedSkill = await Skills.findOneAndDelete({name: name})
    if (deletedSkill && deletedFile) {
        return 200
    } else {
        throw new Error("Internal Error")
    }
}

module.exports = {
  createSkill,
  getAllSkill,
  updateSkill,
  deleteSkill,
};
