const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
            const userAuthData = {
                userID: userExists.userID,
                email: userExists.email,
            };
            // create and sign JWT auth token for validation
            const authToken = jwt.sign(userAuthData, process.env.AUTH_KEY, {
                expiresIn: "1h",
            });
            return res.status(200).json({
                msg: "user logged in successfully",
                authToken
            });
        } else {
            return res.status(400).json({ msg: "incorrect credentials" });
        }
    } catch (err) {
        return res
            .status(400)
            .json({
                err: err.toString(),
                msg: "Login Failed! please try again!",
            });
    }
};

module.exports = loginController;
