import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
const secrete_key: any = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(secrete_key, {
    apiVersion: '2023-10-16',
});

const createCheckoutSession = async(req: NextApiRequest, res: NextApiResponse) => {
    const { quantity } = req.body;
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.PRICE_ID,
        quantity,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/checkout`,
  })
  res.status(200).json({ sessionId: session.id })
}

export default createCheckoutSession;
