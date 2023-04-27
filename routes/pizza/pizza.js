const express = require('express');
const pizzaRouter = express.Router();

const allPizzaController = require('../../controllers/allPizzaController');
const searchPizzaController = require('../../controllers/searchPizzaController');

/**
 * method: GET
 * description: get all pizzas from the server.
 */
pizzaRouter.get('/api/pizzas', allPizzaController);

/**
 * method: GET
 * description: get pizzas based on search term
 */
pizzaRouter.get('/api/pizzas/search', searchPizzaController);

module.exports = pizzaRouter;
