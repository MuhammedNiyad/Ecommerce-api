const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart.model")

// CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    } catch (error) {
        res.status(500).json(error);
    }
});


/* PUT CART UPDATE */
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
            },
        { new: true }
        );
        return res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json(error);
    };
});

/* DELETE */
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...!")
    } catch (error) {
        res.status(500).json(error)
    }
});

/* GET USER CART */
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// /* GET ALL */

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;