const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const user = require("../models/user");

const loginController = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ msg: "please fill all the fields" });
        }
        const loggedIn = await user.findOne({ username });

        if (loggedIn && loggedIn.username === username && await bcrypt.compare(password, loggedIn.password)) {
            return res.status(200).json({ msg: "user logged in successfully"});
        } else {
            return res.status(400).json({ msg: "incorrect credentials" })
        }
    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

module.exports = loginController;