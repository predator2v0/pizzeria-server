const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const user = require("../models/user");

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "please fill all the fields" });
        }
        const userExists = await user.findOne({ email });
        console.log(email, password);
        if (
            userExists &&
            userExists.email === email &&
            (await bcrypt.compare(password, userExists.password))
        ) {
            return res.status(200).json({ msg: "user logged in successfully" });
        } else {
            return res.status(400).json({ msg: "incorrect credentials" });
        }
    } catch (err) {
        return res
            .status(400)
            .json({ err: err, msg: "Login Failed! please try again!" });
    }
};

module.exports = loginController;
