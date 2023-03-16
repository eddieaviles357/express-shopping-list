const express = require('express');
const ExpressError = require('./ExpressError');
const router = new express.Router();
const Item = require('./Item');

// GET /items
router.get('/', async(req, res, next) => {
    try {
        let items = await Item.getItems();

        return res.status(200).json({ items })
    } catch (err) {
        next(err);
    }
});

// POST /items
router.post('/', async(req, res, next) => {
    try {
        // throws Express Error if fields not valid
        let item = new Item(req.body.name, req.body.price);
        await Item.setItems(item);
        return res.status(200).json({added: {item: item.name, price: item.price}})
    } catch(err) {
        next(err);
    }
});

module.exports = router;