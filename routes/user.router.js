const express = require("express");
const router = express.Router();
const { verifyToken } = require("./verifyToken")

router.put("/:id", verifyToken);



module.exports = router;