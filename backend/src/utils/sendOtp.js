const nodemailer = require('nodemailer')

const sentOtp = async (toEmail ,otp) =>{
    const transporter = nodemailer. createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,   // your email
            pass:process.env.EMAIL_PASS    // app password
        }
    });
    const mailOption = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Your OTP for Account Verification",   
         text: `Your verification OTP is ${otp}. It will expire in 5 minutes.`, 
    };
    await transporter.sendMail(mailOption)
}


module.exports = sentOtp