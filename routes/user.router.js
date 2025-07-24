const express = require("express");
const userRouter = express.Router();

const {
  userRegisterController,
  userLoginController,
} = require("../controllers/user.controller");

userRouter.post("/register", userRegisterController);
userRouter.post("", userLoginController);

module.exports = userRouter
