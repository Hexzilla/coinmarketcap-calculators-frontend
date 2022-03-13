import React, { useEffect, useState, useCallback } from "react";
import { Layout, Row, Col, InputNumber, Space, Button, Select } from "antd";
import moment from 'moment'
import "./index.scss";
import SelectDate from "./SelectDate";

const { Content } = Layout;
const { Option } = Select;


export const cryptoList = [
  {
    "id": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
  },
  {
      "id": 1027,
      "name": "Ethereum",
      "symbol": "ETH",
  },
  {
    "id": 74,
    "name": "Dogecoin",
    "symbol": "DOGE",
  },
  {
    "id": 1839,
    "name": "BNB",
    "symbol": "BNB",
  },
  {
    "id": 2,
    "name": "Litecoin",
    "symbol": "LTC",
  },
  {
    "id": 2010,
    "name": "Cardano",
    "symbol": "ADA",
  },
  {
    "id": 52,
    "name": "XRP",
    "symbol": "XRP",
  },
  {
    "id": 6636,
    "name": "Polkadot",
    "symbol": "DOT",
  },
  {
    "id": 1831,
    "name": "Bitcoin Cash",
    "symbol": "BCH",
  },
  {
    "id": 4687,
    "name": "Binance USD",
    "symbol": "BUSD",
  },
  {
    "id": 4943,
    "name": "Dai",
    "symbol": "DAI",
  },
  {
    "id": 1321,
    "name": "Ethereum Classic",
    "symbol": "ETC",
  },
  {
    "id": 8916,
    "name": "Internet Computer",
    "symbol": "ICP",
  },
  {
    "id": 3408,
    "name": "USD Coin",
    "symbol": "USDC",
  },
  {
    "id": 1975,
    "name": "Chainlink",
    "symbol": "LINK",
  },
  {
    "id": 1958,
    "name": "TRON",
    "symbol": "TRX",
  },
  {
    "id": 7083,
    "name": "Uniswap",
    "symbol": "UNI",
  },
  {
    "id": 825,
    "name": "Tether",
    "symbol": "USDT",
  },
  {
    "id": 512,
    "name": "Stellar",
    "symbol": "XLM",
  },
]

const currentDate = () => {
  return {
    moment: moment(),
    year: moment().year(),
    month: moment().month(),
    day: moment().date(),
  }
}

const padNum = (value) => {
  if (value < 10) {
    return `0${value}`;
  }
  return '' + value;
}

const ProfitCalculator = () => {
  const [date, setDate] = useState(currentDate());
  const [amount, setAmount] = useState(undefined);
  const [coinName, setCoinName] = useState(1);
  const [profit, setProfit] = useState(undefined);


  const getCurrentPrice = useCallback(() => {
    return fetch(`https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=1&convert_id=2781&id=${coinName}`)
      .then((response) => response.json())
      .then(({ data }) => {
        const quotes = data?.quote;
        if (quotes && quotes.length > 0) {
          const quote = quotes[0];
          return quote.price;
        }
      })
  }, [coinName])

  const getInitPrice = useCallback(() => {
    const timeStart = date.moment.unix();
    const timeEnd = moment(date.moment).add(2, 'days').unix();

    return fetch(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/historical?id=${coinName}&convertId=2781&timeStart=${timeStart}&timeEnd=${timeEnd}`)
      .then((response) => response.json())
      .then((data) => {
        const quotes = data.data.quotes;
        if (quotes && quotes.length > 0) {
          const quote = quotes[0].quote;
          return (quote.high + quote.low) / 2;
        }
      })
  }, [date, coinName]);

  const handleCalculate = () => {
    if (amount) {
      let currentPrice = 0;
      getCurrentPrice()
        .then(price => {
          console.log("price", price)
          currentPrice = price;
          return getInitPrice()
        })
        .then(initPrice => {
          console.log("initPrice", initPrice, currentPrice);
          if (initPrice && currentPrice) {
            const profit = (amount / initPrice) * currentPrice;
            setProfit(profit.toFixed(2));
          }
          else {
            setProfit(undefined);
          }
        })
    }
  }

  const handleDateChange = (key, value) => {
    const updated = { ...date, [key]: value };
    const investDate = `${updated.year}-${padNum(updated.month + 1)}-${padNum(updated.day)}`;

    setDate({
      ...updated,
      moment: moment(investDate)
    });
  }

  return (
    <Layout className="profit-page">
      <Content className="content">
        <Row className="px-3">
          <Col
            xl={{ span: 14, offset: 5 }}
            lg={{ span: 20, offset: 2 }}
            flex="auto"
            align="middle"
          >
            <Space direction="vertical" style={{width: '100%'}}>
              <div className="header-title">
                Crypto Profit Calculator
              </div>
              <p className="sub-title">
                Calculate your crypto profit using our calculator below.
              </p>
            </Space>
          </Col>
        </Row>

        <Row className="main-wrapper">
          <Col
            xl={{ span: 14, offset: 5 }}
            flex="auto"
            align="middle"
            className="purple-bg"
          >
            <div className="row-item">
              <div className="item-title">Date</div>
              <SelectDate
                date={date}
                setDate={handleDateChange}
              />
            </div>

            <Row>
              <Col xs={{ span: 24 }} xl={{ span: 12 }}>
                <div className="row-item">
                  <div className="item-title">Amount Invested ($)</div>
                  <InputNumber
                    min={0}
                    placeholder="Amount Invested ($)"
                    className="w-100"
                    size="large"
                    value={amount}
                    onChange={(value) => setAmount(value)}
                  />
                </div>

                <div className="row-item">
                  <div className="item-title">Crypto</div>
                  <Select
                    defaultValue={coinName}
                    size="large"
                    className="w-100"
                    onChange={setCoinName}
                  >
                    { cryptoList.map((item, index) => (
                      <Option key={index} value={item.id}>{item.symbol}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col xs={{ span: 24 }} xl={{ span: 12 }}>
                <div className="result-container">
                  <div className="total-profit">
                    Total Profit
                    <br/>
                    <span className="profit-value">{profit ? `$${profit}` : '-'}</span>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="row-item">
              <Button type="primary" size="large" block className="calc-button" onClick={handleCalculate}>Calculate</Button>
            </div>
          </Col>
        </Row>

        <div className="bitcoin">
          <img
            src="/images/bitcoin.svg"
            alt="refresh"
            width="240px"
            className="imgage"
          />
        </div>
      </Content>
    </Layout>
  );
}

export default ProfitCalculator;
