import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import FooterPage from 'components/Footer'
import "./index.css";

const { Header, Content, Sider, Footer } = Layout;

const MainLayout = ({ children }) => {
  const [current, setCurrent] = useState("cryptocurrency");

  const menu = (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
    >
      <Menu.Item key="cryptocurrency">
        <NavLink to="/cryptocurrency">
          <div className="menuItem submenu">
            Cryptocurrency Conversion Calculator
          </div>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="profitloss">
        <NavLink to="/profit-loss-calculator">
          <div className="menuItem submenu">
            Profit Loss Calculator
          </div>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="profitloss">
        <NavLink to="/crypto-profit-calculator">
          <div className="menuItem submenu">
            Crypto Profit Calculator
          </div>
        </NavLink>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <NavLink to="/" className="logo">
          <img
            src="/images/main-logo.png"
            alt="Elafaki Cryptocurrency Analytics"
            width={180}
            style={{ marginLeft: "-30px" }}
          />
        </NavLink>
        <div className="mobile-menu">
          <Dropdown overlay={menu}>
            <div className="ant-dropdown-link cursor-pointer menuItem" onClick={e => e.preventDefault()}>
              <MenuOutlined />
            </div>
          </Dropdown>
        </div>
        <div className="main-menu">
          <Dropdown overlay={menu}>
            <div className="ant-dropdown-link cursor-pointer menuItem" onClick={e => e.preventDefault()}>
              Cryptocurrency Calculators <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider breakpoint="xl" collapsedWidth="0" trigger={null}>
          <div className="sidebar" />
          <img
            className="warrior-img"
            src="/images/Kryftos Warrior.png"
            alt="warrior"
          />
        </Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer>
        <FooterPage />
      </Footer>
    </Layout>
  );
};

export default MainLayout;
