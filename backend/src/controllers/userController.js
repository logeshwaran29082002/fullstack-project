const User = require("../models/userSchema");
const hashpassword = require("../utils/hashPassword");
const sentOtp = require('../utils/sendOtp')

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

    // gendrate 6-digite password 
    const otp = String(Math.floor(100000 + Math.random()*900000));
    const otpExpire = Date.now()+ 5 * 60 * 1000; // 5min 

    // 3. Create new user
    const newUser = new User({
      name,
      email,
      password: hashed,
      otp,
      otpExpireTime: otpExpire,
      isVerified:false
    });

    // Save user
    await newUser.save();


    // send email 

    await sentOtp(email,otp);

    return res.status(201).json({
      message:"Signup successful. OTP sent to email.",
  userId: newUser._id // frontend uses this to verify OTP
    })

    // 4. Response
    res.status(201).json({
      message: "Signup Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup };
