import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
const secrete_key: any = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(secrete_key, {
    apiVersion: '2023-10-16',
});

const getCheckoutSession = async(req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(id as string, {expand: ['payment_intent']})
    res.status(200).json({ session })
}

export default getCheckoutSession;
