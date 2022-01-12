const GenHourCol = () => {
  // Prefix an integer with zeros
  const prefixWithZeros = (n, length) => `${Array(length).join('0')}${n}`.slice(-length);

  let hourStart = 0;
  let arr = []
  while (hourStart < 25) {arr.push(hourStart++);
  }
  const hourRow = arr.map(item => prefixWithZeros(item, 2))
  return hourRow;
};
export default GenHourCol;