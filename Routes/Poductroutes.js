const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {Product} =require('../Models/Schema');

// post product API
router.post('/products',async(req,res)=>{
    try{
        const product_body = req.body;
        console.log(req.originalUrl)
        const productdata = new Product(product_body)
        const product_save = await productdata.save()
        res.status(200).json({ message: "Product added successfully", data:product_save});

    
    }catch(err){
        res.status(500).json({message:'Internal server error'})
    }
})
// Get products api 
router.get('/products',async(req,res)=>{
    try{
      const all_product = await Product.find()
      if(!all_product){
        res.status(404).json({message:"Product not found"})
      }
      res.status(200).json(all_product)
    }catch(err){
        res.status(500).json()
    }
})
// POST many products
router.post('/insertmany_products',async(req,res)=>{
    try{
  const all_pro = req.body

  const many_product = await Product.insertMany(all_pro)
  console.log(`${many_product.length} product inserted`);
  res.status(200).json({ message: `${many_product.length} product inserted successfully` })
    }catch(err){
res.status(500).json({message:"Something went wrong"})
    }
})

module.exports = router;