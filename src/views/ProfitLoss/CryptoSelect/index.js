import React, { useEffect, useState } from "react";
import { Input, AutoComplete, Tooltip, Space, Dropdown, Menu } from "antd";
import "./cryptoSelect.css";
import { DownOutlined } from "@ant-design/icons";

export const fiatCurrencies = [
  { id: 2781, name: 'United States Dollars "$"', symbol: "USD" },
  { id: 3526, name: 'Albanian Lek "L"', symbol: "ALL" },
  { id: 3537, name: 'Algerian Dinar "د.ج"', symbol: "DZD" },
  { id: 2821, name: 'Argentine Peso "ARS"', symbol: "ARS" },
  { id: 3527, name: 'Armenian Dram "֏"', symbol: "AMD" },
  { id: 2782, name: 'Australian Dollar "$"', symbol: "AUD" },
  { id: 3528, name: 'Azerbaijani Manat "₼"', symbol: "AZN" },
  { id: 3531, name: 'Bahraini Dinar ".د.ب"', symbol: "BHD" },
  { id: 3530, name: 'Bangladeshi Taka "BDT"', symbol: "BDT" },
  { id: 3533, name: 'Belarusian Ruble "Br"', symbol: "BYN" },
];

const preciousMetals = [
  { id: 3575, name: "Gold Troy Ounce", symbol: "XAU" },
  { id: 3574, name: "Silver Troy Ounce", symbol: "XAG" },
  { id: 3577, name: "Platinum Ounce", symbol: "XPT" },
  { id: 3576, name: "Palladium Ounce", symbol: "XPD" },
];

export const defaultCryptoCurrencies = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    slug: "bitcoin",
    is_active: 1,
    status: "active",
    rank: 1,
  },
  {
    id: 1027,
    name: "Ethereum",
    symbol: "ETH",
    slug: "ethereum",
    is_active: 1,
    status: "active",
    rank: 2,
  },
  {
    id: 825,
    name: "Tether",
    symbol: "USDT",
    slug: "tether",
    is_active: 1,
    status: "active",
    rank: 3,
  },
  {
    id: 1839,
    name: "BNB",
    symbol: "BNB",
    slug: "bnb",
    is_active: 1,
    status: "active",
    rank: 4,
  },
  {
    id: 3408,
    name: "USD Coin",
    symbol: "USDC",
    slug: "usd-coin",
    is_active: 1,
    status: "active",
    rank: 5,
  },
  {
    id: 52,
    name: "XRP",
    symbol: "XRP",
    slug: "xrp",
    is_active: 1,
    status: "active",
    rank: 6,
  },
  {
    id: 2010,
    name: "Cardano",
    symbol: "ADA",
    slug: "cardano",
    is_active: 1,
    status: "active",
    rank: 7,
  },
  {
    id: 5426,
    name: "Solana",
    symbol: "SOL",
    slug: "solana",
    is_active: 1,
    status: "active",
    rank: 8,
  },
  {
    id: 5805,
    name: "Avalanche",
    symbol: "AVAX",
    slug: "avalanche",
    is_active: 1,
    status: "active",
    rank: 9,
  },
];

const renderTitle = (title) => <span>{title}</span>;

const renderItem = (item) => ({
  value: `${item.name} (${item.symbol})`,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {`${item.name} (${item.symbol})`}
    </div>
  ),
});

const defaultOptions = [
  {
    label: renderTitle("Cryptocurrencies"),
    options: defaultCryptoCurrencies.map((item) => renderItem(item)),
  },
];

function CryptoSelect({ cryptoCurrencies, onSelect, currentCoin }) {
  const findCurrency = (id) => {
    const item = defaultCryptoCurrencies.find(
      (it) => it.id.toString() === id.key
    );
    if (item) return item;

    return null;
  };

  const onMenuClick = (key) => {
    const currency = findCurrency(key);
    console.log(currency);
    if (currency) {
      onSelect(currency);
    }
  };

  const menus = defaultCryptoCurrencies.map((x) => {
    return <Menu.Item key={x.id}>{x.symbol}</Menu.Item>;
  });

  const menu = <Menu onClick={onMenuClick}>{menus}</Menu>;

  return (
    <div>
      <Dropdown overlay={menu}>
        <Tooltip title="coins">
          <Space direction="vertical">
            <img
              src="/images/img-dropdown.png"
              className="image-dropdown-button"
              alt="coins"
              width="90px"
            />
            <p className="coin-symbol">{currentCoin.symbol}</p>
            <img src="/images/arrow-dropdown.png" alt="arrow" width="45px" />
          </Space>
        </Tooltip>
      </Dropdown>
    </div>
  );
}

export default CryptoSelect;
