const express = require('express');
const userRouter = express.Router();

const userFeedbackController = require('../../controllers/userFeedbackController');
const placeOrderController = require('../../controllers/placeOrderController');
const userDashboardController = require('../../controllers/userDashboardController');
const updateProfileController = require('../../controllers/updateProfileController');
const verifyToken = require('../../middlewares/auth/verifyToken');
const {checkEmailUpdate} = require('../../middlewares/user/updateProfile')

/**
 * method: GET
 * description: get user dashboard data.
 */
userRouter.get('/api/users/:userId/dashboard',verifyToken, userDashboardController);

/**
 * method: PATCH
 * description: update user profile
 */
userRouter.patch('/api/users/:userId/update', verifyToken, checkEmailUpdate, updateProfileController);

/**
 * method: POST
 * description: place order by user
 */
userRouter.post('/api/users/:userId/order',verifyToken, placeOrderController);

/**
 * method: POST
 * description: receive and store the user feedback in db
 */
userRouter.post('/api/feedback', userFeedbackController)


module.exports = userRouter;