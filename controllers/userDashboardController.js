const userModel = require('../models/user');

const userDashboardController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = await userModel.findOne(
            { userID: userId },
            { password: 0 }
        );

        if (userData) {
            res.status(200).send({ user: userData });
        } else {
            res.status(400).send('error, user not found');
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
};

module.exports = userDashboardController;
