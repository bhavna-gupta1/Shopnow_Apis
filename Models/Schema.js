const mongoose = require('mongoose')
const schema = mongoose.Schema;
const userSchema = new schema({
    Username:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    role:{type:String,enum:["users","admin"]}


})

const productSchema = new schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    category:{type:String,require:true},
    price:{type:Number,require:true}
},{ timestamps: true });

const categorySchema = new schema({
    name:{type:String,require:true},
    description:{type:String,require:true}
},{ timestamps: true })


const Product = mongoose.model("Product",productSchema);
const Category = mongoose.model("Category",categorySchema);
const User = mongoose.model("User",userSchema);

module.exports={
    Product,
    Category,
    User
};