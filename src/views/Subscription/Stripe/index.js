import {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import toast from "react-hot-toast";

const stripePromise = loadStripe('pk_test_51KhAunKqKcgR6dqiyJXwb23aTDjgCshx70LUMFzbdvp1fV1Cte9OqT1SQ212UsRfetzF6tGqlQykMzTEkCf9Bj7200wJWV7r26');

export const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export function Stripe() {
  const [clientSecret, setClientSecret] = useState('');
  const [options, setOptions] = useState(undefined);

  useEffect(() => {
    console.log("useEffect")
    fetch("https://elafaki.com/api/stripe/secret", {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Authorization': 'Bearer 2|0hoiWwdd7bnitHwGXOHdomWrRev2gGSEKrhXHmjU'
      })
    })
    .then((response) => response.json())
    .then((data) => {
      const {intent} = data;
      console.log("data", data);
      const secret = `${intent.id}_secret_${intent.client_secret}`;
      setClientSecret(secret);
      setOptions({ 
        clientSecret: secret,
      });
      console.log("clientSecret", secret)
    });
  }, [setClientSecret, setOptions])

  return (
    <>
      {options && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}
