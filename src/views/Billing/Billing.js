import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Col, Form, Input, Radio, Row, Tabs } from "antd";
import { Axios } from "axios";
import "./Billing.scss";

const { TabPane } = Tabs;

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

  const location = useLocation();
  const state = location.state;
  console.log("state", state);

  const cart = { products: [] }; //useSelector((state) => state.cart);
  const [error, setError] = useState("");
  const history = useHistory();
  // const dispatch = useDispatch();

  const getBillingDetails = (values) => {
    return {
      address: {
        city: "",
        country: "",
        state: "",
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

  const afterPaymentSuccess = (paymentIntent) => {
    // dispatch(clearCart());
    const { amount, id } = paymentIntent;
    history.push(`success?amount=${amount}&id=${id}`, {
      from: "checkout",
    });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log("onSubmit", values);
    setError("");
    const isStripeLoading = !stripe || !elements;

    if (isStripeLoading) {
      setSubmitting(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    console.log("cardElement", cardElement);

    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: values.name,
          email: values.email,
          address: values.address,
          phone: values.phone,
        }
      })

      const response = await Axios.post('api/stripe/secret', {
        amount: 100,
        paymentMethodId: paymentMethod.id,
      }, config);

      console.log('response', response)

      const {
        data: { client_secret: clientSecret },
      } = await Axios.post("payment/secret", {
        products: cart.products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
        email: values.email,
      });

      // const cardPayment = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardNumberElement),
      //     billing_details: getBillingDetails(values)
      //   }
      // });

      // if (cardPayment.error) {
      //   setError(cardPayment.error.message);
      // } else if (cardPayment.paymentIntent.status === 'succeeded') {
      //   afterPaymentSuccess(cardPayment.paymentIntent);
      // }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
      <Radio.Group defaultValue="stripe">
        <Radio.Button value="stripe">Stripe</Radio.Button>
        <Radio.Button value="paypal">Paypal</Radio.Button>
      </Radio.Group>
      <div className="stripe">
        <Form onSubmit={onSubmit} {...layout} size={"large"}>
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
            <Button type="primary" className="submit-button" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="paypal"></div>
    </div>
  );
};

export default Billing;
