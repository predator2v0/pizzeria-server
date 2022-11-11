// importing express router
const express = require("express");
const postRoutes = express.Router();
// all post controllers
const placeOrderController = require("../controllers/placeOrderController");

// place a new order
postRoutes.post("/order/:user", placeOrderController);

// exporting all the post routes
module.exports = postRoutes;
