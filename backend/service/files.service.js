const { now } = require("mongoose");
const firebase = require("../firebase.js");
const bucket = firebase.bucket;

const uploadFile = async (file, path, fileName) => {
  return new Promise(async (resolve, reject) => {
    if (!file || !file.mimetype.includes("image")) {
      reject("No file or wrong type of file");
    }

    const blob = bucket.file(`${path}/${fileName}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      reject("Internal Error");
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${path}%2F${fileName}?alt=media`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

const checkFileExists = async (fileName, path) => {
  const file = bucket.file(`${path}/${fileName}`);

  try {
    const [exists] = await file.exists();
    return exists;
  } catch (error) {
    console.error("Error checking file existence:", error);
    throw error;
  }
};

const updateFileName = async (oldName, newName, path) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldFile = bucket.file(`${path}/${oldName}`);
      const newFile = bucket.file(`${path}/${newName}`);

      await oldFile.copy(newFile);
      await oldFile.delete();

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${path}%2F${newName}?alt=media`;
      resolve(publicUrl);
    } catch (err) {
      reject("Internal Error" + err);
    }
  });
};

const deleteFile = async (name, path) => {
  return new Promise(async (resolve, reject) => {
    try {
      await bucket.file(`${path}/${name}`).delete();
      resolve(200);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  uploadFile,
  checkFileExists,
  updateFileName,
  deleteFile,
};
