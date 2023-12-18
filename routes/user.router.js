const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/User.model");

/* PUT */
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    console.log("in up usser")
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {

            $set: req.body
        }, { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(error);
    };
});

/* DELETE */
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...!")
    } catch (error) {
        res.status(500).json(error)
    }
});

/* GET USER */
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        console.log(others);
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

/* GET ALL USER */
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        //query for find latest logged user..!
        const users = query? await User.find().limit(5) : await User.find();
        console.log(users);
         const others = users.map((user)=> {
            const { password, ...rest } = user._doc;
            // console.log(others);
            return rest;
        } )
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;