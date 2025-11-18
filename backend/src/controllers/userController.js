const User = require("../models/userSchema");
const hashpassword = require("../utils/hashPassword");
const gendratetoken = require("../utils/gendrateToken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashed = await hashpassword(password);

    // 3. Create new user
    const newUser = new User({
      name,
      email,
      password: hashed,
    });

    // Save user first
    await newUser.save();

    // 4. Generate Token
    const token = gendratetoken(newUser);

    // 5. Response
    res.status(201).json({
      message: "Signup Successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup };
