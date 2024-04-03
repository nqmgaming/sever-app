const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart.model');
const { log } = require('console');

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

        // check if a cart with the same user ID and product ID already exists
        const data = req.body;
        console.log(data);
        const existingCart = await Cart.findOne({
            user: req.body.user,
            'items.product': req.body.items.product,
        });

        if (existingCart) {
            return res.status(400).json({ error: 'Cart already exists' });
        }

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
router.patch('/update-quantity/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        cart.items.quantity = req.body.items.quantity;
        await cart.save();
        res.json(cart);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

// delete cart by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// caculate cart total price by user id


module.exports = router;