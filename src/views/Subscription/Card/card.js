import { Card } from 'antd';
import React, { useEffect } from 'react';
import './card.css';

export const prices = [
  {user: "1 user", method: 'monthly', price: 55, type: 'Standard'},
  {user: "1 user", method: 'annually', price: 35, type: "Standard"},
  {user: "3 users", method: 'monthly', price: 69, type: 'Premium'},
  {user: "3 users", method: 'annually', price: 45, type: 'Premium'},
  {user: "10 users", method: 'monthly', price: 99, type: "Enterprise"},
  {user: "10 users", method: 'annually', price: 65, type: "Enterprise"},
]


const SubscriptionCard = ({ user, method }) => {
  const [type, setType] = React.useState();
  const [price, setPrice] = React.useState();
  const [classes, setClasses] = React.useState();

  const findPrice = () => {
    let item = prices.find(it => (it.user === user && it.method === method));
    console.log("item", item);
    let price = item.price;
    return price;
  }

  const findType = () => {
    let item = prices.find(it => (it.user === user && it.method === method));
    let type = item.type;
    return type;
  }
  
  const findClass = () => {
    let item = prices.find(it => (it.user === user && it.method === method));
    let classes = method + " " + findType().toLowerCase();
    return classes;
  }

  return (
    <Card className='priceCard'>
      <div className='card-inner'>
        <div className={findClass()}>
        <div className='card-header'>
          <h2 className='card-title'>{findType()}</h2>
          <div className='card-price'>
            ${findPrice()}
            <div className='permonth'> /month</div>
          </div>
          <div className='show-annually'>Billed annually</div>
          <a href="#" className='button-wide'>Try free for 14days</a>
          <div className='card-text'>No credit card required</div>
        </div>
        <div className='card-features'>
          <div className='features lite-features'>
            <p className='card-feature'>5 collections</p>
            <p className='card-feature'>Unlimited boards</p>
            <p className='card-feature'>Unlimited backlogs</p>
            <p className='card-feature'>Apps for iOS and Android</p>
            <p className='card-feature'>Basic Support</p>
            <p className='card-feature'>OAuth via Google and Github</p>
            <p className='card-feature card-feature-cross'>Guests accounts</p>
            <p className='card-feature card-feature-cross'>10000 API calls per hour</p>
            <p className='card-feature card-feature-cross'>Enterprise support-24 hour response time on weekdays</p>
            <p className='card-feature card-feature-cross'>Manage collections</p>
            <p className='card-feature card-feature-cross'>SAML based single sign-on (SSO)</p>
            <p className='card-feature card-feature-cross'>SCMI user provisioning</p>
            <p className='card-feature card-feature-cross'>DPA and enhanced GDPR support</p>
          </div>
          <div className='features standard-features'>
            <p className='card-feature'>Unlimited collections</p>
            <p className='card-feature'>Unlimited private collections</p>
            <p className='card-feature'>Unlimited boards and backlogs</p>
            <p className='card-feature'>Unlimited apps and integrations</p>
            <p className='card-feature'>Unlimited storages</p>
            <p className='card-feature'>Reports</p>
            <p className='card-feature'>Apps for iOS and Android</p>
            <p className='card-feature'>Guest accounts</p>
            <p className='card-feature'>1000 API calls per hour</p>
            <p className='card-feature'>Standard support</p>
            <p className='card-feature'>OAuth via Google and Github</p>
            <p className='card-feature card-feature-cross'>Manage collections</p>
            <p className='card-feature card-feature-cross'>SAML based single sign-on(SSO)</p>
            <p className='card-feature card-feature-cross'>SCIM user provisioning</p>
          </div>
          <div className='features enterprise-features'>
            <p className='card-feature'>Unlimited collections</p>
            <p className='card-feature'>Unlimited private collections</p>
            <p className='card-feature'>Unlimited boards and backlogs</p>
            <p className='card-feature'>Unlimited apps and integrations</p>
            <p className='card-feature'>Unlimited storages</p>
            <p className='card-feature'>Report and Timesheet reporting</p>
            <p className='card-feature'>Apps for iOS and Android</p>
            <p className='card-feature'>Guest accounts</p>
            <p className='card-feature'>10000 API calls per hour</p>
            <p className='card-feature'>Enterprise support - 24 hours response time on weekdays</p>
            <p className='card-feature'>OAuth via Google and Github</p>
            <p className='card-feature'>Manage collections</p>
            <p className='card-feature'>SAML based single sign-on(SSO)</p>
            <p className='card-feature'>SCIM user provisioning</p>
            <p className='card-feature'>DPA and enhanced GDPR support</p>
          </div>
        </div>
        </div>
      </div>
    </Card>
  )
}

export default SubscriptionCard;