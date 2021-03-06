

const cellsGenerator = (month, year) => {
  // Get the number of days in given month
  const daysInMonth = new Date(year, month, 0).getDate();
  //  Create array of days in month
  const rangeDays = [...Array(daysInMonth).keys()].map((i) => i + 1);

  const CellsArray = [];

  // Generate an array of cell
  rangeDays.forEach(day => CellsArray.push({ "id": `10${day}`, "date": day }))
  return CellsArray;
};
export default cellsGenerator;