import React from 'react';
import { Col, Layout, Radio, Row, Select, Slider} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import PlanCard from './PlanCard';
import './index.less';

const { Option } = Select;

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

  const methodChange1 = e => {
    setMethod(e);
  }

  const usersChange = e => {
    setUser(e.target.value);
    setSlider(findSlider(e.target.value));
  };

  const usersChange1 = e => {
    setUser(e);
  }

  const sliderChange = e => {
    setSlider(e);
    setUser(findUser(e));
  }

  return (
    <Layout className='subscription-page'>
      <Content className='content'>
        <Row className="billed">
          <Radio.Group onChange={methodChange} value={method}>
            <Radio className="billed-item" value="annually">Billed annually - Save 35%</Radio>
            <Radio className="billed-item" value="monthly">Billed monthly</Radio>
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
        </Row>
        <Row className='billed-mobile'>
          <Select defaultValue="annually" onChange={methodChange1} value={method}>
            <Option value="annually">Billed annually - Save 35%</Option>
            <Option value="monthly">Billed monthly</Option>
          </Select>
        </Row>
        <Row className='userbtn-mobile'>
          <Select defaultValue="1 user" onChange={usersChange1} value={user}>
            <Option value="1 user">1 user</Option>
            <Option value="3 users">3 users</Option>
            <Option value="10 users">10 users</Option>
          </Select>
        </Row> 
        <Row className="px-3 mt-5 card-content" >
          <Col sm={{ span: 24 }} lg={{ span: 7, offset: 0 }}>
            <PlanCard user={user} method={method} type={"Standard"}/>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
              <PlanCard user={user} method={method} type={"Premium"}/>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
            <PlanCard user={user} method={method} type={"Enterprise"}/>
          </Col>
        </Row>
      </Content>
    </Layout>   
  );
};

export default Subscription;