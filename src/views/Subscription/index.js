import React from 'react';
import { Col, Layout, Radio, Row, Slider } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import './index.scss';
import SubscriptionCard from './Card/card';

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
        <Row className="px-3 card-content" style={{width: 1180}}>
          <Col flex="auto"
              align="middle"
          >
            <Row className='subscription'>
              <div className='select'>
                <Row className='billed'>
                  <Radio.Group onChange={methodChange} value={method}>
                    <Radio value="annually">Billed annually - Save 35%</Radio>
                    <Radio value="monthly">Billed monthly</Radio>
                  </Radio.Group>
                </Row>
                <Row className='userbtn'>
                  <Radio.Group onChange={usersChange} value={user}>
                    <Radio value="1 user">1 user</Radio>
                    <Radio value="3 users">3 users</Radio>
                    <Radio value="10 users">10 users</Radio>
                  </Radio.Group>
                  <Slider onChange={sliderChange} value={slider} min={1} max={3} className='slider' tooltipVisible={false}>
                    <div className='before'></div>
                    <div className='after'></div>
                  </Slider>
                  <SubscriptionCard user={user} method={method}/>
                </Row>
              </div>
            </Row>

          </Col>
        </Row>
      </Content>
    </Layout>   
  );
};

export default Subscription;