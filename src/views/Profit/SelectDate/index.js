import React from "react";
import { Select, Space } from "antd";
import "./index.scss";

const { Option } = Select;

const currentYear = () => new Date().getFullYear();

const getYears = () => {
  const result = []
  for (let i = currentYear(); i >= 2010; i--) {
    result.push(i);
  }
  return result;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const SelectDate = ({ date, setDate }) => {
  const dayList = () => {
    const result = []
    const max = 31;
    for (let i = 1; i <= max; i++) {
      result.push(i);
    }
    return result;
  }

  return (
    <Space direction="horizontal" className="select-space">
      <Select
        defaultValue={date.year}
        size="large"
        style={{ width: '100%' }}
        onChange={value => setDate('year', value)}
      >
        { getYears().map(year => (
          <Option key={year} value={year}>{year}</Option>
        ))}
      </Select>
      <Select
        defaultValue={date.month}
        size="large"
        style={{ width: '100%' }}
        onChange={value => setDate('month', value)}
      >
        { monthNames.map((month, index) => (
          <Option key={index} value={month}>{month}</Option>
        ))}
      </Select>
      <Select
        defaultValue={date.day}
        size="large"
        style={{ width: '100%' }}
        onChange={value => setDate('dayf', value)}
      >
        { dayList().map((day, index) => (
          <Option key={index} value={day}>{day}</Option>
        ))}
      </Select>
    </Space>
  )
}

export default SelectDate;