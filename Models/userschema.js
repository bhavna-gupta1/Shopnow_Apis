const mongoose = require("mongoose")
// const db1 = require("./db1");
const bcrypt = require('bcrypt')

const userschema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

userschema.pre('save', async function(next) {
    const user = this;
    console.log("pre-save middleware triggered"); // Check if this logs

    // Hash the password only if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        console.log(user.password)
        console.log("Password hashed:", hashedPassword); // Log the hashed password
        next();
    } catch (err) {
        next(err);
    }
});

userschema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};


const User = mongoose.model('user',userschema)
module.exports=User;