function keyDown(event) {
//   // console.log(`keyDown: event.keyCode: ${event.keyCode}`);
  var keyCode = event.keyCode;
//
  if (keyCode in pressedKeys) {
    if (pressedKeys[keyCode] === true) {
      return;
    } else {
      pressedKeys[keyCode] = true;
    }
  }

  switch (keyCode) {
    case 37: // left
    case 65: // key A
      console.log("down left");
      pressedKeys.left = true;
      break;
    case 38: // up
    case 87: // key W
      console.log("down up");
      pressedKeys.up = true;
      break;
    case 39: // right
    case 68: // key D
      console.log("down right");
      pressedKeys.right = true;
      break;
    case 40: // down
    case 83: // key S
      console.log("down down");
      pressedKeys.down = true;
      break;
    default:
      console.log(`keyCode: ${keyCode}`);
      break;
  }
}

function keyUp(event) {
//   // console.log(`keyDown: event.keyCode: ${event.keyCode}`);
  var keyCode = event.keyCode;
//
  if (keyCode in pressedKeys) {
    if (pressedKeys[keyCode] === false) {
      return;
    } else {
      pressedKeys[keyCode] = false;
    }
  }

  switch (keyCode) {
    case 37: // left
    case 65: // key A
      console.log("up left");
      pressedKeys.left = false;
      pressedKeys.leftPrev = false;
      break;
    case 38: // up
    case 87: // key W
      console.log("up up");
      pressedKeys.up = false;
      pressedKeys.upPrev = false;
      break;
    case 39: // right
    case 68: // key D
      console.log("up right");
      pressedKeys.right = false;
      pressedKeys.rightPrev = false;
      break;
    case 40: // down
    case 83: // key S
      console.log("up down");
      pressedKeys.down = false;
      pressedKeys.downPrev = false;
      break;
  }
}
