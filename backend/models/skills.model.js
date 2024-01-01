const mongoose = require("mongoose");
const { Schema } = mongoose;

const SkillSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const Skills = mongoose.model("Skills", SkillSchema);

module.exports = {
  Skills,
};
