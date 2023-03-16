const express = require('express');
const ExpressError = require('./ExpressError')
const itemsRouter = require('./itemsRouter');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/items', itemsRouter);

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// 404 page
app.use((req, res, next) => {
    return new ExpressError("Not found", 404);
});

// Handles error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log('hit Error')
    console.log(err)
    return res.json({
        error: err.message
    });
});

module.exports = app;