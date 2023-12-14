const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const User = require("../models/User.model");

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



module.exports = router;