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

    otp: { type: String },
    otpExpireTime: { type: Date },
    isVerified: { type: Boolean, default: false },

    resetpasswordToken: { type: String },
    resetpasswordExpires: { type: Date }

}, { timestamps: true });

// IMPORTANT FIX ↓↓↓ DON'T CHANGE!!
const User = mongoose.model('User', userSchema);

module.exports = User;
