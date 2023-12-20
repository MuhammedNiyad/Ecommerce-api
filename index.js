const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');


dotenv.config();
app.use(cors());
app.use(express.json());


app.use("/api/user", require("./routes/user.router"));
app.use("/api/user", require("./routes/auth"));
app.use("/api/products", require("./routes/product.router"));
app.use('/api/carts', require('./routes/cart.router') );
app.use('/api/orders', require('./routes/order.router') );
app.use('/api/checkout', require('./routes/stripe'));



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected successfully..!");
}).catch((err)=> {
    console.log(err);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running..!");
});
