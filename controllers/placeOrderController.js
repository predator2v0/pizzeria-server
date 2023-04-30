const orderModel = require('../models/order');
const { v1: uuid } = require('uuid');

const placeOrderController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = req.body.orders;
        const price = req.body.price;
        const address = req.body.address;
        const contactNumber = req.body.contactNumber;

        const orderId = await generateOrderId();
        const orderTimeStamp = generateOrderTimeStamp();

        const placeOrder = await orderModel.create({
            userID: userId,
            orderID: orderId,
            timeStamp: orderTimeStamp,
            orders: orders,
            price: price,
            deliveryAddress: address,
            contactNumber: contactNumber,
        });
        if (placeOrder) {
            const orderData = {
                orderId: placeOrder.orderID,
                timeStamp: placeOrder.timeStamp
            }
            res.status(201).json({
                status: 'success',
                message: 'order placed successfully',
                data: orderData
            });
        } else {
            res.status(500).json({
                status: 'failure',
                message: 'error placing order',
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

const generateOrderId = async () => {
    const lastOrder = await orderModel.findOne(
        {},
        { orderID: 1 },
        { sort: { orderID: -1 } }
    );
    const lastSl = parseInt(lastOrder.orderID.substring(3));
    const orderId = `ORD${(lastSl + 1).toString().padStart(7, 0)}`;
    return orderId;
};
const generateOrderTimeStamp = () => {
    return new Date().toLocaleString('en-IN').toString();
};

module.exports = placeOrderController;
