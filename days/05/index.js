const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const data = string.split(/\n/);


const calculateSeat = (rows, cols, code) => {
  let top = rows - 1;
  let bottom = 0;
  let left = 0;
  let right = cols - 1;

  for (let i = 0; i < code.length; i++) {
    const digit = code[i];

    if (digit === 'F') {
      top = bottom + Math.floor((top - bottom) / 2);
    }
    if (digit === 'B') {
      bottom = top - Math.floor((top - bottom) / 2);

    }
    if (digit === 'L') {
      left = right - Math.floor((right - left) / 2);

    }
    if (digit === 'R') {
      right = left + Math.round((right - left) / 2);
    }
  }
  console.log(top, bottom, right, left);
  return top * 8 + right;
}

const totalRows = 128;
const totalCols = 8;
let maxSeatId = 0;
for (let i = 3; i < data.length; i++) {
  const res = calculateSeat(totalRows, totalCols, data[i]);
  maxSeatId = res > maxSeatId ? res : maxSeatId;
}
console.log(maxSeatId);