const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const data = string.split(/\n/);

const getFirstImposibleNumber = (data) => {
  for (let i = 25; i < data.length; i++) {
    const selectedNumber = data[i];
    if (!isPosibleNumber(selectedNumber, data.slice(i - 25, i))) {
      return [selectedNumber, i];
    }
  }
  return null
}

const isPosibleNumber = (selectedNumber, combinations) => {
  let possible = false;
  let aux = {};
  for (let i = 0; i < combinations.length; i++) {
    const num = combinations[i];
    let res = selectedNumber - num;
    if (aux[res]) {
      return true;
    }
    aux[num] = true;
  }

  return possible;
}

const getWeakSetNumbers = (data, selectedNumber) => {
  let setNumbers = [];

  for (let i = 0; i < data.length; i++) {
    if (parseInt(data[i], 10) < selectedNumber) {
      let acum = 0;
      let index = 0;
      for (let j = i; j < data.length; j++) {
        const possibleNum = parseInt(data[j], 10);
        acum = acum + possibleNum;
        setNumbers[index] = possibleNum;
        if (acum === selectedNumber) {
          console.log('solucion');
          return [Math.min(...setNumbers), Math.max(...setNumbers), Math.min(...setNumbers) + Math.max(...setNumbers)]
        }
        index++;
      }
      acum = 0;
      setNumbers = [];
    }
  }
}
const imposibleNumber = getFirstImposibleNumber(data);
const slicedData = data.slice(0, imposibleNumber[1] + 1);
console.log(getWeakSetNumbers(slicedData, parseInt(imposibleNumber[0], 10)));
