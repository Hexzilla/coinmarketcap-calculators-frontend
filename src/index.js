import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import { store } from 'helpers';
import {loadStripe} from '@stripe/stripe-js';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { STRIPE_PUBLISHABLE_KEY } from './constants/constants';
import { Provider } from 'react-redux';

// Load Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
