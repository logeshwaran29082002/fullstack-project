const User = require('../models/userSchema');
const hashpassword = require('../utils/hashPassword')



const signup = async(req,res)=>{
    try {
        const {name , email , password}= req.body;
      
     // 1 check user aleady exited
const user = await User.findOne({email})
if(user){
   return res.status(404).json({message:"User already exists"})
}
 const hashed = await hashpassword(password)

// 3 save new user 
const newUser = new User({
    name,
    email,
    password:hashed
    // password:await hashpassword(password)
})
await newUser.save();
res.status(201).json({message:"signup Sucessfully", newUser})

    } catch (err) {
        res.status(404).json(err);
    }
}

module.exports={signup}