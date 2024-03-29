const mongoose = require('mongoose');
const { type } = require('os');


const cartSchema = new mongoose.Schema({
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
            },
            totalPrice: {
                type:Number
            }
        }
    ],
    grandTotal: {
        type:Number,
        default: 0
    }
    
}, {timestamps: true});


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;