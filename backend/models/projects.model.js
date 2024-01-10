const mongoose = require("mongoose");
const { Schema } = mongoose;

const LinkSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, required: true },
});

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  images: { type: [String], required: true },
  skills: { type: [String], required: true },
  youtube: { type: String, required: false },
  links: [LinkSchema],
  description: { type: [String], required: true }, //each paragraph is a string
});

const Project = mongoose.model("Projects", ProjectSchema);

module.exports = {
  Project,
};
