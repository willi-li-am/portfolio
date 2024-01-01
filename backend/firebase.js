var admin = require("firebase-admin");
require("dotenv").config();

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const authAdmin = admin.auth();
const bucket = admin.storage().bucket();

module.exports = {
  authAdmin,
  bucket,
};
