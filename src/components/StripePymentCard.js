import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JojOKANqHno2iJnUhvHytI2SsokdRaEZLKmG6ZzZrdcTaOp5PUCQv5d4YNacbvaZTN7Qcdk4psAglMyxdM6xMrw00TcV1mIOI');

function App() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};