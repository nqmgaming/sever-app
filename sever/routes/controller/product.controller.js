const express = require('express');
const router = express.Router();
const Products = require('../../models/product.model');

// get all products
router.get('/get-all', async (req, res) => {
  try {
    const products = await Products
      .find()
      .populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get product by id
router.get('/get/:id', async (req, res) => {
  try {
    const product = await Products
      .findById(req.params.id)
      .populate('category');
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
