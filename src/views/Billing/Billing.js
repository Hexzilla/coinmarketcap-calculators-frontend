import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import { Button, Col, Form, Input, Row } from "antd";
import { Axios } from "axios";
import "./Billing.scss";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { PAYPAL } from "utils/constants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWU4YjFjOC0xNjAwLTQ4YjMtOTlkYi0yNWViYmFjYzVjNzUiLCJqdGkiOiIyZWRjMTM1ZDNhYjE4NGZlN2Y4MjM0ZmRmZTc5NWFiMGU3NmJiZDI0M2ZjYzI5YTRhMTc4YTY2MzAyNDIxYWNmODVlYTBlMjM5ZmI3NmZiNiIsImlhdCI6MTY0ODI3MDc3OS4xNzAzNTQsIm5iZiI6MTY0ODI3MDc3OS4xNzAzNTksImV4cCI6MTY3OTgwNjc3OS4xMzc4NjEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.iutA87AGo-0fg1H37VHn7pF9sL-AGJNlD1FlDxmlubQ3KqG93qYhLgIllUAC-9oykT7nJ_5I1Kasj7_nAsfxbUIj7qGUgotOJ7HBVZS9A_AWEry0oiSyOXONv1cGs1wOJsOiUkvtQLuBpE6ihpZkKDepU-2WOCBKVlCJAlQrF4mLYrZXUc3UZEkeunuTUp7FnArbDMJrSu9B8iUeLYE9D2MaR6YNdAo4Up5XLLNJEkjdYFvNJeJR84tolE7cZBNIBp_0sXOJTOu7DJxGC1IzHianO_7eReRe6OkJDPuUNPxy4BAo0OLBeIuy13kYWZUv7FS2LTEGjuZzm-AqT6n4YFJplN2hhFvcTchcJglIZbvBTm9x23TBGTyRgiFA4frmjaTO3Ii8vJzxeHfjyOPXDJgUWqSeyzQxQg-YvDvJybDJGBDSbKY_n5eX609jmOJdBJTFyN_MpPextrSI70FGBNwM6jQ4AMJd0gsNpm-vFK_uTDFXUDtlN63TQV7VtSjutb_CFwi-kgCMbE-kMD0WPc1TZkmHuzlo4OGY4wENpzmkfuMP_gD4F4sO5IxKGVhktzAMDcYKVrGdU-nApeUVkKgbTuhcMvyrMGCjBBlQbMOxEhd6dsbdc2iZiQizvGd0S6X6KvNrvKkKdcwEUi3FBoRfiyYODoEDC_Ie1-rnqUY";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: 16,
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Billing = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.authentication.user);

  const location = useLocation();
  const state = location.state;
  //console.log("state", state);

  //const cart = { products: [] }; //useSelector((state) => state.cart);
  const [error, setError] = useState("");
  const [style, setStyle] = useState("stripe-payment");
  //const history = useHistory();
  // const dispatch = useDispatch();

  const getBillingDetails = (values) => {
    return {
      address: {
        city: "Singapore",
        country: "SG",
        state: "Singapore",
        line1: values.address,
        line2: null,
        postal_code: values.zip,
      },
      email: values.email,
      name: values.name,
      phone: values.phone,
    };
  };

  const handleCardElementsChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError("");
    }
  };

  const changeStyle1 = () => {
    setStyle("stripe-payment");
  };

  const changeStyle2 = () => {
    setStyle("paypal-payment");
  };

  /*const afterPaymentSuccess = (paymentIntent) => {
    // dispatch(clearCart());
    const { amount, id } = paymentIntent;
    history.push(`success?amount=${amount}&id=${id}`, {
      from: "checkout",
    });
  };*/

  const onSubmit = async (values) => {
    console.log("onSubmit", values);
    setError("");
    const isStripeLoading = !stripe || !elements;

    if (isStripeLoading) {
      //setSubmitting(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    console.log("cardElement", cardElement);

    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: getBillingDetails(values),
      });

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await Axios.post(
        "api/stripe/secret",
        {
          amount: state.price,
          paymentMethodId: paymentMethod.id,
        },
        config
      );

      console.log("response", response);
      toast("Your payment was successfully processed");
    } catch (err) {
      setError(err.message, error); //TODO
    } finally {
      //setSubmitting(false);
    }
  };

  if (!user?.access_token) {
    return <Redirect to="/login" />;
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const layout2 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const layout3 = {
    wrapperCol: { span: 24 },
  };

  return (
    <div className="Billing">
      <div className="type">{state.type}</div>
      <div className="method">{state.method}</div>
      <div className="price">$ {state.price}</div>

      <div className="btn-group">
        <Button
          className="stripe-button"
          type="primary"
          size="large"
          onClick={changeStyle1}
        >
          Stripe
        </Button>
        <Button
          className="paypal-button"
          type="primary"
          size="large"
          onClick={changeStyle2}
        >
          Paypal
        </Button>
      </div>
      <div className={style}>
        <div className="stripe">
          <Form onFinish={onSubmit} {...layout} size={"large"}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item label="Email" type="email" name="email">
              <Input placeholder="example@gmail.com" />
            </Form.Item>
            <Form.Item label="Address" type="text" name="address">
              <Input />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="Phone" type="tel" name="phone" {...layout2}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Form.Item label="Zip" name="zip" {...layout2}>
                  <Input placeholder="000000" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Card number">
              <CardNumberElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardElementsChange}
              />
            </Form.Item>
            <Form.Item label="Expiration date">
              <CardExpiryElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardElementsChange}
              />
            </Form.Item>
            <Form.Item label="CVC">
              <CardCvcElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardElementsChange}
              />
            </Form.Item>
            <Form.Item {...layout3}>
              <Button
                type="primary"
                className="submit-button"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="paypal">
          <PayPalScriptProvider options={{ "client-id": PAYPAL.CLIENT_ID }}>
            <div className="card">
              <div className="card-details">
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: state.price,
                          },
                          custom_id: "e-book-1234",
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(function (details) {
                      toast.success(
                        "Payment completed. Thank you, " +
                          details.payer.name.given_name
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
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Billing;
