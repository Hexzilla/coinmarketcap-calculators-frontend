import React from "react";
import { Select, Space } from "antd";
import moment from 'moment';
import "./index.scss";

const { Option } = Select;

const getYears = () => {
  const result = []
  for (let i = moment().year(); i >= 2010; i--) {
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
    let maxDate = moment(date.moment).endOf('month').date();
    if (moment().diff(date.moment, 'days') === 0) {
      maxDate = moment().date();
    }
    for (let i = 1; i <= maxDate; i++) {
      result.push(i);
    }
    return result;
  }

  const monthList = () => {
    const result = []
    let months = monthNames.length;
    if (moment().diff(date.moment, 'years') === 0) {
      months = moment().month();
    }
    console.log("months~~~~~~~~~", months)
    for (let i = 0; i <= months; i++) {
      result.push(monthNames[i]);
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
        { monthList().map((name, index) => (
          <Option key={index} value={index}>{name}</Option>
        ))}
      </Select>
      <Select
        defaultValue={date.day}
        size="large"
        style={{ width: '100%' }}
        onChange={value => setDate('day', value)}
      >
        { dayList().map((day, index) => (
          <Option key={index} value={day}>{day}</Option>
        ))}
      </Select>
    </Space>
  )
}

export default SelectDate;