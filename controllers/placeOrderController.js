const orderModel = require('../models/order');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @description this mehtod is used to place an order. i.e. get the order content from client,
 * append the order timestamp and order id tothe order and store the order into
 * the order collection in the DB.
 */
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
                timeStamp: placeOrder.timeStamp,
            };
            res.status(201).json({
                status: 'success',
                message: 'order placed successfully',
                data: orderData,
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

/**
 * @returns {string} orderId
 * @description this method generates a order id based on the previous order.
 * it checks in the database what is the order id of last order and generates
 * an order id with the next number.
 * the order id is a 10 char long string starting with ORD and next 7 places are
 * filled with the successive number of the last order.
 */
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

/**
 * @returns {string} current timestamp in string format
 * @description this method generated the current time stamp in en-IN format
 * and returns the timestamp in string format. the timestamp for each order is
 * appended to the order.
 */
const generateOrderTimeStamp = () => {
    return new Date().toLocaleString('en-IN').toString();
};

module.exports = placeOrderController;
