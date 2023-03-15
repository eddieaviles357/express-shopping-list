const express = require('express');
const router = new express.Router();
const items = require('./fakeDB');

// Get /items
router.get('/', (req, res) => {
    try {
        return res.status(200).json({ items })
    } catch (err) {
        next(err);
    }
});

module.exports = router;