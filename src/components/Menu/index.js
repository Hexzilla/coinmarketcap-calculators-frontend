import React, { useState } from "react";
import { Layout, Menu, Divider } from "antd";
import "./menu.css"

const { Header, Footer, Content } = Layout;

const MainLayout = ({ children }) => {
  const [current, setCurrent] = useState("analytics");

  return (
    <>
      <Layout>
        <Header style={{display: 'flex'}}>
          <img src="/images/download.svg" alt="logo" width={42} />
          <Menu
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
            style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}
          >
            <Menu.Item key="analytics">
              <div className="text-uppercase">Analytics</div>
            </Menu.Item>
            <Menu.Item key="features">
              <div className="text-uppercase">Features</div>
            </Menu.Item>
            <Menu.Item key="connect">
              <div className="text-uppercase">Connect with us</div>
            </Menu.Item>
            <Menu.Item key="singin">
              <div className="text-uppercase">Sign In</div>
            </Menu.Item>
            <Menu.Item key="singup">
              <div className="text-uppercase">Sign Up</div>
            </Menu.Item>
          </Menu>
        </Header>
      <Content>{children}</Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
