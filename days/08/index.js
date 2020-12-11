const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const data = string.split(/\n/);

const runCodeInstruccions = (data) => {
  const marked = {};
  let i = 0;
  let accum = 0;
  let running = true;
  while (running) {
    if (marked[i]) {
      running = false;
      return accum;
    }
    marked[i] = true;
    const [code, num] = data[i].split(' ');
    const [symbol, ...rest] = num;
    const realNum = parseInt(rest.join(''), 10);

    if (code === 'acc') {
      accum = symbol === '+' ? accum + realNum : accum - realNum;
      i++;
    }
    else if (code === 'jmp') {
      i = symbol === '+' ? i + realNum : i - realNum;
    }
    else if (code === 'nop') {
      i++;
    }
  }
  return accum;
}

console.log(runCodeInstruccions(data));

const searchBug = (data) => {
  let possibleSolutions = [];
  let accum = 0;
  data.forEach((e, i, arr) => {
    let newInstructions = JSON.parse(JSON.stringify(arr));

    if (e.substring(0, 3) === 'jmp') {
      newInstructions[i] = e.replace('jmp', 'nop');
      possibleSolutions.push(newInstructions);
    }
    if (e.substring(0, 3) === 'nop') {
      newInstructions[i] = e.replace('nop', 'jmp');
      possibleSolutions.push(newInstructions);
    }
  });

  for (let i = 0; i < possibleSolutions.length; i++) {
    let res = findPossibleSolution(possibleSolutions[i], possibleSolutions[i].length);
    if (res[0]) {
      accum = res[1];
      break;
    };
  }
  return accum;
}

const findPossibleSolution = (data, max) => {
  const marked = {};
  let i = 0;
  let accum = 0;
  let running = true;
  while (running) {

    if (i >= max) {
      running = false;
      return [true, accum];
    }

    if (marked[i]) {
      running = false;
      return [false, 0];
    }

    marked[i] = true;
    const [code, num] = data[i].split(' ');
    const [symbol, ...rest] = num;
    const realNum = parseInt(rest.join(''), 10);

    if (code === 'acc') {
      accum = symbol === '+' ? accum + realNum : accum - realNum;
      i++;
    }
    else if (code === 'jmp') {
      i = symbol === '+' ? i + realNum : i - realNum;
    }
    else if (code === 'nop') {
      i++;
    }
  }
}

console.log(searchBug(data));