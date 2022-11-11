const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    items: {
        type: [],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }, 
    status: {
        type: String, 
        required: true
    }, 
    deliveryAddress: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    }
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
