import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { Layout, Row, Col, InputNumber, Space, Tooltip } from "antd";
import "./index.scss";
import CryptoSelect, {
  fiatCurrencies,
  defaultCryptoCurrencies,
} from "./CryptoSelect/index.js";
import { formatNumber } from "utils";

const { Content } = Layout;

function ProfitLoss() {
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
      setTotalInvestFee(undefined);
      setTotalExitFee(undefined);
      setTotal(undefined);
      setProfitPrice(undefined);
      setProfitPercent(undefined);
      return;
    }

    const investFeePrice = ((investPrice * investFee) / 100);
    if (isNaN(investFeePrice)) {
      setTotalInvestFee(undefined);  
    } else {
      console.log("investFeePrice", investFeePrice)
      setTotalInvestFee(investFeePrice);
    }

    const curTotal = (((investPrice - investFeePrice) * sellPrice) / initPrice);

    const exitFeePrice = ((curTotal * exitFee) / 100);
    if (isNaN(exitFeePrice)) {
      setTotalExitFee(undefined)  
    } else {
      setTotalExitFee(exitFeePrice);
    }

    const total = curTotal - exitFeePrice;
    if (isNaN(total)) {
      setTotal(undefined);
    } else {
      setTotal(total);
    }

    const profit = (total - investPrice);
    const percent = ((profit / investPrice) * 100);

    if (isNaN(profit)) {
      setProfitPrice(undefined);
    } else {
      const profitValue = formatNumber(Math.abs(percent), profit > 0 ? '+$' : '-$');
      setProfitPrice(profitValue);
    }

    if (isNaN(profit) || isNaN(percent)) {
      setProfitPercent(undefined);
    } else {
      const percentValue = formatNumber(Math.abs(percent), profit > 0 ? '+' : '-');
      setProfitPercent(percentValue + '%');
    }
    
  }, [investPrice, initPrice, sellPrice, investFee, exitFee, inputCoin]);

  const titleBold = {
    color: "#440645",
  };

  //const onSelectCoin = () => {};

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
    <Layout className="profitloss-page">
      <Content
        className="content"
        style={{ backgroundImage: `url(/images/Peach_Background.jpg)` }}
      >
        <Row className="px-3">
          <Col
            xl={{ span: 13, offset: 5 }}
            lg={{ span: 20, offset: 2 }}
            flex="auto"
            align="middle"
          >
            <Space direction="vertical">
              <div className="header-title">
                Crypto <span style={titleBold}>Profit Loss</span> Calculator
              </div>
              <p className="sub-title">
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
              xl={{ span: 8, offset: 4 }}
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
              md={{ span: 7, offset: 1 }}
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
                    <div className="feeValue">{totalInvestFee ? formatNumber(totalInvestFee) : '-'}</div>
                  </div>
                  <div style={{ lineHeight: `normal` }}>
                    <div className="descStr">Total Exit Fee</div>
                    <div className="feeValue">{totalExitFee ? formatNumber(totalExitFee) : '-'}</div>
                  </div>
                  <div style={{ marginBottom: `50px`, lineHeight: `normal` }}>
                    <div className="descStr">Total</div>
                    <div className="feeValue">{total ? formatNumber(total) : '-'}</div>
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
        <Row className="mb-2 pt-0">
          <Col
            flex="auto"
            align="end"
            span={6}
            offset={15}
            sm={{ offset: 2 }}
            md={{ offset: 17 }}
            lg={{ offset: 16 }}
            xl={{ offset: 14 }}
            xxl={{ offset: 13 }}
          >
            <Space size="middle">
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
