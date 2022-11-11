// import express router
const express = require("express");
const authRouter = express.Router();

// import login and register controllers
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");

// register new user
authRouter.post("/register", registerController);
// user login
authRouter.post("/login", loginController);
// exporting the user authorization router
module.exports = authRouter;
