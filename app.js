const express = require('express');
const app = express();
const itemsRouter = require('./itemsRouter');
const ExpressError = require('./expressError')

app.use(express.json());
app.use('/items', itemsRouter);

// 404 page
app.use((req, res, next) => {
    return new ExpressError("Not found", 404);
})

module.exports = app;