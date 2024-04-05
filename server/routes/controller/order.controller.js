const express = require('express');
const router = express.Router();
const Order = require("../../models/order.model");

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// get order by id  
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get order by user id
router.get('/get-by-user/:userId', async (req, res) => {
    try {
        const order = await Order.find({ user: req.params.userId });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// create order

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// update order
router.patch('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// delete order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
