const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../models/user');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @description this method returns response status code and the login status.
 * i.e. if the login is successful or not. if successful then this method returns a token
 * for the login session.
 */
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                status: 'failure',
                message: 'please fill all the fields',
            });
        }
        const userExists = await user.findOne({ email });
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
                expiresIn: '1h',
            });
            res.status(200).json({
                status: 'success',
                message: 'login successful',
                token: authToken,
            });
        } else {
            res.status(401).json({
                status: 'failure',
                message: 'incorrect credentials',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failure',
            message: 'internal server error',
        });
    }
};

module.exports = loginController;
