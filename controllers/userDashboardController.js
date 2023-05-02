const userModel = require('../models/user');
const orderModel = require('../models/order');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @description this method returns the user details and order details to be displayed
 * on the user dashboard after login.
 */
const userDashboardController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userDetails = await fetchUserDetails(userId);
        const orderDetails = await fetchOrderDetails(userId);

        if (userDetails) {
            if (orderDetails.length > 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'details fetched successfully',
                    data: {
                        userInfo: userDetails,
                        orderInfo: orderDetails,
                    },
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'no order data found for this user',
                    data: {
                        userInfo: userDetails,
                        orderInfo: orderDetails,
                    },
                });
            }
        } else {
            res.status(404).json({
                status: 'failure',
                message: 'user not found',
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

/**
 * @param {string} userId user id of the user
 * @returns {object} userDetails
 * @description this method takes the user id as input and returns an object holding
 * all details of the user except the password.
 */
const fetchUserDetails = async (userId) => {
    const userDetails = await userModel.findOne(
        { userID: userId },
        { password: 0 }
    );
    return userDetails;
};

/**
 * @param {string} userId user id of the user
 * @returns {object} orderDetails
 * @description this method takes the user id as input and returns object/ array of object
 * that holds all the orders details of that user.
 */
const fetchOrderDetails = async (userId) => {
    const orderDetails = await orderModel.find({ userID: userId });
    return orderDetails;
};

module.exports = userDashboardController;
