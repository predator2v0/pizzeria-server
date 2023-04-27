// import express router
const express = require("express");
const authRouter = express.Router();

// import login and register controllers
const registerController = require("../../controllers/registerController");
const loginController = require("../../controllers/loginController");
const logoutController = require("../../controllers/logoutController");

/**
 * method: POST
 * description: register a new user
 */
authRouter.post("/api/register", registerController);

/**
 * method: POST
 * description: handling user login for existing user.
 */
authRouter.post("/api/login", loginController);

/**
 * method: POST
 * description: user logout
 */
authRouter.post('/api/logout', logoutController);

// exporting the user authorization router
module.exports = authRouter;
