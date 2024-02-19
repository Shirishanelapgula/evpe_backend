const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const AuthMiddleWare = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const { user } = jwt.verify(token, "MY_TOKEN");

      req.user = await userModel.findById(user).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "unAuthorized User" });
    }
  } else {
    return res.status(401).json({ message: "unAuthorized User" });
  }
};

module.exports = AuthMiddleWare;
