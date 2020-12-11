// INPUT //
const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const data = string.split(/\n/);

const matrix = [];
for (let i = 0; i < data.length; i++) {
  const element = data[i];
  matrix.push(element.split(''));
}

const canMove = (currentY) => {
  if (currentY + 1 < matrix.length) {
    return true;
  }
  return false;
}
const sumMoveX = (currentX, limitMatrixCols, moveX) => {
  if ((currentX + moveX) >= limitMatrixCols) {
    return Math.abs(limitMatrixCols - (currentX + moveX));
  }
  return currentX + moveX;
}

const travelMatrix = (moveX, moveY) => {
  let countTree = 0;
  let currentX = 0;
  let currentY = 0;
  let isEnded = false;

  while (!isEnded) {
    if (canMove(currentY)) {
      currentX = sumMoveX(currentX, matrix[currentY].length, moveX);
      currentY = currentY + moveY;
      if (matrix[currentY][currentX] === '#') {
        countTree++;
      }
    }
    else {
      isEnded = true;
    }
  }
  return countTree;
}

const tree1 = travelMatrix(1, 1);
const tree2 = travelMatrix(3, 1); //First solution
const tree3 = travelMatrix(5, 1);
const tree4 = travelMatrix(7, 1);
const tree5 = travelMatrix(1, 2);
console.log('tree TOTAL', tree1 * tree2 * tree3 * tree4 * tree5);
