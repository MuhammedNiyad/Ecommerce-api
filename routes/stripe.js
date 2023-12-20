
const router = require("express").Router();
const stripe = require("stripe")('sk_test_51OP1RdSB7koZnX9z47tmOVY60vVqFTqXe0jCzybQTtP52962d7Wx624GeoQBXS05VANACadNLsT8WyagCcVUUGnW00qCvsowQP');

const YOUR_DOMAIN = 'http://127.0.0.1:5173';

router.post('/payment', async (req, res) => {
    try {

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: req.body.name
                        },
                        unit_amount: req.body.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success?success=true`,
            cancel_url: `${YOUR_DOMAIN}/checkout?canceled= true`,
        });
        res.redirect(303, session.url);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});



module.exports = router;

/* install stripe for using */