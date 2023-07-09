const { handleCustomErrors } = require('./__tests__/error-handling');
const {getAllDishes, getDishByName} = require('./controllers/dishes.controllers')

const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/dishes', getAllDishes);

app.get('/api/search', getDishByName);

app.use(handleCustomErrors)

module.exports = app;