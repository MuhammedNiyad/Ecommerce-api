const router = require("express").Router();
const stripe = require("stripe")('sk_test_51OPbFBSBJZ22bjuiHuuJPa9cw4tM1bZ02sy3NSov2Pk7czJaoLKSq5vGn9byNW5dHgByftuZ2tGJPKPyNkFxqE6S00GleT0P0C');

const YOUR_DOMAIN = 'http://127.0.0.1:5173';

router.post('/payment', async (req, res) => {
    try {
        console.log(req.body);

        const price = await stripe.prices.create({
            currency: 'inr',
            unit_amount: 10000,
            product_data: {
              name: req.body.name,
            },
          });


        const session = await stripe.checkout.sessions.create({
            // line_items: [
            //     {
            //         // price: 'price_1OPdoISBJZ22bjui3bJu7MFx',
            //         price_data: {
            //             currency: "inr",
            //             product_data: {
            //                 name: req.body.name,
            //             },
            //             unit_amount: 10000,
            //         },
            //         customElements:{
                            
            //         },
            //         quantity: 1,
            //     },
            // ],
            line_items: [
                {
                  // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                  price: price.id,
                  quantity: 1,
                },
              ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success?success=true`,
            cancel_url: `${YOUR_DOMAIN}/checkout?canceled=true`,
        });
        return res.json({ url: session.url });

        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

/* install stripe for using */