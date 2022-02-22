import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./menu.css";

const { Header, Footer, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
  const [current, setCurrent] = useState("analytics");

  return (
    <Layout>
      <Layout>
        <Header style={{ display: "flex" }}>
          <img src="/images/Kryptos logo.svg" alt="logo" width={42} />
          <Menu
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
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
              <NavLink to="/calculator">
                <div className="text-uppercase">Calculator</div>
              </NavLink>
            </Menu.Item>
            {/* <Menu.Item key="features">
              <div className="text-uppercase">Features</div>
            </Menu.Item> */}
            <Menu.Item key="connect">
              <div className="text-uppercase">Connect with us</div>
            </Menu.Item>
            {/* <Menu.Item key="login">
              <NavLink to="/login">
                <div className="text-uppercase">Sign In</div>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="singup">
              <NavLink to="/register">
                <div className="text-uppercase">Sign up</div>
              </NavLink>
            </Menu.Item> */}
          </Menu>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
