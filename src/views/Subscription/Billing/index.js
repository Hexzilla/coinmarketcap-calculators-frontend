import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Input } from 'antd'
import {
  useStripe,
  useElements,
  CardNumberElement
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { validate } from 'helpers/validation';
import Axios from '../../../axios';
import style from './index.scss';
import {
  checkoutRules,
  checkoutInitialValues
} from '../../../constants/validation';
import CardSection from '../CardSection';

const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWU4YjFjOC0xNjAwLTQ4YjMtOTlkYi0yNWViYmFjYzVjNzUiLCJqdGkiOiIyZWRjMTM1ZDNhYjE4NGZlN2Y4MjM0ZmRmZTc5NWFiMGU3NmJiZDI0M2ZjYzI5YTRhMTc4YTY2MzAyNDIxYWNmODVlYTBlMjM5ZmI3NmZiNiIsImlhdCI6MTY0ODI3MDc3OS4xNzAzNTQsIm5iZiI6MTY0ODI3MDc3OS4xNzAzNTksImV4cCI6MTY3OTgwNjc3OS4xMzc4NjEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.iutA87AGo-0fg1H37VHn7pF9sL-AGJNlD1FlDxmlubQ3KqG93qYhLgIllUAC-9oykT7nJ_5I1Kasj7_nAsfxbUIj7qGUgotOJ7HBVZS9A_AWEry0oiSyOXONv1cGs1wOJsOiUkvtQLuBpE6ihpZkKDepU-2WOCBKVlCJAlQrF4mLYrZXUc3UZEkeunuTUp7FnArbDMJrSu9B8iUeLYE9D2MaR6YNdAo4Up5XLLNJEkjdYFvNJeJR84tolE7cZBNIBp_0sXOJTOu7DJxGC1IzHianO_7eReRe6OkJDPuUNPxy4BAo0OLBeIuy13kYWZUv7FS2LTEGjuZzm-AqT6n4YFJplN2hhFvcTchcJglIZbvBTm9x23TBGTyRgiFA4frmjaTO3Ii8vJzxeHfjyOPXDJgUWqSeyzQxQg-YvDvJybDJGBDSbKY_n5eX609jmOJdBJTFyN_MpPextrSI70FGBNwM6jQ4AMJd0gsNpm-vFK_uTDFXUDtlN63TQV7VtSjutb_CFwi-kgCMbE-kMD0WPc1TZkmHuzlo4OGY4wENpzmkfuMP_gD4F4sO5IxKGVhktzAMDcYKVrGdU-nApeUVkKgbTuhcMvyrMGCjBBlQbMOxEhd6dsbdc2iZiQizvGd0S6X6KvNrvKkKdcwEUi3FBoRfiyYODoEDC_Ie1-rnqUY';

export const Billing = () => {
  // The useStripe hook returns a reference to the Stripe instance passed to the Elements provider.
  const stripe = useStripe();

  // To safely pass the payment information collected by an Element to the Stripe API, access the component’s underlying Element instance so that you can use it with other Stripe.js methods.
  const elements = useElements();

  // Get cart from Redux state
  const cart = {
    products: [
      {
        id: 1,
        quantity: 10,
      }
    ]
  }
  const [error, setError] = useState('');
  const history = useHistory();

  const getBillingDetails = (values) => {
    return {
      address: {
        // You can use select elements to accept more countries, cities, states
        // and retrieve the data from "values"
        city: 'Singapore',
        country: 'SG',
        state: 'Singapore',
        line1: values.address,
        line2: null,
        postal_code: values.zip
      },
      email: values.email,
      name: values.name,
      phone: values.phone
    };
  };

  const handleCardElementsChange = (event) => {
    // Set error message to be shown when the user inputs incorrect payment data
    if (event.error) {
      setError(event.error.message);
    } else {
      setError('');
    }
  };

  const afterPaymentSuccess = (paymentIntent) => {
    /* There's a risk of the customer closing the window before this is executed
     Set up a webhook or plugin to listen for the payment_intent.succeeded event that handles any business critical post-payment actions.
     */
    //dispatch(clearCart());

    const { amount, id } = paymentIntent;

    // Redirect to success page
    history.push(`/success?amount=${amount}&id=${id}`, {
      from: 'checkout'
    });
  };

  const onSubmit = async (values) => {
    console.log("onSubmit");

    setError('');
    const isStripeLoading = !stripe || !elements;

    if (isStripeLoading) {
      // Make sure to disable form submission until Stripe has loaded
      //setSubmitting(false);
      return;
    }

    try {
      // Create a payment intent and get a client secret from the server
      // Always decide how much to charge on the server side, a trusted environment, as opposed to the client. This prevents malicious customers from being able to choose their own prices.
      const response = await Axios.post('api/stripe/secret', {
        email: 'eric@gmail.com'
      });

      const { data: { client_secret: clientSecret } } = response;

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      // Use stripe.confirmCardPayment when the customer submits your payment form. When called, it will confirm the PaymentIntent with data you provide and carry out 3DS or other next actions if they are required.
      const cardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: getBillingDetails(values)
        }
      }, config);

      if (cardPayment.error) {
        setError(cardPayment.error.message);
      } else if (cardPayment.paymentIntent.status === 'succeeded') {
        afterPaymentSuccess(cardPayment.paymentIntent);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      //setSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={onSubmit}>Submit</button>
    </>
  )

  // return (
  //   <Formik
  //     initialValues={checkoutInitialValues}
  //     validate={(values) => validate(checkoutRules, values)}
  //     onSubmit={onSubmit}
  //   >
  //     {({ isSubmitting, errors, touched }) => (
  //       // isSubmitting Returns true if submission is in progress
  //       // stripe.confirmCardPayment may take several seconds to complete. During that time, this disables the form from being resubmitted and shows a "Submitting..." message
  //       // https://jaredpalmer.com/formik/docs/api/formik#issubmitting-boolean
  //       <Form>
  //         <div className={style.wrapBillingAndCardSection}>
  //           <div>
  //             <Input
  //               label="Name"
  //               name="name"
  //               placeholder="John Doe"
  //               errors={errors}
  //               touched={touched}
  //             />
  //             <Input
  //               label="Phone Number"
  //               name="phone"
  //               type="tel"
  //               pattern="[0-9]*"
  //               placeholder="0734234234"
  //               errors={errors}
  //               touched={touched}
  //             />
  //             <Input
  //               label="Email"
  //               name="email"
  //               type="email"
  //               placeholder="john.doe@placeholder.com"
  //               errors={errors}
  //               touched={touched}
  //             />
  //             <Input
  //               label="Address"
  //               name="address"
  //               type="text"
  //               placeholder="206 Fake St."
  //               errors={errors}
  //               touched={touched}
  //             />

  //             <Input
  //               label="Zip"
  //               name="zip"
  //               type="text"
  //               placeholder="162782"
  //               errors={errors}
  //               touched={touched}
  //             />
  //           </div>
  //           <div>
  //             <CardSection
  //               stripe={stripe}
  //               isSubmitting={isSubmitting}
  //               error={error}
  //               handleChange={handleCardElementsChange}
  //             />
  //           </div>
  //         </div>
  //       </Form>
  //     )}
  //   </Formik>
  // );
};
