import React, { useEffect, useState } from "react";
import { Layout, Row, Col, InputNumber, Space, Tooltip } from "antd";
import "./profitloss.css";
import CryptoSelect, {
  fiatCurrencies,
  defaultCryptoCurrencies,
} from "./CryptoSelect/index.js";
import domtoimage from "dom-to-image";

const { Content } = Layout;

function ProfitLoss() {
  const [loading, setLoading] = useState(false);
  const [cryptoCurrencies, setCryptoCurrencies] = useState(null);
  const [investPrice, setInvestPrice] = useState(1000);
  const [initPrice, setInitPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [investFee, setInvestFee] = useState(1.49);
  const [exitFee, setExitFee] = useState(1.49);
  const [amount, setAmount] = useState(1);
  const [totalInvestFee, setTotalInvestFee] = useState("$49.66");
  const [totalExitFee, setTotalExitFee] = useState("$73.38");
  const [total, setTotal] = useState("$4,851.62");
  const [profitPrice, setProfitPrice] = useState("+$1,518.62");
  const [profitPercent, setProfitPercent] = useState("(+45.56%)");
  const [inputCoin, setInputCoin] = useState(defaultCryptoCurrencies[0]);
  const [outputCoin, setOutputCoin] = useState(fiatCurrencies[0]);
  const [requestId, setRequestId] = useState(null);

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
    if (inputCoin && outputCoin && amount !== 0) {
      const reqId = `${inputCoin.id}-${outputCoin.id}-${amount}`;
      if (requestId !== reqId) {
        setRequestId(reqId);
        priceConversion(inputCoin.id, outputCoin.id, amount);
      }
    }
  }, [requestId, inputCoin, outputCoin, amount]);

  useEffect(() => {
    const investFeePrice = ((investPrice * investFee) / 100).toFixed(2);
    setTotalInvestFee("$" + investFeePrice);
    const curTotal = (
      ((investPrice - investFeePrice) * sellPrice) /
      initPrice
    ).toFixed(2);
    const exitFeePrice = ((curTotal * exitFee) / 100).toFixed(2);
    setTotalExitFee("$" + exitFeePrice);
    setTotal("$" + (curTotal - exitFeePrice).toFixed(2));
    const profit = (curTotal - exitFeePrice - investPrice).toFixed(2);
    const percent = ((profit / investPrice) * 100).toFixed(2);

    setProfitPrice(profit > 0 ? "+$" + profit : "-$" + Math.abs(profit));
    setProfitPercent(
      profit > 0 ? "+" + percent + "%" : "-" + Math.abs(percent) + "%"
    );
  }, [investPrice, initPrice, sellPrice, investFee, exitFee, inputCoin]);

  const titleBold = {
    color: "#440645",
  };

  const onSelectCoin = () => {};

  const onSelectInputCoin = (currency) => {
    setInputCoin(currency);
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
              <div className="profitLossHeaderTitle">
                Crypto <span style={titleBold}>Profit Loss</span> Calculator
              </div>
              <p className="profitLossSubTitle">
                Calculate your crypto profit and loss using our calculator
                below.
              </p>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col
            xxl={{ span: 15, offset: 4 }}
            xl={{ span: 15, offset: 4 }}
            flex="auto"
            align="middle"
          >
            <Space direction="vertical">
              <CryptoSelect
                onSelect={onSelectInputCoin}
                currentCoin={inputCoin}
              ></CryptoSelect>
            </Space>
          </Col>
        </Row>
        <div
          className="background-wrapper"
          id="background-wrapper"
          style={{ backgroundImage: `url(/images/arrow-line.png)` }}
        >
          <Row style={{ padding: "2%", marginTop: "10px" }}>
            <Col
              xxl={{ span: 6, offset: 6 }}
              xl={{ span: 6, offset: 6 }}
              lg={{ span: 5, offset: 6 }}
              md={{ span: 6, offset: 5 }}
              flex="auto"
              align="middle"
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
            <Col
              xxl={{ span: 4, offset: 0 }}
              xl={{ span: 5, offset: 0 }}
              lg={{ span: 6, offset: 1 }}
              md={{ span: 6, offset: 1 }}
              flex="auto"
              align="middle"
            >
              <div
                className="background-values"
                style={{
                  backgroundColor: `white`,
                  backgroundImage: `url(/images/arrow-triangle.png)`,
                }}
              >
                <Space direction="vertical" size={25}>
                  <div style={{ marginTop: `30px`, lineHeight: `normal` }}>
                    <div className="profitLossValue">{profitPrice}</div>
                    <div className="profitLossValue">{profitPercent}</div>
                  </div>
                  <div style={{ lineHeight: `normal` }}>
                    <div className="descStr">Total Investment Fee</div>
                    <div className="feeValue">{totalInvestFee}</div>
                  </div>
                  <div style={{ lineHeight: `normal` }}>
                    <div className="descStr">Total Exit Fee</div>
                    <div className="feeValue">{totalExitFee}</div>
                  </div>
                  <div style={{ marginBottom: `50px`, lineHeight: `normal` }}>
                    <div className="descStr">Total</div>
                    <div className="feeValue">{total}</div>
                  </div>
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
