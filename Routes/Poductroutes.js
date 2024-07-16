const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {Product} =require('../Models/Schema');
const { jwtAuthMiddleware } = require("../jwt");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Multer storage configuration
const storages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder where uploaded images are stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg'); // File naming convention (can be customized)
    }
  });

// Create a new product
router.post('/products', upload.single('image'), async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      const { buffer, mimetype } = req.file; // Extract image buffer and MIME type
  
      // Create new product instance with image data
      const product = new Product({
        name,
        price,
        description,
        category,
        image: {
          data: buffer, // Store image data as Buffer
          contentType: mimetype // Store image MIME type
        }
      });
  
      // Save product to database
      await product.save();
  
      // Respond with the saved product details
      res.status(201).json({
        message: 'Product created successfully',
        product: {
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: `/uploads/${product._id}.jpg` // Example URL to access the image
        }
      });
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ message: 'Failed to create product' });
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