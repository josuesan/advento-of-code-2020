const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const data = string.split(/\n/);

const groupPeople = (rawData) => {
  const groupedPeople = [];
  let position = 0;
  for (let i = 0; i < rawData.length; i++) {
    const element = rawData[i];
    if (element === '') {
      position++;
    }
    else {
      groupedPeople[position] = groupedPeople[position] ? `${groupedPeople[position]} ${element}` : element;
    }
  }
  return groupedPeople;
}

const isValidPassport = (passport, requiredFields) => {
  let flag = true;
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (passport.indexOf(field) === -1) {
      flag = false;
      return;
    }
  }
  return flag;
}
const validSpecificField = (specFields) => {
  let valid = true;
  let pattern;
  for (let i = 0; i < specFields.length; i++) {
    const [name, value] = specFields[i].split(':');
    switch (name) {
      case 'byr':
        pattern = new RegExp(/^(19[2-9][0-9]|200[0-2])$/);
        valid = pattern.test(value);
        break;
      case 'iyr':
        pattern = new RegExp(/^(201[0-9]|2020)$/);
        valid = pattern.test(value);
        break;
      case 'eyr':
        pattern = new RegExp(/^(202[0-9]|2030)$/);
        valid = pattern.test(value);
        break;
      case 'hgt':
        pattern = new RegExp(/^((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)$/);
        valid = pattern.test(value);
        break;
      case 'hcl':
        pattern = new RegExp(/^#([0-9]|[a-f]){6}$/);
        valid = pattern.test(value);
        break;
      case 'ecl':
        pattern = new RegExp(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
        valid = pattern.test(value);
        break;
      case 'pid':
        pattern = new RegExp(/^(\d){9}$/);
        valid = pattern.test(value);
        break;
      default:
        break;
    }
    if (!valid) {
      return valid;
    }
  }
  return valid;
}

const verifyPassports = (formatData) => {
  let validPassports = 0;
  let doubleCheckValidPassports = 0;
  formatData.forEach(element => {
    if (isValidPassport(element, ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'])) {
      validPassports++;
      if (validSpecificField(element.split(' '))) {
        doubleCheckValidPassports++;
      }
    }

  });
  return [validPassports, doubleCheckValidPassports];
}

const formatData = groupPeople(data);
const [validPassports, doubleCheckValidPassports] = verifyPassports(formatData)
console.log(validPassports, doubleCheckValidPassports);