require('dotenv').config();
import {loadStripe} from '@stripe/stripe-js';


// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

// if (!stripePublicKey) {
//   throw new Error('STRIPE_PUBLIC_KEY environment variable is not defined');
// }

// console.log('key ---f-', stripePublicKey);

const stripePromise = loadStripe('pk_test_51O2BcqDYGqu4gEhP5ML89RGQoFtgQMriJb7JmZya261SVHzCLRQXjFLp534TbDz22gr75JLv4uNHKZ5UfEtr4zaR00Fgj9I0fQ');

const Checkout = () => {
    const handleClick = async(event: any) => {
        const { sessionId } = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: 1 }),
        }).then((res) => res.json())

        const stripe = await stripePromise;
        const { error } = await stripe?.redirectToCheckout({
            sessionId,
        });


    }
    return (
        <div>
            <h1>Checkout</h1>
            <button role="link" onClick={handleClick}>
                Checkout
            </button>
        </div>
    )
}


export default Checkout;
