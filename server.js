const express = require("express");
const cors = require("cors");
require("dotenv").config();
// run db script to connect to database
require("./config/dbconnect");

const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const pizzaRoutes = require('./routes/pizza/pizza')
const app = express();

// route test
app.get("/", (req, res) => {
    res.json({ msg: "pizzeria router working perfectly" });
});
// middlewares
app.use(cors()); // to avoid cors policy warnings.
app.use(express.json()); //to retrieve the POST data in json format in server.(without this server doesn't understand the json data.)
app.use(authRoutes); 
app.use(userRoutes); 
app.use(pizzaRoutes); 
app.listen(process.env.PORT, () =>
    console.log(`server running on port ${process.env.PORT}`)
);
