const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Product = require('../models/Product.model');

// CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});


/* PUT PRODUCT UPDATE */
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
            {
            $set: req.body
            },
        { new: true }
        );
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error);
    };
});

/* DELETE */
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...!")
    } catch (error) {
        res.status(500).json(error)
    }
});

/* GET PRODUCT */
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

/* GET ALL PRODUCTS */
router.get('/', async (req, res) => {
    const queryNew = req.query.new;  // This is for if wanna get new products  add this to url (?new:true)
    const queryCategory = req.query.category; //Rhis is for if you wanna get category based products add this to url (?category: example)
    try {
        let products;
        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if(queryCategory) {
            products = await Product.find({categories:{
                $in: [queryCategory],
            }})
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;