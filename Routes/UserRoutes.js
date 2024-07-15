const mongoose = require('mongoose')
const {userSchema} = require('../Models/Schema')
const express= require('express')
const db = require('../db')
const User=require('../Models/userschema')
const router = express.Router();
const {jwtAuthMiddleware,generateToken} =require('../jwt')

// SIGN UP USER
// POST /signup - Register a new user
router.post('/signup', async (req, res) => {
    try {
        const userData = req.body;

        // Create a new user instance
        const newUser = new User(userData);

        // Save user to database
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);

        // Generate JWT token for the newly registered user
        const token = generateToken({ id: savedUser._id, username: savedUser.username });

        // Respond with saved user data and token
        res.status(201).json({
            username: savedUser.username,
            token: token
        });
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// LOGIN USER
  router.post('/login',async(req,res)=>{
    try{
const {username,password}=req.body;
const user = await User.findOne({username:username})

if((!user )|| !(await user.comparePassword(password))){
  res.status(401).json({Error:"Invalid username or password"})
}
// /geerate token
const payload = {
 id : user.id,
 username:user.username
}
const token = generateToken(payload)
res.json({message:"login successfully",token:token})

    }catch(err){
      res.status(500).json({message:"Internal Server Error"})
    }
  })
router.get('/user',jwtAuthMiddleware,async(req,res)=>{
    try{
        const user_data = await User.find()
        if(!user_data){
            return res.status(404).json({message:"User not found"})
        }res.status(200).json(user_data)
}catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
})

// Delete user 
router.delete("/delete_user",async(req,res)=>{
    try{
const user_id = req.body.id;
const del_user = await User.findByIdAndDelete(user_id)
if(!del_user){
    return res.status(400).json({message:"user not found"})
}res.status(200).json({message:"user deleted succssfully"})
    }catch(err){
        res.status(500).json({message:"Internal server error",error:err.message})
    }
})


module.exports = router;