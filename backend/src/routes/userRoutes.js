const express = require("express");
const router = express.Router();

const { signup, verifyOTP, resendOTP } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

module.exports = router;
