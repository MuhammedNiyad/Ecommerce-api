const express = require("express");
const router = express.Router();

router.get('/user', (req, res) => {
    res.send("user router created successfull..!")
});

router.post('/user/postuser', (req,res) => {
    const username = req.body.username;
    res.send("Hello : " + username);
});


module.exports = router;