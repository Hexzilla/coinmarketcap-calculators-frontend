import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './card.less';

export const subscriptions = [
  {user: "1 user", method: 'monthly', price: 55, type: 'Standard'},
  {user: "1 user", method: 'monthly', price: 69, type: "Premium"},
  {user: "1 user", method: 'monthly', price: 99, type: "Enterprise"},
]


const PlanCard = ({ user, method, type}) => {
  // const [type, setType] = React.useState();
  // const [price, setPrice] = React.useState();
  // const [classes, setClasses] = React.useState();

  const findPrice = () => {
    let item = subscriptions.find(it => (it.type === type));
    let price;
    if(method === "monthly"){
      if(user === "1 user") price = item.price;
      else if(user === "3 users") price = item.price * 3;
      else if(user === "10 users") price = item.price * 10;
    }
    else if(method === "annually"){
      if(user === "1 user") price = parseInt(item.price * 0.65);
      else if(user === "3 users") price = parseInt(item.price * 0.65) * 3;
      else if(user === "10 users") price = parseInt(item.price * 0.65) * 10;
    }
    console.log("item", item);
    //let price = item.price;
    return price;
  }
  
  const findClass = () => {
    let classes = method + " " + type.toLowerCase();
    return classes;
  }

  const data = {
    type: type,
    method: method,
    price: findPrice()
  };

  console.log("data",data)  
  return (
    <Card className='priceCard'>
      <div className='card-inner'>
        <div className={findClass()}>
        <div className='card-header'>
          <h2 className='card-title'>{type}</h2>
          <div className='card-price'>
            ${findPrice()}
            <div className='permonth'> /month</div>
          </div>
          <div className='show-annually'>Billed annually</div>          
          <Link to={{pathname: '/billing', state: data}} className='button-wide'>Start Free Trial</Link>
        </div>
        <div className='card-features'>
          <div className='features standard-features'>
            <p className='card-feature'>Unlimmited access to Profit Loss Calculator</p>
            <p className='card-feature card-feature-cross'>Unlimitd access to Crypto Profit Calculator</p>
            <p className='card-feature card-feature-cross'>Unlimitd access to Cryptocurrency Conversion Calculatore</p>
            <p className='card-feature'>5 collections</p>
            <p className='card-feature'>Unlimited boards</p>
            <p className='card-feature'>Unlimited backlogs</p>
            <p className='card-feature'>Basic Support</p>
            <p className='card-feature card-feature-cross'>Guests accounts</p>
            <p className='card-feature card-feature-cross'>10000 API calls per hour</p>
            <p className='card-feature card-feature-cross'>Enterprise support-24 hour</p>
            <p className='card-feature card-feature-cross'>Manage collections</p>
          </div>
          <div className='features premium-features'>
            <p className='card-feature'>Unlimmited access to Profit Loss Calculator</p>
            <p className='card-feature'>Unlimitd access to Crypto Profit Calculator</p>
            <p className='card-feature card-feature-cross'>Unlimitd access to Cryptocurrency Conversion Calculatore</p>
            <p className='card-feature'>Unlimited apps and integrations</p>
            <p className='card-feature'>Unlimited storages</p>
            <p className='card-feature'>Reports</p>
            <p className='card-feature'>Apps for iOS and Android</p>
            <p className='card-feature'>Guest accounts</p>
            <p className='card-feature'>1000 API calls per hour</p>
            <p className='card-feature card-feature-cross'>Manage collections</p>
            <p className='card-feature card-feature-cross'>SAML based single sign-on(SSO)</p>
          </div>
          <div className='features enterprise-features'>
            <p className='card-feature'>Unlimmited access to Profit Loss Calculator</p>
            <p className='card-feature'>Unlimitd access to Crypto Profit Calculator</p>
            <p className='card-feature'>Unlimitd access to Cryptocurrency Conversion Calculatore</p>
            <p className='card-feature'>Unlimited collections</p>
            <p className='card-feature'>Unlimited private collections</p>
            <p className='card-feature'>Unlimited boards and backlogs</p>
            <p className='card-feature'>Unlimited apps and integrations</p>
            <p className='card-feature'>Unlimited storages</p>
            <p className='card-feature'>Report and Timesheet reporting</p>
            <p className='card-feature'>Apps for iOS and Android</p>
            <p className='card-feature'>Guest accounts</p>
          </div>
        </div>          
        </div>
      </div>
    </Card>
  )
}

export default PlanCard;