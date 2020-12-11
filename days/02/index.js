// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const numbersString = string.split(/\n/);

const data = numbersString.map(elem => {
  return elem.split(' ');
});

const calculatePasswordsValid = (data) => {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    const [rep, letter, password] = data[i];
    const [range1, range2] = rep.split('-');
    const l = letter.replace(':', '');
    const pattern = new RegExp(`${l}`, 'g');
    const matched = password.match(pattern) ? password.match(pattern).length : -99999;
    if (matched >= range1 && matched <= range2) {
      count++;
    }
  }
  return count;
}

const calculatePasswordValidV2 = (data) => {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    const [rep, letter, password] = data[i];
    const [range1, range2] = rep.split('-');
    const l = letter.replace(':', '');

    if (password[range1 - 1] === l && password[range2 - 1] !== l) {
      count++;
    }
    if (password[range1 - 1] !== l && password[range2 - 1] === l) {
      count++;
    }
  }
  return count;
}
const count = calculatePasswordsValid(data);
const count2 = calculatePasswordValidV2(data);
console.log('count', count);
console.log('count2', count2);
