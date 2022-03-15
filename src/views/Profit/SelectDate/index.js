import React from "react";
import { Select, Space } from "antd";
import moment from 'moment';
import "./index.scss";

const { Option } = Select;

const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const SelectDate = ({ coin, date, setDate }) => {
  const dayList = () => {
    let maxDate = moment(date.moment).endOf('month').date();
    if (moment().diff(date.moment, 'days') === 0) {
      maxDate = moment().date();
    }

    const result = []
    for (let i = 1; i <= maxDate; i++) {
      result.push(i);
    }
    return result;
  }

  const monthList = () => {
    let minMonth = 1;
    if (date.year === coin.start_year) {
      minMonth = coin.start_month;
    }  

    if (date.month < minMonth) {
      setDate('month', minMonth)
    }

    let maxMonth = monthNames.length;
    if (moment().diff(date.moment, 'years') === 0) {
      maxMonth = moment().month() + 1;
    }

    console.log("month", minMonth, maxMonth, date.year, coin.start_year);

    const result = []
    for (let i = minMonth; i <= maxMonth; i++) {
      result.push({
        value: i,
        name: monthNames[i - 1]
      });
    }
    return result;
  }

  const yearList = () => {
    let minValue = coin.start_year;
    if (date.year < minValue) {
      setDate('year', minValue)
    }
    let maxValue = moment().year();

    console.log("year", minValue, maxValue)

    const result = []
    for (let i = maxValue; i >= minValue; i--) {
      result.push(i);
    }
    return result;
  }

  return (
    <Space direction="horizontal" className="select-space">
      <Select
        value={date.year}
        size="large"
        style={{ width: '100%' }}
        onChange={value => setDate('year', value)}
      >
        { yearList().map(year => (
          <Option key={year} value={year}>{year}</Option>
        ))}
      </Select>
      <Select
        value={date.month}
        size="large"
        style={{ width: '100%' }}
        onChange={value => setDate('month', value)}
      >
        { monthList().map((month, index) => (
          <Option key={index} value={month.value}>{month.name}</Option>
        ))}
      </Select>
      <Select
        value={date.day}
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