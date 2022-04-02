import React from "react";
import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import FooterPage from "components/Footer";
import MenuItems from "./MenuItems";
import "./menu.less";

const { Header, Content, Sider, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="menu-layout">
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
          {/* <Dropdown overlay={menu}>
            <div className="ant-dropdown-link cursor-pointer" onClick={e => e.preventDefault()}>
              <MenuOutlined />
            </div>
          </Dropdown> */}
        </div>
        <div className="desktop-menu">
          <MenuItems />
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
