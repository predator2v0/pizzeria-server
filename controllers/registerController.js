const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");

const user = require("../models/user");

const registerController = async (req, res) => {
    let { email, name, password, address, state, pinCode } = req.body;
    try {
        if (!email || !name || !password || !address || !state || !pinCode) {
            return res.status(400).json({ msg: "please fill all the fields" });
        }
        const userExists = await user.findOne({ email });
        if (userExists) {
            res.status(400).json({ msg: "user already registered" });
        } else {
            // encrypting password to salt 12 hashed string
            password = await bcrypt.hash(password, 12);
            // generate a unique userID using from uuid_v4
            const userId = uuidv4();

            const registerUser = await user.create({
                userID: userId,
                email,
                name,
                password,
                address,
                state,
                pinCode,
            });
            if (registerUser) {
                return res
                    .status(201)
                    .json({ msg: "user registered successfully" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "unable to register user, err occurred",
            error: err,
        });
    }
};

module.exports = registerController;
