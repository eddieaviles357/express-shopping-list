const express = require('express');
const app = express();
const itemsRouter = require('./itemsRouter');

app.use(express.json());
app.use('/items', itemsRouter);

module.exports = app;