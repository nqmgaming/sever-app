const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart.model');

// get all carts
router.get('/get-all', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get cart by id
router.get('/get/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create cart
router.post('/create', async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get all carts by user id
router.get('/get-by-user/:id', async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.params.id });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update cart quantity by id
router.put('/update-quantity/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        cart.items = req.body.items;
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;