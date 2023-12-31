const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required:true,
    },
    img: {
        type: String,
        required:true,
    },
    categories: {
        type: Array
    },
    pages: {
        type: String,
    },
    price: {
        type: Number,
        required:true,
    },
    quantity: {
        type: Number,
        required: true,
    }
}, {timestamps: true});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;