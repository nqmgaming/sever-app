const express = require('express');
const router = express.Router();
const Favorite = require('../../models/favorite.model');

// get all favorites
router.get('/get-all', async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get favorite by id
router.get('/get/:id', async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        res.json(favorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create favoriterouter.post('/create', async (req, res) => {
router.post('/create', async (req, res) => {
    try {

        const data = req.body;
        console.log(data);
        const existingFavorite = await Favorite.findOne({
            user: req.body.user,
            product: req.body.product
        });

        if (existingFavorite) {
            return res.status(400).json({ error: 'Favorite already exists' });
        }

        const favorite = new Favorite(req.body);
        await favorite.save();
        res.json(favorite);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// get all favorites by user id
router.get('/get-by-user/:id', async (req, res) => {
    try {
        const favorite = await Favorite.find({ user: req.params.id });
        res.json(favorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update favorite quantity by id
router.put('/update-quantity/:id', async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        favorite.items = req.body.items;
        await favorite.save();
        res.json(favorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;