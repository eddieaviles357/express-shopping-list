const express = require('express');
const ExpressError = require('./expressError')
const itemsRouter = require('./itemsRouter');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/items', itemsRouter);

// 404 page
app.use((req, res, next) => {
    return new ExpressError("Not found", 404);
});

module.exports = app;