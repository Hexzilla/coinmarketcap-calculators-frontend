import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { Layout, Row, Col, InputNumber, Space, Tooltip } from "antd";
import "./index.css";
import CryptoSelect, {
  fiatCurrencies,
  defaultCryptoCurrencies,
} from "./CryptoSelect/index.js";

const { Content } = Layout;

function ProfitCalculator() {
  const [loading, setLoading] = useState(false);
  //const [cryptoCurrencies, setCryptoCurrencies] = useState(null);
  const [investPrice, setInvestPrice] = useState(undefined);
  const [initPrice, setInitPrice] = useState(undefined);
  const [sellPrice, setSellPrice] = useState(undefined);
  const [investFee, setInvestFee] = useState(undefined);
  const [exitFee, setExitFee] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [totalInvestFee, setTotalInvestFee] = useState(undefined);
  const [totalExitFee, setTotalExitFee] = useState(undefined);
  const [total, setTotal] = useState(undefined);
  const [profitPrice, setProfitPrice] = useState(undefined);
  const [profitPercent, setProfitPercent] = useState(undefined);
  const [inputCoin, setInputCoin] = useState(defaultCryptoCurrencies[0]);
  const [outputCoin, setOutputCoin] = useState(fiatCurrencies[0]);
  const [requestId, setRequestId] = useState(null);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    setAmount(1)
    setOutputCoin(fiatCurrencies[0])
  }, [loading, setAmount]);

  const priceConversion = (id, convertId, amount) => {
    fetch(
      `https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=${amount}&convert_id=${convertId}&id=${id}`
    )
      .then((response) => response.json())
      .then(({ data }) => {
        const quotes = data?.quote;
        if (quotes && quotes.length > 0) {
          const quote = quotes[0];
          const price = quote.price;

          if (price >= 1.0) {
            setInitPrice(price.toFixed(2));
            setSellPrice(price.toFixed(2));
          } else {
            setInitPrice(price.toFixed(8));
            setSellPrice(price.toFixed(8));
          }
        }
      });
  };

  useEffect(() => {
    if (inputCoin && outputCoin && investPrice && amount !== 0) {
      const reqId = `${inputCoin.id}-${outputCoin.id}-${amount}`;
      if (requestId !== reqId) {
        setRequestId(reqId);
        priceConversion(inputCoin.id, outputCoin.id, amount);
      }
    }
  }, [requestId, inputCoin, outputCoin, investPrice, amount]);

  useEffect(() => {
    if (!initPrice || isNaN(initPrice)) {
      setTotalInvestFee('-');
      setTotalExitFee('-');
      setTotal('-');
      setProfitPrice('-');
      setProfitPercent('-');
      return;
    }

    const investFeePrice = ((investPrice * investFee) / 100).toFixed(2);
    if (isNaN(investFeePrice)) {
      setTotalInvestFee('-');  
    } else {
      setTotalInvestFee("$" + investFeePrice);
    }

    const curTotal = (((investPrice - investFeePrice) * sellPrice) / initPrice).toFixed(2);

    const exitFeePrice = ((curTotal * exitFee) / 100).toFixed(2);
    if (isNaN(exitFeePrice)) {
      setTotalExitFee('-')  
    } else {
      setTotalExitFee("$" + exitFeePrice);
    }

    const total = curTotal - exitFeePrice;
    if (isNaN(total)) {
      setTotal('-');
    } else {
      setTotal("$" + total.toFixed(2));
    }

    const profit = (total - investPrice).toFixed(2);
    const percent = ((profit / investPrice) * 100).toFixed(2);

    if (isNaN(profit)) {
      setProfitPrice('-');
    } else {
      setProfitPrice(profit > 0 ? "+$" + profit : "-$" + Math.abs(profit));
    }

    if (isNaN(profit) || isNaN(percent)) {
      setProfitPercent('-');
    } else {
      setProfitPercent(profit > 0 ? "+" + percent + "%" : "-" + Math.abs(percent) + "%");
    }
    
  }, [investPrice, initPrice, sellPrice, investFee, exitFee, inputCoin]);

  const onRefresh = () => {
    if (inputCoin && outputCoin && amount !== 0) {
      priceConversion(inputCoin.id, outputCoin.id, amount);
    }
  };

  return (
    <Layout className="mainLayout">
      <Content className="profit-content">
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

        <Row style={{ padding: "2%", marginTop: "10px" }}>
          <Col
            xl={{ span: 14, offset: 5 }}
            flex="auto"
            align="middle"
            className="profit-background"
          >
            <Space direction="vertical" size={42}>
              <Space direction="horizontal">
                <img src="/images/dollar.svg" alt="dollar" width="30px" />
                <InputNumber
                  className="inputNum"
                  placeholder="Investment"
                  size="large"
                  value={investPrice}
                  onChange={(value) => setInvestPrice(value)}
                />
              </Space>
              <Space direction="horizontal">
                <img src="/images/dollar.svg" alt="dollar" width="30px" />
                <InputNumber
                  className="inputNum"
                  placeholder="Initial Coin Price"
                  size="large"
                  value={initPrice}
                  onChange={(value) => setInitPrice(value)}
                />
              </Space>
              <Space direction="horizontal">
                <img src="/images/dollar.svg" alt="dollar" width="30px" />
                <InputNumber
                  className="inputNum"
                  placeholder="Selling Coin Price"
                  size="large"
                  value={sellPrice}
                  onChange={(value) => setSellPrice(value)}
                />
              </Space>
              <Space direction="horizontal">
                <img src="/images/percent.svg" alt="dollar" width="30px" />
                <InputNumber
                  className="inputNum"
                  placeholder="Investment Fee"
                  size="large"
                  value={investFee}
                  onChange={(value) => setInvestFee(value)}
                />
              </Space>
              <Space direction="horizontal">
                <img src="/images/percent.svg" alt="dollar" width="30px" />
                <InputNumber
                  className="inputNum"
                  placeholder="Exit Fee"
                  size="large"
                  value={exitFee}
                  onChange={(value) => setExitFee(value)}
                />
              </Space>
            </Space>
          </Col>
        </Row>

        <div>
          <img
            src="/images/bitcoin.svg"
            className="image-button"
            alt="refresh"
            width="240px"
            onClick={() => onRefresh()}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default ProfitCalculator;
