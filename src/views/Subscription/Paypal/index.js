import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import toast from "react-hot-toast";
import { PAYPAL } from 'utils/constants'

export function Paypal() {
  return (
    <PayPalScriptProvider  options= {{ 'client-id': PAYPAL.CLIENT_ID }}>
      <div className="card">
        <div className="card-details">
          <h1>Airtable Product</h1>
          <p className="price">$10.00</p>
          <p>Some information about the product</p>
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "10.00",
                    },
                    custom_id: "e-book-1234", // the name or slug of the thing you're selling
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                toast.success(
                  "Payment completed. Thank you, " + details.payer.name.given_name
                );
              });
            }}
            onCancel={() =>
              toast(
                "You cancelled the payment. Try again by clicking the PayPal button",
                {
                  duration: 6000,
                }
              )
            }
            onError={(err) => {
              toast.error(
                "There was an error processing your payment. If this error please contact support.",
                {
                  duration: 6000,
                }
              );
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
