import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "", {
    apiVersion: '2022-11-15',
    appInfo: {
        name: 'EZONE',
        version: '1.0.0'
    }
});

export default stripe;