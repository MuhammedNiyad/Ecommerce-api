<<<<<<< HEAD
const router = require("express").Router();
const stripe = require("stripe")('sk_test_51OPbFBSBJZ22bjuiHuuJPa9cw4tM1bZ02sy3NSov2Pk7czJaoLKSq5vGn9byNW5dHgByftuZ2tGJPKPyNkFxqE6S00GleT0P0C');

const YOUR_DOMAIN = "http://localhost:5173/";

router.post('/payment', async (req, res) => {
    try {
        const product = await stripe.products.create({
            name: 'best seller',
            type: 'good', // or 'good', 'service', etc.
          });
        
          const price = await stripe.prices.create({
            unit_amount: 1000, // amount in cents
            currency: 'inr',
            product: product.id,
          });
        
          console.log('Product ID:', product.id);
          console.log('Price ID:', price.id);
=======

const router = require("express").Router();
const stripe = require("stripe")('sk_test_51OP1RdSB7koZnX9z47tmOVY60vVqFTqXe0jCzybQTtP52962d7Wx624GeoQBXS05VANACadNLsT8WyagCcVUUGnW00qCvsowQP');

const YOUR_DOMAIN = 'http://127.0.0.1:5173';

router.post('/payment', async (req, res) => {
    try {
>>>>>>> 5adcc1cc0675db90161e360cc9cd7c0478874ec1

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
<<<<<<< HEAD
                    price: 'price_1OPdoISBJZ22bjui3bJu7MFx',
=======
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: req.body.name
                        },
                        unit_amount: req.body.price,
                    },
>>>>>>> 5adcc1cc0675db90161e360cc9cd7c0478874ec1
                    quantity: 1,
                },
            ],
            mode: 'payment',
<<<<<<< HEAD
            success_url: `${YOUR_DOMAIN}success?success=true`,
            cancel_url: `${YOUR_DOMAIN}checkout?canceled=true`,
        });
        res.redirect(303, session.url);

        
    } catch (error) {
        console.log(error);
    }
})
=======
            success_url: `${YOUR_DOMAIN}/success?success=true`,
            cancel_url: `${YOUR_DOMAIN}/checkout?canceled= true`,
        });
        res.redirect(303, session.url);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});
>>>>>>> 5adcc1cc0675db90161e360cc9cd7c0478874ec1

module.exports = router;

/* install stripe for using */