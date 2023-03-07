// importing express router
const express = require("express");
const postRoutes = express.Router();
// all post controllers
const placeOrderController = require("../controllers/placeOrderController");
const userFeedbackController = require("../controllers/userFeedbackController")

// place a new order
postRoutes.post("/order/:user", placeOrderController);

// send feedback
postRoutes.post("/feedback", userFeedbackController);

// exporting all the post routes
module.exports = postRoutes;
