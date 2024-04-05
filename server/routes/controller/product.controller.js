const express = require('express');
const router = express.Router();
const Products = require('../../models/product.model');


// get all products
router.get('/get-all', async (req, res) => {
  try {
    const products = await Products
      .find()
      .populate('category')
      .populate('size');
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
      .populate('category')
      .populate('size');
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/get-stock/:id', async (req, res) => {
  try {
    const product = await Products
      .findById(req.params.id)
      .select('stock');
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// update quantity of product by id
router.patch('/update-quantity/:id', async (req, res) => {
  try {
    const product = await Products
      .findById(req.params.id);
    product.stock = req.body.stock;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
