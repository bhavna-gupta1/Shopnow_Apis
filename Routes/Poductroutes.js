const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {Product} =require('../Models/Schema');
const { jwtAuthMiddleware } = require("../jwt");

// // post product API
// router.post('/products',jwtAuthMiddleware,async(req,res)=>{
//     try{
//         const product_body = req.body;
//         console.log(req.originalUrl)
//         const productdata = new Product(product_body)
//         const product_save = await productdata.save()
//         res.status(200).json({ message: "Product added successfully", data:product_save});

    
//     }catch(err){
//         res.status(500).json({message:'Internal server error'})
//     }
// })
// // Get products api 
// router.get('/products',async(req,res)=>{
//     try{
//       const all_product = await Product.find()
//       if(!all_product){
//         res.status(404).json({message:"Product not found"})
//       }
//       res.status(200).json(all_product)
//     }catch(err){
//         res.status(500).json()
//     }
// })
// // POST many products
// router.post('/insertmany_products',async(req,res)=>{
//     try{
//   const all_pro = req.body

//   const many_product = await Product.insertMany(all_pro)
//   console.log(`${many_product.length} product inserted`);
//   res.status(200).json({ message: `${many_product.length} product inserted successfully` })
//     }catch(err){
// res.status(500).json({message:"Something went wrong"})
//     }
// })

// // delete Products
// router.delete('/deleteProduct',async(req,res)=>{
//     try{
//      const pro_id = req.body.id;
//      console.log(pro_id)
//      const del_pro = await Product.findByIdAndDelete(pro_id)
//      if(!del_pro){
//        return res.status(404).json({message:"product not found"})

//      }res.status(200).json({message:"product deleted successsfully"})


//     }catch(err){
//    res.status(500).json({message:"Internal server error"})
//     }
// })
// router.put("/update_pro",async(req,res)=>{
//   try{
// const up_product = req.body
// const update_pro = await Product.findByIdAndUpdate(up_product.id,up_product,{new:true})
// if(!update_pro){
//   return req.status(400).json({message:"Product not found"})
// }res.status(200).json({message:"Product uodated successfully",data:update_pro})
//   }catch(err){
//     res.status(500).json({message:"Internal server error"})
//   }
// })
// Create a new product
router.post('/products', async (req, res) => {
  try {
      const productData = req.body;
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get all products
router.get('/products', async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
      const productData = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
      if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;