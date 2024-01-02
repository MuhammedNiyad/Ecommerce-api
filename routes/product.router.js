const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Product = require('../models/Product.model');
const path = require('path');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, '/Upload/productImg')
//     },

//     filename: (req, file, callBack) => {
//         console.log(file);
//         callBack(null, Date.now() + path.extname(file.originalname))
//     }
// });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Upload/productImg')
    },

    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const uploadImg = multer({ storage: storage });


// CREATE

router.post("/", verifyTokenAndAdmin, uploadImg.single('image'), async (req, res) => {
    // console.log("file :", req.file);
    // console.log("file :", req.body);

    try {

        const newProduct = new Product({
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc,
            img: req.file.filename,
            categories: req.body.categories,
            pages: req.body.pages,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});


/* PUT PRODUCT UPDATE */
router.put("/:id", verifyTokenAndAdmin, uploadImg.single('image'), async (req, res) => {
    try {
        const update = req.file ? {
            ...req.body,
            img: req.file.filename
        } : {
            ...req.body,
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
            {
                $set: update
            },
        { new: true }
        );
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error);
    };
});

/* DELETE */
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...!")
    } catch (error) {
        res.status(500).json(error)
    }
});

/* GET PRODUCT */
router.get('/find/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

/* GET ALL PRODUCTS */
router.get('/', async (req, res) => {
    const queryNew = req.query.new;  // This is for if wanna get new products  add this to url (?new:true)
    const queryCategory = req.query.category; //This is for if you wanna get category based products add this to url (?category: example)
    console.log(queryCategory);
    try {
        let products;
        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if(queryCategory) {
            products = await Product.find({categories:{
                $in: [queryCategory],
            }})
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});


// GET IMAGE.....
router.get(`/images/:imageName`, (req, res) => {
    const imageName = req.params.imageName; // Retrieve the image name from the URL parameter
    const imagesFolder = path.join(__dirname, "../Upload", "productImg"); // Define the folder where images are stored
    const imagePath = path.join(imagesFolder, imageName); // Construct the full image path

    res.sendFile(imagePath); // Send the image file as a response
});



module.exports = router;