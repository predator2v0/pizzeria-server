const userModel = require('../models/user');

const updateProfileController = (req, res) => {
    try{
        const userId = req.params.userId;
        const {name, address, state, pincode} = req.body;
        console.log("userId", userId);
        console.log("name", name);
        console.log("address", address);
        console.log("state", state);
        console.log("pincode", pincode);


        res.status(200).json({message: "update profile controller working!"})
    } catch(err){
        console.log(err);
        res.status(500).json({status:'failure', message: 'internal server error'})
    }
};

module.exports = updateProfileController;


// *WIP: update profile under progress, to be continued from here.