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

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1OPdoISBJZ22bjui3bJu7MFx',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}success?success=true`,
            cancel_url: `${YOUR_DOMAIN}checkout?canceled=true`,
        });
        res.redirect(303, session.url);

        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

/* install stripe for using */