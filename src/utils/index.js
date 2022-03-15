const formatComma = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatNumber = (value, dollar = '$') => {
  console.log("formatNumber", value)
  const convert = (value) => {
    if (Math.abs(value) >= 1000000000) {
      return formatComma((value / 1000000000).toFixed(2)) + 'B';
    }
    if (Math.abs(value) >= 1000000) {
      return formatComma((value / 1000000).toFixed(2)) + 'M';
    }

    if (value >= 1.0) {
      value = value.toFixed(2)
    } else {
      value = value.toFixed(8)
    }

    return formatComma(value);
  }

  const result = convert(value);
  if (result.length >= 12) {
    return `> ${dollar}10B`;
  }
  return dollar + result;
}