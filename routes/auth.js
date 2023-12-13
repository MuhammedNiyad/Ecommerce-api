const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js"); /* Cryptojs for change user password to hash type..! */
const jwt = require('jsonwebtoken');

// REGISTER..!
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),  //PASS_SEC is user password security key..! 
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
        console.log(savedUser);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

/* LOGIN..! */
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json("Wrong credentials..!");
        };

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        if (hashedPassword !== req.body.password) {
            return res.status(401).json("Wrong credentials..!");
        };

        const access_token = jwt.sign({         /*Creating JSON WEB TOKEN  */
            id: user._id,
            isAdmin:user.isAdmin,
        }, process.env.JWT_SEC);

        const { password, ...others } = user._doc;
        console.log(others);
        res.status(200).json({others, access_token});
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;