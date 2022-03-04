import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./index.css";

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
  const [current, setCurrent] = useState("analytics");

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
        <Menu
          onClick={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          mode="horizontal"
          theme="dark"
          className="main-menu"
        >
          <Menu.Item key="profitloss">
            <NavLink to="/profitlosscalculator">
              <div className="text-uppercase" style={{marginTop: '4px'}}>
                Profit Loss Calculator
              </div>
            </NavLink>
          </Menu.Item>
        </Menu>
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
