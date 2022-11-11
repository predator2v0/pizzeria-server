const userModel = require("../models/user");

const userDetailsController = async (req, res) => {
    try {
        const username = req.params.user;
        const userData = await userModel.findOne(
            { username: username },
            { username: 1 }
        );

        if (userData) {
            res.status(200).send({ user: userData });
        } else {
            res.status(400).send("error, user not found");
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
};

module.exports = userDetailsController;
