const firebase = require("../firebase");
const authAdmin = firebase.authAdmin;

const authenticate = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.split(" ");
    if (!bearerToken || bearerToken.length !== 2) {
      throw new Error("Not authorized");
    }
    const token = bearerToken[1];
    const decodedToken = await authAdmin.verifyIdToken(token);
    const email = decodedToken.email;

    if (email === "li.william.mail@gmail.com") {
      req.user = decodedToken;
      req.user.auth = true;
      next();
      return;
    } else {
      throw new Error("Not authorized");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  authenticate,
};
