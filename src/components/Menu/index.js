import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';
import "./index.css";

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
  const [current, setCurrent] = useState("analytics");

  const menu = (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
    >
      <Menu.Item key="cryptocurrencycalculator">
        <NavLink to="/cryptocurrencycalculator">
          <div className="menuItem submenu">
            Cryptocurrency Conversion Calculator
          </div>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="profitloss">
        <NavLink to="/profitlosscalculator">
          <div className="menuItem submenu">
            Profit Loss Calculator
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
            src="/images/Elafaki Cryptocurrency Analytics.png"
            alt="logo"
            width={180}
            style={{ marginLeft: "-30px" }}
          />
        </NavLink>
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
    </Layout>
  );
};

export default MainLayout;
