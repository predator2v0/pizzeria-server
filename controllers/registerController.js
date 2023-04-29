const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const user = require('../models/user');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @description registers a user and stores the user data and credentials in the database.
 * returns success response if the user is registered successfully else returns failure response.
 */
const registerController = async (req, res) => {
    let { email, name, password, address, state, pincode } = req.body;
    try {
        if (!email || !name || !password || !address || !state || !pincode) {
            return res.status(400).json({
                status: 'failure',
                message: 'please fill all the mandatory fields',
            });
        }
        const userExists = await user.findOne({ email });
        if (userExists) {
            res.status(409).json({
                status: 'failure',
                message: 'user already registered',
            });
        } else {
            // encrypting password to salt 12 hashed string
            password = await bcrypt.hash(password, 12);
            // generate a unique userID using from uuid_v4(without -)
            const userId = uuidv4().replace(/-/g, '');
            const registerUser = await user.create({
                userID: userId,
                email,
                name,
                password,
                address,
                state,
                pincode,
            });
            if (registerUser) {
                res.status(201).json({
                    status: 'success',
                    message: 'user registered successfully',
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failure',
            message: 'internal server error',
        });
    }
};

module.exports = registerController;
