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
            width={230}
            style={{ marginLeft: "-30px" }}
          />
        </NavLink>
        <Menu
          onClick={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          breakpoint="sm"
          mode="horizontal"
          theme="dark"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            background: "#FFFFFF",
          }}
        >
          <Menu.Item key="analytics">
            <NavLink to="/cryptocurrencycalculator">
              <div className="text-uppercase">
                Cryptocurrency Conversion Calculator
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
