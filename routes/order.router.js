const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require('../models/Order.model')

// CREATE

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});


/* PUT CART UPDATE */
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json(error);
    };
});

/* DELETE */
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...!")
    } catch (error) {
        res.status(500).json(error)
    }
});

/* GET USER ORDER */
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

/* GET ALL */

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    console.log("income");
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);
        console.log("hi");
        res.status(200).json(income);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error)
    }
})



module.exports = router;