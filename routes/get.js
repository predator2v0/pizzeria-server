// importing express routes
const express = require("express");
const getRoutes = express.Router();
// importing get controllers
const buildPizzaController = require("../controllers/buildPizzaController");
const allPizzaController = require("../controllers/allPizzaController");
const userDetailsController = require("../controllers/userDetailsController");
const orderDetailsController = require("../controllers/orderDetailsController");

const verifyToken = require('../middlewares/auth/verifyToken')

// build custom pizza
getRoutes.get("/build", verifyToken, buildPizzaController);
// get all pizza from db
getRoutes.get("/pizza", allPizzaController);
// get the user details
getRoutes.get("/dashboard/:user", verifyToken, userDetailsController);
// get all the order details of the user
getRoutes.get("/dashboard/:user/orders", verifyToken, orderDetailsController);


// exporting all the get routes.
module.exports = getRoutes;
