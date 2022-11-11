const orderModel = require("../models/order");

const orderDetailsController = async (req, res) => {
    try {
        const username = req.params.user;
        const orderData = await orderModel.find({ user: username });
        if (orderData) {
            const orderCount = totalOrders(orderData);
            const pendingCount = pendingOrders(orderData);
            const deliveredCount = deliveredOrders(orderData);
            const amount = amountToPay(orderData);
            const orders = allOrders(orderData);
            res.status(200).send({
                orders,
                orderCount,
                pendingCount,
                deliveredCount,
                amount,
            });
        } else {
            res.status(400).send("error, user not found");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};
const allOrders = (orders) =>
    orders.map((order) => {
        return {
            id: order.id,
            items: order.items,
            price: order.price,
            status: order.status,
            deliveryAddress: order.deliveryAddress,
            contact: order.contact,
        };
    });
const totalOrders = (orders) => orders.length;
const pendingOrders = (orders) =>
    orders.filter((order) => order.status === "pending").length;
const deliveredOrders = (orders) =>
    orders.filter((order) => order.status === "delivered").length;
const amountToPay = (orders) => {
    return orders.reduce((amount, order) => {
        if (order.status === "pending") {
            return amount + order.price;
        } else {
            return amount;
        }
    }, 0);
};

module.exports = orderDetailsController;
