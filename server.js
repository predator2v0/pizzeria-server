const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dbConnect = require("./config/dbconnect");
const getRoutes = require("./routes/get");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const app = express();

// route test
app.get("/", (req, res) => {
    res.json({ msg: "pizzeria router working perfectly" });
});
// middlewares
app.use(cors()); // to avoid cors policy warnings.
app.use(express.json()); //to retrieve the POST data in json format in server.(without this server doesn't understand the json data.)
app.use(authRoutes); // all the auth routes
app.use(getRoutes); // all the get routes
app.use(postRoutes); // all the post routes
app.listen(process.env.PORT, () =>
    console.log(`server running on port ${process.env.PORT}`)
);
