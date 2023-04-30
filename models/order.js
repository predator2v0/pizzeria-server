const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: false,
    },
    pinCode: {
        type: Number,
        required: true,
        min: 100000,
        max: 999999,
    },
});

const orderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    orderID: {
        type: String,
        required: true,
        unique: true,
    },
    timeStamp: {
        type: String,
        required: true,
    },
    orders: {
        type: [],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'open',
    },
    deliveryAddress: {
        type: deliveryAddressSchema,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
