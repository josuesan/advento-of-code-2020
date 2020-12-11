const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const data = string.split(/\n/);

const groupDataMatrix = (data) => {
  const groupedData = [];
  let pos = 0;
  for (let i = 0; i < data.length; i++) {
    const elem = data[i];
    if (elem === '') {
      pos++;
    }
    else {
      groupedData[pos] = groupedData[pos] !== undefined ? [...groupedData[pos], ...elem] : [...elem];
    }
  }
  return groupedData;
}
const groupDataString = (data) => {
  const groupedData = [];
  let pos = 0;
  for (let i = 0; i < data.length; i++) {
    const elem = data[i];
    if (elem === '') {
      pos++;
    }
    else {
      groupedData[pos] = groupedData[pos] !== undefined ? `${groupedData[pos]}${elem}` : elem;
    }
  }
  return groupedData;
}

const countUniqueAnswers = (data) => {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    const groupAnswers = data[i];
    const uniqueAnswers = [...new Set(groupAnswers)];
    count = count + uniqueAnswers.length;
  }
  return count;
}
const findIntersection = (a, b) => {
  let arr1 = a.split('');
  let arr2 = b.split('');

  let intersectStrings = arr1.filter((value) => arr2.includes(value));

  if (intersectStrings.length === 0) {
    return '';
  } else {
    return intersectStrings.join('').replace(/\s/g, '');
  }
}

const answeredByAll = (data) => {
  let acum = 0;
  let newGroup = true;
  let intersectionWord = '';
  for (let i = 0; i < data.length; i++) {
    const elem = data[i];
    if (newGroup) {
      intersectionWord = elem;
      newGroup = false;
    }
    if (elem === '') {
      acum = acum + intersectionWord.length;
      newGroup = true;
      intersectionWord = '';
    }

    intersectionWord = findIntersection(intersectionWord, elem);
  }
  acum = acum + intersectionWord.length;
  return acum;
}

const groupedData = groupDataMatrix(data);
// console.log(countUniqueAnswers(groupedData))
console.log(answeredByAll(data))