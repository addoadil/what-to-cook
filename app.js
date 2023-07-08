const {getAllDishes} = require('./controllers/dishes.controllers')

const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/dishes', getAllDishes);

module.exports = app;