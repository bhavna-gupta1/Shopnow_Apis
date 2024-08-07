const mongoose = require('mongoose')
const schema = mongoose.Schema;


const productSchema = new schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    category:{type:String,require:true},
    price:{type:Number,require:true},
    image: {
        data: Buffer, // Store image data as Buffer
        contentType: String // Store image MIME type
      }
},{ timestamps: false });

const categorySchema = new schema({
    name:{type:String,require:true},
    description:{type:String,require:true}
},{ timestamps: true })


const Product = mongoose.model("Product",productSchema);
const Category = mongoose.model("Category",categorySchema);


module.exports={
    Product,
    Category,
   
};