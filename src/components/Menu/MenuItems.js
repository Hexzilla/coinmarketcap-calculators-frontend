import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import "./menu.less";

const { SubMenu } = Menu;

const MenuItems = () => {
  const [current, setCurrent] = useState("cryptocurrency");

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
    >
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
    </Menu>
  )
}

export default MenuItems;
