import React, { useEffect, useState, useCallback } from "react";
import { Layout, Row, Col, InputNumber, Space, Button, Select } from "antd";
import moment from 'moment'
import "./index.scss";
import SelectDate from "./SelectDate";
import { formatNumber } from "utils"

const { Content } = Layout;
const { Option } = Select;


export const cryptoList = [
  {
    "id": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "key": "1_btc",
    "start_year": 2010,
    "start_month": 7,
  },
  {
    "id": 1027,
    "name": "Ethereum",
    "symbol": "ETH",
    "key": "2_eth",
    "start_year": 2015,
    "start_month": 8,
  },
  {
    "id": 74,
    "name": "Dogecoin",
    "symbol": "DOGE",
    "key": "3_doge",
    "start_year": 2014,
    "start_month": 1,
  },
  {
    "id": 1839,
    "name": "BNB",
    "symbol": "BNB",
    "key": "4_bnb",
    "start_year": 2010,
    "start_month": 1,
  },
  {
    "id": 2,
    "name": "Litecoin",
    "symbol": "LTC",
    "key": "5_ltc",
    "start_year": 2013,
    "start_month": 4,
  },
  {
    "id": 2010,
    "name": "Cardano",
    "symbol": "ADA",
    "key": "6_ada",
    "start_year": 2017,
    "start_month": 12,
  },
  {
    "id": 52,
    "name": "XRP",
    "symbol": "XRP",
    "key": "7_xrp",
    "start_year": 2014,
    "start_month": 8,
  },
  {
    "id": 6636,
    "name": "Polkadot",
    "symbol": "DOT",
    "key": "8_dot",
    "start_year": 2020,
    "start_month": 8,
  },
  {
    "id": 1831,
    "name": "Bitcoin Cash",
    "symbol": "BCH",
    "key": "9_bch",
    "start_year": 2017,
    "start_month": 8,
  },
  {
    "id": 4687,
    "name": "Binance USD",
    "symbol": "BUSD",
    "key": "10_busd",
    "start_year": 2019,
    "start_month": 9,
  },
  {
    "id": 4943,
    "name": "Dai",
    "symbol": "DAI",
    "key": "11_dai",
    "start_year": 2019,
    "start_month": 11,
  },
  {
    "id": 1321,
    "name": "Ethereum Classic",
    "symbol": "ETC",
    "key": "12_etc",
    "start_year": 2016,
    "start_month": 7,
  },
  {
    "id": 8916,
    "name": "Internet Computer",
    "symbol": "ICP",
    "key": "13_icp",
    "start_year": 2021,
    "start_month": 5,
  },
  {
    "id": 3408,
    "name": "USD Coin",
    "symbol": "USDC",
    "key": "14_usdc",
    "start_year": 2018,
    "start_month": 9,
  },
  {
    "id": 1975,
    "name": "Chainlink",
    "symbol": "LINK",
    "key": "16_link",
    "start_year": 2017,
    "start_month": 9,
  },
  {
    "id": 1958,
    "name": "TRON",
    "symbol": "TRX",
    "key": "17_trx",
    "start_year": 2018,
    "start_month": 6,
  },
  {
    "id": 7083,
    "name": "Uniswap",
    "symbol": "UNI",
    "key": "18_uni",
    "start_year": 2020,
    "start_month": 9,
  },
  {
    "id": 825,
    "name": "Tether",
    "symbol": "USDT",
    "key": "19_usdt",
    "start_year": 2014,
    "start_month": 10,
  },
  {
    "id": 512,
    "name": "Stellar",
    "symbol": "XLM",
    "key": "20_xlm",
    "start_year": 2015,
    "start_month": 9,
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
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(currentDate());
  const [amount, setAmount] = useState(undefined);
  const [coinId, setCoinId] = useState(1);
  const [profit, setProfit] = useState(undefined);
  const [priceList, setPriceList] = useState([]);

  const getCurrentPrice = useCallback(() => {
    return fetch(`https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=1&convert_id=2781&id=${coinId}`)
      .then((response) => response.json())
      .then(({ data }) => {
        const quotes = data?.quote;
        if (quotes && quotes.length > 0) {
          const quote = quotes[0];
          return quote.price;
        }
      })
  }, [coinId])

  const getPriceList = (coinId) => {
    const coin = cryptoList.find(c => c.id === coinId);
    console.log("coin", coin.key, coin)
    if (coin) {
      return fetch(`https://elafaki.com/api/prices?id=${coin.key}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            return data.data;
          }
        })
    }
  }

  useEffect(() => {
    console.log("getPriceList");
    setLoading(true)
    getPriceList(coinId)
      .then(items => setPriceList(items))
      .finally(() => setLoading(false))
  }, [coinId, setLoading])

  const getInitPrice = useCallback(() => {
    if (loading) { //TODO
      return 0;
    }

    const startTime = date.moment.unix();
    if (priceList && priceList.length > 0) {
      const prices = priceList;
      if (prices.length <= 0) {
        return 0;
      }

      for (let i in prices) {
        const [timestamp, price] = prices[i];
        if (startTime === timestamp) {
          return price;
        }
        if (startTime < timestamp) {
          if (i === 0) {
            return price;
          }
          return price;
        }
      }

      return prices[prices.length - 1][1];
    }
  }, [loading, date, priceList]);

  const handleCalculate = () => {
    if (amount) {
      let currentPrice = 0;
      getCurrentPrice()
        .then(price => {
          currentPrice = price;
          const initPrice = getInitPrice();
          console.log("initPrice", initPrice, currentPrice);
          if (initPrice && currentPrice) {
            const profit = (amount / initPrice) * currentPrice;
            setProfit(formatNumber(profit));
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

  const handleChangeCoin = (value) => {
    setCoinId(value);
    setProfit(undefined);
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
                coin={cryptoList.find(it => it.id === coinId)}
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
                    defaultValue={coinId}
                    size="large"
                    className="w-100"
                    onChange={handleChangeCoin}
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
                    <span className="profit-value">{profit ? `${profit}` : '-'}</span>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="row-item">
              <Button type="button" size="large" block className="calc-button" onClick={handleCalculate}>Calculate</Button>
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
