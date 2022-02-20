import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Row, Col, InputNumber, Space, Select } from "antd";
import "./App.css";
import background from "./img/background.png";
import swap from "./img/swap.svg";
import equal from "./img/equal.svg";
import refresh from "./img/refresh.svg";
import download from "./img/download.svg";
import CurrencySelect, {
  fiatCurrencies,
} from "./CurrencySelect/CurrencySelect.js";

const { Option } = Select;
const { Sider, Content } = Layout;

function App() {
  const [loading, setLoading] = useState(false);
  const [cryptoCurrencies, setCryptoCurrencies] = useState(null);
  const [amount, setAmount] = useState(1);
  const [inputCoin, setInputCoin] = useState(0);
  const [outputCoin, setOutputCoin] = useState(0);
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
      .then((data) => {
        const quotes = data.data?.quote;
        if (quotes && quotes.length > 0) {
          const price = quotes[0].price;
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
      const tempCoin = inputCoin;
      setInputCoin(outputCoin);
      setOutputCoin(tempCoin);
    }
  };

  const titleBold = {
    color: "#440645",
  };

  return (
    <Layout>
      <Sider>
        <div className="sidebar" />
      </Sider>
      <Content className="content">
        <Row style={{ paddingTop: "3%" }}>
          <Col span={10} offset={7} flex="auto" align="middle">
            <Space direction="vertical" size={15}>
              <div className="headerTitle">
                Convert{" "}
                <span style={titleBold}>{inputCoin?.symbol || "BTC"}</span> to{" "}
                <span style={titleBold}>{outputCoin?.symbol || "USD"}</span>
              </div>
              <p className="subTitle">
                Convert any cryptocurrency or token price into your perferred
                fiat currency, such as BCH to USD. The live BCH to USD price
                will be shown.
              </p>
            </Space>
          </Col>
        </Row>
        <div
          className="background-wrapper"
          style={{ backgroundImage: `url(${background})` }}
        >
          <Row style={{ padding: "2%", marginTop: "20px" }}>
            <Col span={16} offset={4} flex="auto" align="middle">
              <Space direction="vertical" size={15}>
                <InputNumber
                  min={1}
                  placeholder="Enter Amount to Convert"
                  style={{
                    width: 320,
                  }}
                  size="large"
                  defaultValue={amount}
                  onChange={(value) => setAmount(value)}
                />

                <CurrencySelect
                  cryptoCurrencies={cryptoCurrencies}
                  onSelect={onSelectInputCoin}
                  currentCoin="Bitcoin (BTC)"
                ></CurrencySelect>

                <img
                  src={swap}
                  className="rotate cursor-pointer"
                  alt="swap"
                  width="40px"
                  onClick={handleSwap}
                />

                <CurrencySelect
                  cryptoCurrencies={cryptoCurrencies}
                  onSelect={onSelectOutputCoin}
                  currentCoin='United States Dollars "$" (USD)'
                ></CurrencySelect>

                <div flex="auto" align="middle">
                  <div className="priceTitle">{amount}</div>
                  {inputCoin ? (
                    <div className="coinName">{`${inputCoin.name} (${inputCoin.symbol})`}</div>
                  ) : (
                    <></>
                  )}
                </div>

                <img src={equal} alt="equal" width="50px" />

                <div flex="auto" align="middle">
                  <div className="priceTitle">{converted}</div>
                  {outputCoin ? (
                    <div className="coinName">{`${outputCoin.name} (${outputCoin.symbol})`}</div>
                  ) : (
                    <></>
                  )}
                </div>
              </Space>
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: "40px" }}>
          <Col span={12} offset={6} flex="auto" align="end">
            <Space>
              <img
                src={refresh}
                className="cursor-pointer"
                alt="refresh"
                width="40px"
              />
              <img
                src={download}
                className="cursor-pointer"
                alt="refresh"
                width="40px"
              />
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
