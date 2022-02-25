import React, { useEffect, useState } from "react";
import { Layout, Row, Col, InputNumber, Space, Tooltip } from "antd";
import "./profitloss.css";
import CurrencySelect, {
  fiatCurrencies,
  defaultCryptoCurrencies,
} from "./CurrencySelect/index.js";
import domtoimage from "dom-to-image";

const { Content } = Layout;

function ProfitLoss() {
  const [loading, setLoading] = useState(false);
  const [cryptoCurrencies, setCryptoCurrencies] = useState(null);
  const [amount, setAmount] = useState(1);
  const [inputCoin, setInputCoin] = useState(defaultCryptoCurrencies[0]);
  const [outputCoin, setOutputCoin] = useState(fiatCurrencies[0]);
  const [requestId, setRequestId] = useState(null);
  const [converted, setConverted] = useState("0");

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetch(
        "https://api.coinmarketcap.com/data-api/v3/map/all?cryptoAux=is_active,status&exchangeAux=is_active,status&limit=10000&listing_status=active,untracked&start=1"
      )
        .then((response) => response.json())
        .then((data) => {
          const currencies = data.data.cryptoCurrencyMap.filter(
            (i) => i.is_active === 1
          );
          setCryptoCurrencies(currencies);
          setInputCoin(currencies.find((it) => it.symbol === "BTC"));
          setOutputCoin(fiatCurrencies.find((it) => it.symbol === "USD"));
        });
    }
  }, [loading]);

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
            setConverted(price.toFixed(2));
          } else {
            setConverted(price.toFixed(8));
          }
        }
      });
  };

  useEffect(() => {
    if (inputCoin && outputCoin && amount !== 0) {
      const reqId = `${inputCoin.id}-${outputCoin.id}-${amount}`;
      if (requestId !== reqId) {
        setRequestId(reqId);
        priceConversion(inputCoin.id, outputCoin.id, amount);
      }
    }
  }, [requestId, inputCoin, outputCoin, amount]);

  const onSelectInputCoin = (currency) => {
    setInputCoin(currency);
  };

  const onSelectOutputCoin = (currency) => {
    setOutputCoin(currency);
  };

  const handleSwap = () => {
    if (inputCoin && outputCoin) {
      setInputCoin({ ...outputCoin });
      setOutputCoin({ ...inputCoin });
    }
  };

  const titleBold = {
    color: "#440645",
  };

  const onRefresh = () => {
    if (inputCoin && outputCoin && amount !== 0) {
      priceConversion(inputCoin.id, outputCoin.id, amount);
    }
  };

  const onDownload = () => {
    var filename = `${inputCoin.symbol}-${outputCoin.symbol}.JPG`;
    var wrapper = document.getElementById("background-wrapper");
    domtoimage
      .toJpeg(wrapper, { height: 500, bgcolor: "#FFFFFF" })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <Layout className="mainLayout">
      <Content
        className="content"
        style={{ backgroundImage: `url(/images/Peach_Background.jpg)` }}
      >
        <Row style={{ paddingTop: "3%" }}>
          <Col
            xl={{ span: 10, offset: 7 }}
            lg={{ span: 20, offset: 2 }}
            flex="auto"
            align="middle"
          >
            <Space direction="vertical">
              <div className="headerTitle">
                Crypto <span style={titleBold}>Profit Loss</span> Calculator
              </div>
              <p className="subTitle">
                Calculate your crypto profit and loss using our calculator
                below.
              </p>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col xl={{ span: 16, offset: 4 }} flex="auto" align="middle">
            <Space direction="vertical">
              <Tooltip title="coins" className="image-button">
                <img
                  src="/images/bitcoin-logo.svg"
                  className="image-button"
                  alt="coins"
                  width="100px"
                  onClick={handleSwap}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
        <div
          className="background-wrapper"
          id="background-wrapper"
          style={{ backgroundImage: `url(/images/arrow-right.png)` }}
        >
          <Row style={{ padding: "2%", marginTop: "10px" }}>
            <Col xl={{ span: 6, offset: 6 }} flex="auto" align="middle">
              <Space direction="vertical" size={35}>
                <Space direction="horizontal">
                  <img src="/images/dollar.svg" alt="dollar" width="30px" />
                  <InputNumber
                    placeholder="Investment"
                    style={{
                      width: 320,
                    }}
                    size="large"
                    onChange={(value) => setAmount(value)}
                  />
                </Space>
                <Space direction="horizontal">
                  <img src="/images/dollar.svg" alt="dollar" width="30px" />
                  <InputNumber
                    placeholder="Initial Coin Price"
                    style={{
                      width: 320,
                    }}
                    size="large"
                    onChange={(value) => setAmount(value)}
                  />
                </Space>
                <Space direction="horizontal">
                  <img src="/images/dollar.svg" alt="dollar" width="30px" />
                  <InputNumber
                    placeholder="Selling Coin Price"
                    style={{
                      width: 320,
                    }}
                    size="large"
                    onChange={(value) => setAmount(value)}
                  />
                </Space>
                <Space direction="horizontal">
                  <img src="/images/percent.svg" alt="dollar" width="30px" />
                  <InputNumber
                    placeholder="Investment Fee"
                    style={{
                      width: 320,
                    }}
                    size="large"
                    onChange={(value) => setAmount(value)}
                  />
                </Space>
                <Space direction="horizontal">
                  <img src="/images/percent.svg" alt="dollar" width="30px" />
                  <InputNumber
                    placeholder="Exit Fee"
                    style={{
                      width: 320,
                    }}
                    size="large"
                    onChange={(value) => setAmount(value)}
                  />
                </Space>
              </Space>
            </Col>
            <Col xl={{ span: 5 }} flex="auto" align="middle">
              <div style={{backgroundColor: `white`}}>
              <Space direction="vertical">
                  <div className="priceTitle">+$1,518.62</div>
                  <div className="priceTitle">(+45.56%)</div>
                  <div className="coinName">Total Investment Fee</div>
                  <div className="priceTitle">$49.66</div>
                  <div className="coinName">Total Exit Fee</div>
                  <div className="priceTitle">$73.38</div>
                  <div className="coinName">Total</div>
                  <div className="priceTitle">$4,851.62</div>
              </Space>
              </div>
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: "40px", marginBottom: "20px" }}>
          <Col span={12} offset={6} flex="auto" align="end">
            <Space>
              <Tooltip title="Refresh" className="image-button">
                <img
                  src="/images/refresh.svg"
                  className="image-button"
                  alt="refresh"
                  width="40px"
                  onClick={() => onRefresh()}
                />
              </Tooltip>
              <Tooltip title="Download" className="image-button">
                <img
                  src="/images/download.svg"
                  className="image-button"
                  alt="download"
                  width="40px"
                  onClick={() => onDownload()}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ProfitLoss;
