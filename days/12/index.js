const fs = require('fs');
const string = fs.readFileSync(__dirname + '/input.txt').toString();

// CONVERT TO ARRAY //
const data = string.split(/\n/);

const travelSpace = (map) => {
  /**
   * POSITION
   * 0 NORTH
   * 1 EAST
   * 2 SOUTH
   * 3 WEST
   */
  let x = 0, y = 0, currentPos = 1, qtyMove = 0;

  for (let i = 0; i < map.length; i++) {
    const dir = map[i][0];
    let qty = parseInt(map[i].substring(1));
    switch (dir) {
      case 'N':
        y = y + qty;
        break;
      case 'S':
        y = y - qty;
        break;
      case 'E':
        x = x + qty;
        break;
      case 'W':
        x = x - qty;
        break;
      case 'L':
        qtyMove = qty / 90;
        while (qtyMove > 0) {
          currentPos = currentPos - 1;
          if (currentPos < 0) {
            currentPos = 3;
          }
          qtyMove--;
        }
        break;
      case 'R':
        qtyMove = qty / 90;
        currentPos = currentPos + qtyMove;
        currentPos = currentPos % 4;
        break;
      case 'F':
        if (currentPos === 0) {
          y = y + qty;
        }
        else if (currentPos === 1) {
          x = x + qty;

        }
        else if (currentPos === 2) {
          y = y - qty;
        }
        else {
          x = x - qty;
        }
        break;

      default:
        break;
    }
  }
  console.log('x', x, ' y', y);
  return Math.abs(x) + Math.abs(y);
}


const travelSpaceWithWaypoints = (map) => {
  let x = 0, y = 0, waypoint = {
    x: 10,
    y: 1,
    dir: 0,
  }, currentPos = 0, qtyMove = 0;;

  /**
   * DIR
   * 0 x heads east, y heads north
   * 1 x heads south, y heads east
   * 2 x heads west, y heads south
   * 3 x heads north, y heads west
   */

  for (let i = 0; i < map.length; i++) {
    const dir = map[i][0];
    let qty = parseInt(map[i].substring(1));
    switch (dir) {
      case 'F':
        switch (waypoint.dir) {
          case 0:
            x = x + (waypoint.x * qty);
            y = y + (waypoint.y * qty);
            break;
          case 1:
            x = x + (waypoint.y * qty);
            y = y + (waypoint.x * qty) * -1;
            break;
          case 2:
            x = x + (waypoint.x * qty) * -1;
            y = y + (waypoint.y * qty) * -1;
            break;
          case 3:
            x = x + (waypoint.y * qty) * -1;
            y = y + (waypoint.x * qty);
            break;
          default:
            break;
        }
        break;
      case 'N':
        switch (waypoint.dir) {
          case 0:
            waypoint.y = waypoint.y + qty;
            break;
          case 1:
            waypoint.x = waypoint.x - qty;
            break;
          case 2:
            waypoint.y = waypoint.y - qty;
            break;
          case 3:
            waypoint.x = waypoint.x + qty;
            break;
          default:
            break;
        }
        break;
      case 'S':
        switch (waypoint.dir) {
          case 0:
            waypoint.y = waypoint.y - qty;
            break;
          case 1:
            waypoint.x = waypoint.x + qty;
            break;
          case 2:
            waypoint.y = waypoint.y + qty;
            break;
          case 3:
            waypoint.x = waypoint.x - qty;
            break;
          default:
            break;
        }
        break;
      case 'E':
        switch (waypoint.dir) {
          case 0:
            waypoint.x = waypoint.x + qty;
            break;
          case 1:
            waypoint.y = waypoint.y + qty;
            break;
          case 2:
            waypoint.x = waypoint.x - qty;
            break;
          case 3:
            waypoint.y = waypoint.y - qty;
            break;
          default:
            break;
        }
        break;
      case 'W':
        switch (waypoint.dir) {
          case 0:
            waypoint.x = waypoint.x - qty;
            break;
          case 1:
            waypoint.y = waypoint.y - qty;
            break;
          case 2:
            waypoint.x = waypoint.x + qty;
            break;
          case 3:
            waypoint.y = waypoint.y + qty;
            break;
          default:
            break;
        }
        break;
      case 'L':
        qtyMove = qty / 90;
        while (qtyMove > 0) {
          currentPos = currentPos - 1;
          if (currentPos < 0) {
            currentPos = 3;
          }
          qtyMove--;
        }
        waypoint.dir = currentPos;
        break;
      case 'R':
        qtyMove = qty / 90;
        currentPos = currentPos + qtyMove;
        currentPos = currentPos % 4;
        waypoint.dir = currentPos;
        break;
      default:
        break;
    }
  }
  console.log('x', x, ' y', y);
  return Math.abs(x) + Math.abs(y);
}

console.log(travelSpace(data));
console.log(travelSpaceWithWaypoints(data));
