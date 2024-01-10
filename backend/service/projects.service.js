const { Project } = require("../models/projects.model");
const {
  uploadFile,
  checkFileExists,
  updateFileName,
  deleteFile,
} = require("./files.service");

const createProject = async (body, files) => {
  const title = body.title;
  const skills = body.skills;
  const youtube = body.youtube;
  const links = body.links;
  const description = body.description;

  if (!(title && skills && links && description && files)) {
    throw new Error("Invalid Input");
  }

  if (await Project.findone({ title: body.title })) {
    throw new Error("Project Already Exists");
  }

  const images = [];

  for (let i = 0; i < files.length; i++) {
    uploadFile(files[i], "projects", title + i)
      .then((url) => images.push(url))
      .catch((err) => {
        throw new Error(err);
      });
  }

  const newProject = new Project({
    title: title,
    images: images,
    skills: skills,
    youtube: youtube,
    links: links,
    description: description,
  });

  return await newProject.save();
};

module.exports = {
  createProject,
};
