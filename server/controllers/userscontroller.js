const product = require("../models/ProductModel");
const asynchandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const registerUser=asynchandler(async(req,res)=>{
      const {name,email,password}=req.body;
      const userExist=await User.findOne({email});
      if(userExist){
        res.status(401).json({
          message:'User already exist'
        });
        throw new Error('User already exist')
      }

      const user=await User.create({name,email,password});
      if(user){
        const client=req.get('User-Agent');
        if(client.includes('Mozilla')==true)
        {
         res.status(201).json({
            message:'User register successfully'
          })
        }else{
          res.status(201).json({
            user
          })
        }
      }
      else{
         res.status(401);
         throw new Error('user not register')
      }
})
const authController = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message:'Invalid email or password'
    })
    throw new Error("Invalid email or password");
    
  }
});
const getUserProfile = asynchandler(async (req, res) => {
      const user=await User.findById(req.user._id);
      if(user){
        res.json({
          user
        })
      }
      else{
        res.status(404).json({
          message:'User not found'
        })
      }
});
const updateUserProfile=asynchandler(async(req,res)=>{
  const user=await User.findById(req.user._id);
  if(user){
    user.name=req.body.name||user.name;
    user.email=req.body.email||user.email;
    if(req.body.password){
      user.password=req.body.password
    }
    const updateuser=await user.save();
    res.json({ _id: updateuser._id,
      name: updateuser.name,
      email: updateuser.email,
      admin: updateuser.isAdmin,
      token: generateToken(updateuser._id),
    });
  } else {
    res.status(401).json({
      message:'user not found'
    })
  }
})
module.exports = { authController, getUserProfile,registerUser,updateUserProfile };
