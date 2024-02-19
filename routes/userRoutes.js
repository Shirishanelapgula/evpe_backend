const express = require("express");

const userRouter = express.Router();

const {
  userRegistration,
  userLogin,
  getLoggedInUser,
} = require("../controllers/userController");

userRouter.post("/register", userRegistration);

userRouter.post("/login", userLogin);

userRouter.post("/logged-in-user", getLoggedInUser);

module.exports = userRouter;
