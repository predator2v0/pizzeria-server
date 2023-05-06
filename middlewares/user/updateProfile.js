/**
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next function to execute in the route
 * @description this middleware function is called from the update user data api.
 * this checks if the update user data api request body has the email property, 
 * then it stops the user from updating data as email field can not be updated.
 * else it allows user to proceed and update the user data.
 */
function checkEmailUpdate(req, res, next) {
    const userData = req.body;
    if (userData.email) {
        res.status(400).json({
            status: 'failure',
            message: 'email id can not be updated',
        });
    } else {
        next();
    }
}

module.exports = {checkEmailUpdate}