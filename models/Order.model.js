const mongoose = require('mongoose');
const { type } = require('os');


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type:String
            },
            quantity: {
                type:Number,
                default: 1
            }
        }
    ],
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type:Object
    }
}, {timestamps: true});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;