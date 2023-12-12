const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json())

app.use("/api", require("./routes/user.router"));



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected successfully..!");
}).catch((err)=> {
    console.log(err);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running..!");
});
