const express = require("express");
const router = express.Router();

// signup
const { signup, verifyOTP, resendOTP,  } = require("../controllers/userController");

//Login
const { Login, resetPassword, resetpasswordToken } = require("../controllers/loginController");


// middleware
const { verifyToken } = require("../middleware/auth");


// signup
router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);


//login
router.post("/login",Login);


// token verify
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user
  });
});

// reset password 
router.post("/reset-password",resetPassword)

// reset password verify

router.post('/reset-password/:token',resetpasswordToken)
module.exports = router;
