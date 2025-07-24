const userModel = require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

const userRegisterController = (req, res) => {
  const user = req.body;
  try {
    bcrypt.hash(user.password, saltRounds, async function (err, hash) {
      if (err) {
        res.status(400).json({ message: "Register failed" });
      } else if (hash) {
        user.password = hash;
        await userModel.create(user);
        const token = jwt.sign(user.email, jwtSecret);
        res
          .status(200)
          .json({
            message: "Register successful",
            token: token,
            username: user.username,
          });
      } else {
        res.status(400).json({ message: "Register failed" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Register failed" });
  }
};

const userLoginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const hash = user.password;
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          const token = jwt.sign({ email }, jwtSecret);
          res
            .status(200)
            .json({
              message: "Login successful",
              token: token,
              username: user.username,
            });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

module.exports = { userRegisterController, userLoginController };
