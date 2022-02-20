import { Row, Col, InputNumber, Space, Select } from "antd";
import "../css/main.css";
import background from "../Graphics/Background image calculator.png";
import swap from "../Graphics/swap.png";
import equal from "../Graphics/equal.png";
import refresh from "../Graphics/refresh.png";
import download from "../Graphics/download.png";
import { useState } from "react";
import { DownOutlined} from "@ant-design/icons";



const { Option } = Select;

const Main = (props) => {
  const [value, setValue] = useState("1");
  const [value1, setValue1] = useState("Bitcoin (BTC)");
  const [value2, setValue2] = useState('United States Dollar "$" (USD)');

  return (
    <div style={{ backgroundColor: "#fdda5a", height: "100vh" }}>
      <Row>
        <Col span={6} offset={9}>
          <h1>
            Convert <span>BCH</span> to <span>USD</span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <p>
            Convert any cryptocurrency or token price into your perferred fiat
            currency, such as BCH to USD. The live BCH to USD price will be
            shown.
          </p>
        </Col>
      </Row>
      <Row style={{ fontSize: "36px" }}>
        <Col span={12} offset={6}>
          <div style={{ backgroundImage: `url(${background})` }}>
                <Row>
                <Col
                  span={16}
                  offset={4}
                  style={{ textAlign: "center", paddingTop: "50px" }}
                >
                  <InputNumber min={1} value={value} onChange={setValue} style={{
                    width: "100%", fontSize: "24px", padding: "16px", border: "10px solid #fcda57"
                  }}/> 
                  </Col>
                </Row>
                <Row>
                  <Col span={16} offset={4}>
                  <Select value={value1} onChange={setValue1} size={"large"} suffixIcon={<DownOutlined style={{fontSize: "24px", color: "#440645", fontWeight: "bolder", position: "inherit"}}/>} style={{
                    width: "100%", fontSize: "24px", border: "10px solid #fcda57", padding: "16px", backgroundColor: "white"
                  }}>
                    <Option value="disabled" disabled>Fiat Currencies</Option>
                    <Option value='United States Dollar "$" (USD)'>United States Dollar "$" (USD)</Option>
                    <Option value='Albanian Lek "L" (ALL)'>Albanian Lek "L" (ALL)</Option>
                    <Option value='Algerian Dinar "د.ج" (DZD)'>Algerian Dinar "د.ج" (DZD)</Option>
                    <Option value='Argentine Peso "ARS" (ARS)'>Argentine Peso "ARS" (ARS)</Option>
                    <Option value='Armenian Dram "֏" (AMD)'>Armenian Dram "֏" (AMD)</Option>
                    <Option value='Australian Dollar "$" (AUD)'>Australian Dollar "$" (AUD)</Option>
                    <Option value='Azerbaijani Manat "₼" (AZN)'>Azerbaijani Manat "₼" (AZN)</Option>
                    <Option value='Bahraini Dinar ".د.ب" (BHD)'>Bahraini Dinar ".د.ب" (BHD)</Option>
                    <Option value='Bangladeshi Taka "BDT" (BDT)'>Bangladeshi Taka "BDT" (BDT)</Option>
                    <Option value='Belarusian Ruble "Br" (BYN)'>Belarusian Ruble "Br" (BYN)</Option>
                    <Option value="disabled" disabled>Precious Metals</Option>
                    <Option value='Gold Troy Ounce (XAU)'>Gold Troy Ounce (XAU)</Option>
                    <Option value='Silver Troy Ounce (XAG)'>Silver Troy Ounce (XAG)</Option>
                    <Option value='Platinum Ounce (XPT)'>Platinum Ounce (XPT)</Option>
                    <Option value='Palladium Ounce (XPD)'>Palladium Ounce (XPD)</Option>
                    <Option value="disabled" disabled>Cryptocurrencies</Option>
                    <Option value='Bitcoin (BTC)'>Bitcoin (BTC)</Option>
                    <Option value='Ethereum (ETH)'>Ethereum (ETH)</Option>
                    <Option value='Tether (USDT)'>Tether (USDT)</Option>
                    <Option value='BNB (BNB)'>BNB (BNB)</Option>
                    <Option value='USD Coin (USDC)'>USD Coin (USDC)</Option>
                    <Option value='XRP (XRP)'>XRP (XRP)</Option>
                    <Option value='Cardano (ADA)'>Cardano (ADA)</Option>
                    <Option value='Solana (SOL)'>Solana (SOL)</Option>
                    <Option value='Avalanche (AVAX)'>Avalanche (AVAX)</Option>
                    <Option value='Terra (LUNA)'>Terra (LUNA)</Option>
                  </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span={16} offset={4} style={{textAlign: "center"}}>
                    <img src={swap} id="swap" />  
                  </Col>
                </Row>
                <Row>
                  <Col span={16} offset={4}>
                  <Select value={value2} onChange={setValue2} size={"large"} style={{
                    width: "100%", fontSize: "24px", border: "10px solid #fcda57"
                  }}>
                    <Option value="disabled" disabled>Fiat Currencies</Option>
                    <Option value='United States Dollar "$" (USD)'>United States Dollar "$" (USD)</Option>
                    <Option value='Albanian Lek "L" (ALL)'>Albanian Lek "L" (ALL)</Option>
                    <Option value='Algerian Dinar "د.ج" (DZD)'>Algerian Dinar "د.ج" (DZD)</Option>
                    <Option value='Argentine Peso "ARS" (ARS)'>Argentine Peso "ARS" (ARS)</Option>
                    <Option value='Armenian Dram "֏" (AMD)'>Armenian Dram "֏" (AMD)</Option>
                    <Option value='Australian Dollar "$" (AUD)'>Australian Dollar "$" (AUD)</Option>
                    <Option value='Azerbaijani Manat "₼" (AZN)'>Azerbaijani Manat "₼" (AZN)</Option>
                    <Option value='Bahraini Dinar ".د.ب" (BHD)'>Bahraini Dinar ".د.ب" (BHD)</Option>
                    <Option value='Bangladeshi Taka "BDT" (BDT)'>Bangladeshi Taka "BDT" (BDT)</Option>
                    <Option value='Belarusian Ruble "Br" (BYN)'>Belarusian Ruble "Br" (BYN)</Option>
                    <Option value="disabled" disabled>Precious Metals</Option>
                    <Option value='Gold Troy Ounce (XAU)'>Gold Troy Ounce (XAU)</Option>
                    <Option value='Silver Troy Ounce (XAG)'>Silver Troy Ounce (XAG)</Option>
                    <Option value='Platinum Ounce (XPT)'>Platinum Ounce (XPT)</Option>
                    <Option value='Palladium Ounce (XPD)'>Palladium Ounce (XPD)</Option>
                    <Option value="disabled" disabled>Cryptocurrencies</Option>
                    <Option value='Bitcoin (BTC)'>Bitcoin (BTC)</Option>
                    <Option value='Ethereum (ETH)'>Ethereum (ETH)</Option>
                    <Option value='Tether (USDT)'>Tether (USDT)</Option>
                    <Option value='BNB (BNB)'>BNB (BNB)</Option>
                    <Option value='USD Coin (USDC)'>USD Coin (USDC)</Option>
                    <Option value='XRP (XRP)'>XRP (XRP)</Option>
                    <Option value='Cardano (ADA)'>Cardano (ADA)</Option>
                    <Option value='Solana (SOL)'>Solana (SOL)</Option>
                    <Option value='Avalanche (AVAX)'>Avalanche (AVAX)</Option>
                    <Option value='Terra (LUNA)'>Terra (LUNA)</Option>
                  </Select>
                  </Col>
                </Row>  
                <Row>
                  <Col span={24}>
                    <div id="input">
                      <div className="f1">{value}</div>
                      <div className="f2">{value1}</div>
                    </div>
                  </Col>
                </Row>  
                <Row>
                  <Col span={8} offset={8} style={{textAlign: "center"}}>
                    <img src={equal} id="equal" />
                  </Col>
                </Row>  
                <Row>
                  <Col span={24}>
                    <div id="output">
                      <div className="f1"></div>
                      <div className="f2">{value2}</div>
                    </div>
                  </Col>
                </Row>  
                  
                
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={18}>
          <Space>
            <img src={refresh} />
            <img src={download} />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
