const orderModel = require("../models/order");

const placeOrderController = async (req, res) => {
    const { items, amount, status, deliveryAddress, contactNo } = req.body;
    try {
        const username = req.params.user;
        if (
            !username ||
            !items ||
            !amount ||
            !status ||
            !deliveryAddress ||
            !contactNo
        ) {
            return res
                .status(400)
                .json({
                    msg: "unable to order, please add items to cart and fill other mandatory fields",
                });
        }
        const userData = await orderModel.create({
            user: username,
            items: items,
            price: amount,
            status: status,
            deliveryAddress: deliveryAddress,
            contact: contactNo,
        });
        if (userData) {
            return res.status(200).json({ msg: "order placed successfully" });
        } else {
            return res
                .status(400)
                .json({ msg: "error in placing order. try again" });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = placeOrderController;
