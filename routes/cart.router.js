const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

// CREATE

// router.post("/", verifyToken, async (req, res) => {

    
//     // console.log("reqbody", req.body);
//     // console.log("user:", req.user);
//     // const newCart = new Cart({ ...req.body, userId: req.user.id })
//     // console.log(newCart);
//     // try {
//         //     const saveCart = await newCart.save();
//         //     res.status(200).json(saveCart);
//         // } catch (error) {
//             //     console.log("error: ", error);
//             //     res.status(500).json(error);
//             // }
            
//             const { productId, quantity } = req.body;
//             try {
//                 let cart = await Cart.findOne({userId : req.user.id})

//                 if(!cart){
//                     cart = new Cart({ ...req.body, userId: req.user.id});
//                 } else {
//                     const existProduct = cart.products.find(product => product.productId === productId)
//                     console.log(existProduct);

//                     if(existProduct){
//                         existProduct.quantity ++;
//                     }else{
//                         cart.products.push({ productId, quantity });
//                     }
//                 }
                
//                 const saveCart = await cart.save();
//                 res.status(200).json({ message: 'Product added to cart successfully!', saveCart });

//             } catch (error) {
//                 console.log("error: ", error);
//                 res.status(500).json(error);
//             }
            
// }); 



router.post("/", verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        const {price} = await Product.findById(productId);

        if (!cart) {
            // If the user doesn't have a cart, create a new one
            cart = new Cart({ userId: req.user.id, products: [{ productId, quantity, totalPrice:price }] });
        } else {
            const existingProductIndex = cart.products.findIndex(product => product.productId === productId);

            if (existingProductIndex !== -1) {
                // If the product already exists in the cart, update its quantity
                // console.log(cart.products[existingProductIndex].quantity);
                cart.products[existingProductIndex].quantity += +quantity;
                cart.products[existingProductIndex].totalPrice = price * cart.products[existingProductIndex].quantity;
            } else {
                // If the product doesn't exist, add it to the products array
                cart.products.push({ productId, quantity, totalPrice:price*quantity });
            }
        }

        // Calculate the grand total
        cart.grandTotal = cart.products.reduce((total, product) => total + product.totalPrice, 0);
        
        const saveCart = await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully!', saveCart });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json(error);
    }
});

/* PUT CART UPDATE */
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
            },
        { new: true }
        );
        return res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json(error);
    };
});

/* DELETE */
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        console.log(req.params.id);
        const cart =await Cart.findOne({userId: req.user.id});

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const productId = req.params.id;
                // Using filter to remove the product with a specific productId from the products array
                cart.products = cart.products.filter(product => product.productId !== productId);
    
        // await Cart.findByIdAndDelete({products:[req.params.id]});
        await cart.save();
        res.status(200).json("product has been deleted...!")

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

/* GET USER CART */
router.get('/userCart', verifyTokenAndAuthorization, async (req, res,) => {
    try {
        // console.log( 'user-id : ',req.user.id);
        const cart = await Cart.findOne({ userId: req.user.id });
        // console.log( 'userCart : ',cart);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

/* GET FIND CART */
router.get('/find/:cartId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// /* GET ALL */

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;