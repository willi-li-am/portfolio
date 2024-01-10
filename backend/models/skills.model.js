const mongoose = require("mongoose");
const { Schema } = mongoose;

const SkillSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  type: { type: String, required: true },
});

const SkillsSchema = new Schema({
  skills: { type: [Number], required: true }, //id of each skill to retrieve in order
});

const Skills = mongoose.model("Skill", SkillSchema);

module.exports = {
  Skills,
};
