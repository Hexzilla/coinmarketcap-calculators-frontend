import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Space } from "antd";
import "./index.scss";

const Footer = () => {

  return (
    <div className="footer">
      <Row className="mb-1">
        <Col
          span={12}
          flex="auto"
          align="left"
        >
          <img
              src="/images/elafaki.png"
              alt="Elafaki Cryptocurrency Analytics"
              width={180}
            />
        </Col>
      </Row>

      <Row className="">
        <Col
          sm={{ span: 24 }}
          lg={{ span: 12 }}
          flex="auto"
          align="left"
        >
          <Space direction="vertical" size={12}>
            <Space className="privacy-menu" direction="horizontal" size={30}>
              <a href="/privacy">Privacy, Terms and Conditions</a>
              <a href="/cookies">Cookies</a>
              <a href="/contact">Contact Us</a>
            </Space>

            <Space className="privacy-mobile" direction="vertical" size={12}>
              <a href="/privacy">Privacy, Terms and Conditions</a>
              <a href="/cookies">Cookies</a>
              <a href="/contact">Contact Us</a>
            </Space>

            <div className="copyright">
              © 2022 Phlanx Pty Ltd. All rights reserved
            </div>
            
            <Row style={{marginBottom: '-6px'}}>
              <Col
                md={{ span: 8 }}
                flex="auto"
              >
                <div className="yellow">Secured by</div>
                <img
                  src="/images/amazon-logo-white.png"
                  alt="Amazon"
                  width={100}
                  style={{paddingTop: '6px'}}
                />
              </Col>
              <Col
                md={{ span: 12 }}
                flex="auto"
              >
                <div className="yellow">SSL Encrypted</div>
                <img
                  src="/images/poweredby2.png"
                  alt="Amazon"
                  width={280}
                />
              </Col>
            </Row>
            
            <Space direction="horizontal" size={10} className="mt-2">
              <a href="https://discord.com/">
                <img
                  className="social-icon"
                  src="/images/discord.svg"
                  alt="Amazon"
                  width={40}
                />
              </a>
              <a href="https://www.instagram.com/">
                <img
                  className="social-icon"
                  src="/images/instagram.svg"
                  alt="Amazon"
                  width={40}
                />
              </a>
              <a href="https://twitter.com/">
                <img
                  className="social-icon"
                  src="/images/twitter.svg"
                  alt="Amazon"
                  width={40}
                />
              </a>
            </Space>
          </Space>
        </Col>

        <Col
          id="features"
          lg={{ span: 8 }}
          flex="auto"
          align="left"
        >
          <div className="features-title">Features of Elafaki.com</div>
          <NavLink to="/cryptocurrencyconversioncalculator">
            <div className="features-link">Cryptocurrency Conversion Calculator</div>
          </NavLink>
          <NavLink to="/profitlosscalculator">
            <div className="features-link">Crypto Profit and Loss Calculator</div>
          </NavLink>
          <NavLink to="/cryptoprofitcalculator">
            <div className="features-link">NFT Profit Calculator</div>
          </NavLink>
        </Col>

        <Col
          id="elafaki-logo"
          lg={{ span: 4 }}
          flex="auto"
          align="right"
        >
          <img
            src="/images/kryptos-black.png"
            alt="Elafaki"
            width={160}
            className="elafki"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
