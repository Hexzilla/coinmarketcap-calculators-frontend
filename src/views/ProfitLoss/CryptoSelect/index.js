import React from "react";
import { Space, Dropdown, Menu } from "antd";
import "./index.scss";

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

function CryptoSelect({ onSelect, currentCoin }) {
  const findCurrency = (id) => {
    const item = defaultCryptoCurrencies.find(
      (it) => it.id.toString() === id.key
    );
    if (item) return item;

    return null;
  };

  const onMenuClick = (key) => {
    const currency = findCurrency(key);
    if (currency) {
      onSelect(currency);
    }
  };

  const menus = defaultCryptoCurrencies.map((x) => {
    return <Menu.Item key={x.id}>{x.symbol}</Menu.Item>;
  });

  const menu = <Menu className="crypto-menu" onClick={onMenuClick}>{menus}</Menu>;

  return (
    <div className="crypto-select-wrapper">
      <Dropdown overlay={menu}>
        <div>
          <Space direction="vertical" style={{ position: "relative" }}>
            <img
              src="/images/img-dropdown.png"
              className="image-dropdown-button"
              alt="coins"
              width="90px"
            />
            <p className="coin-symbol">{currentCoin.symbol}</p>
            <img src="/images/arrow-dropdown.png" alt="arrow" width="45px" />
          </Space>
        </div>
      </Dropdown>
    </div>
  );
}

export default CryptoSelect;
