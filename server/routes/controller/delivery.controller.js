const express = require('express');
const router = express.Router();
const Delivery = require('../../models/delivery.model');

// get all deliveries
router.get('/', async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.json(deliveries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// get delivery by id
router.get('/:id', async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id);
        res.json(delivery);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// create delivery
router.post('/', async (req, res) => {
    try {
        const delivery = new Delivery(req.body);
        await delivery.save();
        res.json(delivery);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// get all deliveries by user id
router.get('/get-by-user/:id', async (req, res) => {
    try {
        const delivery = await Delivery.find({ user: req.params.id });
        res.json(delivery);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// update delivery by id
router.put('/:id', async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id);
        delivery.isPrimaryDelivery = req.body.isPrimaryDelivery;
        await delivery.save();
        res.json(delivery);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// delete delivery by id
router.delete('/:id', async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id);
        await delivery.remove();
        res.json({ message: 'Delivery deleted' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//export
module.exports = router;