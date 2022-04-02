import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import FooterPage from "components/Footer";
import "./menu.less";

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const MainLayout = ({ children }) => {
  const [current, setCurrent] = useState("cryptocurrency");

  const MenuItems = (
    <>
      <Menu.Item className="submenu-item" key="pricing">
        <NavLink to="/pricing">
          <div className="submenu-text">
            Pricing
          </div>
        </NavLink>
      </Menu.Item>
      <SubMenu key="SubMenu" title="Cryptocurrency Calculators">
        <Menu.Item className="submenu-item" key="cryptocurrency">
          <NavLink to="/cryptocurrencyconversioncalculator">
            <div className="submenu-text">
              Cryptocurrency Conversion Calculator
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="submenu-item" key="profitlosscalculator">
          <NavLink to="/profitlosscalculator">
            <div className="submenu-text">
              Profit Loss Calculator
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="submenu-item" key="cryptoprofitcalculator">
          <NavLink to="/cryptoprofitcalculator">
            <div className="submenu-text">
              Crypto Profit Calculator
            </div>
          </NavLink>
        </Menu.Item>
      </SubMenu>
    </>
  )

  const DesktopMenu = (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
    >
      { MenuItems }
    </Menu>
  )

  const MobileMenu = (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
    >
      { MenuItems }
    </Menu>
  )

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
          <Dropdown overlay={MobileMenu}>
            <div className="ant-dropdown-link cursor-pointer" onClick={e => e.preventDefault()}>
              <MenuOutlined />
            </div>
          </Dropdown>
        </div>
        <div className="desktop-menu">
          { DesktopMenu }
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
