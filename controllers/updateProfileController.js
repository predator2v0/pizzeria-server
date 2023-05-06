const userModel = require('../models/user');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @description this method is used to update the user personal details like name, address,
 * state and pincode. it returns the updated user data after data modification is successful.
 */
const updateProfileController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const updateUserData = await userModel.findOneAndUpdate(
            { userID: userId },
            userData,
            { new: true }
        );
        if (updateUserData) {
            const userData = {
                email: updateUserData.email,
                name: updateUserData.name,
                address: updateUserData.address,
                state: updateUserData.state,
                pincode: updateUserData.pincode,
            };
            res.status(200).json({
                status: 'success',
                message: 'user profile updated successfully',
                data: userData,
            });
        } else {
            res.status(400).json({
                status: 'failure',
                message: 'unable to update user profile',
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

module.exports = updateProfileController;
