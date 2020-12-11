// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const initialList = string.split(/\n/);

const getTwoEntries = (list) => {
  for (let i = 0; i < list.length; i++) {
    for (let j = i; j < list.length; j++) {
      if (list[i] + list[j] === 2020) {
        return [i, j];
      }
    }
  }
  return [];
}

const getThreeEntries = (list) => {
  for (let i = 0; i < list.length; i++) {
    for (let j = i; j < list.length; j++) {
      for (let k = j; k < list.length; k++) {
        if (list[i] + list[j] + list[k] === 2020) {
          return [i, j, k];
        }
      }
    }
  }
  return [];
}


const [i, j] = getTwoEntries(initialList);
if (i >= 0 && j >= 0) {
  const result = initialList[i] * initialList[j];
  console.log(result);
}

const [k, l, m] = getThreeEntries(initialList);
if (k >= 0 && l >= 0 && m >= 0) {
  const result = initialList[k] * initialList[l] * initialList[m];
  console.log(result);
}
