const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },

    // 🔥 OTP verification fields
    otp: {
        type: String
    },
    otpExpireTime: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // 🔥 Password reset fields (optional)
    resetpasswordToken: {
        type: String
    },
    resetpasswordExpires: {
        type: Date
    },

   
},
 {timestamps:true}
);

const User = mongoose.model('signup', userSchema);

module.exports = User;
