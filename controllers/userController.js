const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      res.status(200).json(newUser);
    } else {
      res.status(401).json({ message: "Please fill all the fields" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "User not found" });
      } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          res.status(401).json({ message: "Incorrect password" });
        } else {
          const payload = {
            user: user._id,
          };
          const jwtToken = jwt.sign(payload, "MY_TOKEN");
          res.status(200).json({
            message: "You have logged in successfully.",
            jwtToken,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLoggedInUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userRegistration, userLogin, getLoggedInUser };
