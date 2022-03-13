import React, { useEffect, useState } from "react";
import { Layout, Row, Col, InputNumber, Space, Button, Select } from "antd";
import "./index.scss";
import SelectDate from "./SelectDate";

const { Content } = Layout;
const { Option } = Select;

const cryptoList = [
  "BTC",
  "ETH",
  "DOGE",
  "BNB",
  "LTC",
  "ADA",
  "XRP",
  "DOT",
  "BCH",
  "BUSD",
  "DAI",
  "ETC",
  "ICP",
  "USDC",
  "DOT",
  "LINK",
  "TRX",
  "UNI",
  "USDT",
  "XLM",
]

const ProfitCalculator = () => {
  const [date, setDate] = useState({ year: 2022, month: 'March', day: 11 });
  const [coinName, setCoinName] = useState("BTC");

  const handleDateChange = (key, value) => {
    setDate({
      ...date,
      [key]: value
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
              <Col span="12">
                <div className="row-item">
                  <div className="item-title">Amount invested</div>
                  <InputNumber
                    min={1}
                    placeholder="Enter Amount to Convert"
                    className="w-100"
                    size="large"
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
                    { cryptoList.map((coinName, index) => (
                      <Option key={index} value={coinName}>{coinName}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span="12">
                <div className="result-container">
                  <div className="total-profit">
                    Total Profit
                    <br/>
                    <span className="profit-value">$950.0</span>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="row-item">
              <Button type="primary" size="large" block className="calc-button">Calculate</Button>
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
