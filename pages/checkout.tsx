require('dotenv').config();
import {loadStripe} from '@stripe/stripe-js';


const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

// if found error pasted key directly in loadStripe()
const stripePromise = loadStripe(stripePublicKey ?? 'none');

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
        // const { error } = await stripe?.redirectToCheckout({
        //     sessionId,
        // });


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
