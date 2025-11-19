const User = require("../models/userSchema");
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(200).json({token});

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login error" });
  }
};

module.exports = { Login };
