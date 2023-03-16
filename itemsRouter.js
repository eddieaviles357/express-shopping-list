const express = require('express');
const ExpressError = require('./ExpressError');
const router = new express.Router();
const Item = require('./Item');


// GET /items
// get all items
router.get('/', async(req, res, next) => {
    try {
        let items = await Item.getItems();

        return res.status(200).json({ items })
    } catch (err) {
        next(err);
    }
});
// GET /items/:name
// get a single item by name
router.get('/:name', async(req, res, next) => {
    try {
        // normalize item name and try to retrieve item in fake db
        let item = await Item.getItem(req.params['name'].toLowerCase());
        (item) ? res.status(200).json({item}) : res.status(200).json({ message: 'Not found'}) 
    } catch (err) {
        next(err);
    }
})

// POST /items
// add an item to items array
router.post('/', async(req, res, next) => {
    try {
        // throws Express Error if fields not valid
        let item = new Item(req.body.name, req.body.price);
        await Item.setItems(item);
        return res.status(200).json({added: {name: item.name, price: item.price}})
    } catch(err) {
        next(err);
    }
});

// PATCH /items/:name
// update an item in the items array
router.put('/', async(req, res, next) => {
    try {
        
    } catch (err) {
        
    }
})

module.exports = router;