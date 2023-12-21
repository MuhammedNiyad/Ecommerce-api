const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require("dotenv");
const cors = require('cors');


dotenv.config();
<<<<<<< HEAD
app.use(cors())
app.use(express.json())
=======
app.use(cors());
app.use(express.json());

>>>>>>> 5adcc1cc0675db90161e360cc9cd7c0478874ec1

app.use("/api/user", require("./routes/user.router"));
app.use("/api/user", require("./routes/auth"));
app.use("/api/products", require("./routes/product.router"));
app.use('/api/carts', require('./routes/cart.router') );
app.use('/api/orders', require('./routes/order.router') );
app.use('/api/checkout', require('./routes/stripe'));



mongoose.connect(process.env.MY_DEVICE_MONGO_URL).then(() => {
    console.log("MongoDB connected successfully..!");
}).catch((err)=> {
    console.log(err);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running..!");
});
