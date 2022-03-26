import {useCallback, useState} from 'react';
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

  useCallback(() => {
    fetch("https://elafaki.com/", {
      headers: new Headers({
        'Authorization': '2|0hoiWwdd7bnitHwGXOHdomWrRev2gGSEKrhXHmjU'
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
    });
  }, [setClientSecret])

  /*const options = {
    // passing the client secret obtained from the server
    clientSecret: '1_secret_sk_test_51KhAunKqKcgR6dqiCd3sbrBzP3nw4qFafKTc8T2amK8MndKh6XEl4nm2FXP8oD3vYzwKY7UyaYihl87CwvhHEa4l00U1w4E418',
  };*/

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
