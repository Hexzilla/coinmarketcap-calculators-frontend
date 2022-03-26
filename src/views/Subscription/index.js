import React from 'react';
import { Col, Layout, Radio, Row, Slider } from 'antd';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Content } from 'antd/lib/layout/layout';
import PlanCard from './PlanCard';
import { Paypal } from './Paypal';
import { Billing } from './Billing';
import './index.scss';

const pairs = [
  { user: "1 user", slider: 1},
  { user: "3 users", slider: 2},
  { user: "10 users", slider: 3},
]

const findSlider = (user) => {
  let pair = pairs.find(i => i.user === user);
  console.log("pair", pair);
  return pair.slider;
}

const findUser = (slider) => {
  let pair = pairs.find(i => i.slider === slider);
  console.log("pair", pair)
  return pair.user;
}

const Subscription = () => {
  const [method, setMethod] = React.useState("annually");
  const [user, setUser] = React.useState("1 user");
  const [slider, setSlider] = React.useState("1");

  const methodChange = e => {
    setMethod(e.target.value);
  };

  const usersChange = e => {
    setUser(e.target.value);
    setSlider(findSlider(e.target.value));
  };

  const sliderChange = e => {
    setSlider(e);
    setUser(findUser(e));
  }

  return (
    <Layout className='subscription-page'>
      <Content className='content'>
        <Row className="px-3 card-content" style={{width: 1180, paddingTop: '20%'}}>
          <Col flex="auto" align="middle">          
            <Row className='subscription'>              
              <Paypal />
              <Billing />
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>   
  );
};

export default Subscription;