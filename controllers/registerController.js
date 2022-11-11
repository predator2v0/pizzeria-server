const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const user = require("../models/user");

const registerController = async (req, res) => {
    let { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ msg: "please fill all the fields" });
        }
        const userExists = await user.findOne({ username });
        if (userExists) {
            res.status(400).json({ msg: "user already registered" });
        } else {
            password = await bcrypt.hash(password, 12);
            const registerUser = await user.create({ username, password });
            if (registerUser) {
                return res.status(201).json({ msg: "user registered successfully" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "unable to register user, err occurred", error: err });
    }
}

module.exports = registerController;