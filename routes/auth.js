const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require('bcrypt') /* Cryptojs for change user password to hash type..! */
const jwt = require('jsonwebtoken');
// REGISTER..!
router.post("/register", async (req, res) => {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });
    try {
        const savedUser = await newUser.save();
       return res.status(201).json(savedUser)
        // console.log(savedUser);
    } catch (error) {
        console.log(error);
       return res.status(500).json(error);
    }
});

/* LOGIN..! */
router.post("/login", async (req, res) => {
    try {
        // console.log(req.body);
        const user = await User.findOne({ username: req.body.username });
        // console.log(user);
        if (!user) {
            return res.status(401).json("Wrong credentials..!");
        };

        const validPassword = bcrypt.compareSync(req.body.password, user.password)

        if (!validPassword) {
            console.log(validPassword);
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