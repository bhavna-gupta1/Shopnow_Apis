const mongoose = require('mongoose')
const {userSchema} = require('../Models/Schema')
const express= require('express')
const db = require('../db')
const { User}=require('../Models/Schema')
const router = express.Router();

// post user API
router.post('/user',async(req,res)=>{
    try{
        const user_body = req.body;
        console.log(req.originalUrl)
        const userdata = new User(user_body)
        const user_save = await userdata.save()
        res.status(200).json({ message: "user added successfully", data:user_save});

    
    }catch(err){
        res.status(500).json({message:'Internal server error'})
    }
})

module.exports = router;