const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('working');
})

module.exports = app;