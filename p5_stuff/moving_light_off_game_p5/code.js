var mixSpeed = 50;

var changeText = true;
var colorsAmount = 2;

var btnProp = {
  h: 80,
  w: 80
};

function convertRGBToArray(rgbStr) {
  return rgbStr.slice(1).match(/.{1,2}/g).map(y =>
  {
    return parseInt(y, 16);
  })
}

var pressedKeys = {
  left: false, // 37
  up: false,  // 38
  right: false,  // 39
  down: false,  // 40
  leftPrev: false, // 37
  upPrev: false,  // 38
  rightPrev: false,  // 39
  downPrev: false  // 40
};

var sqrPlayer = new function() {
  this.color = convertRGBToArray("#2ed516");
  this.x = 0;
  this.y = 0;
  this.w = 30;
  this.h = this.w;
  this.xo = (btnProp.w-this.w)/2;
  this.yo = (btnProp.h-this.h)/2;

  this.update = function() {
    var hasChanged = false;
    if (pressedKeys.left && !pressedKeys.leftPrev && this.x > 0) {
      pressedKeys.leftPrev = true;
      this.x -= 1;
      hasChanged = true;
    } else if (pressedKeys.right && !pressedKeys.rightPrev && this.x < fieldMain.cols-1) {
      pressedKeys.rightPrev = true;
      this.x += 1;
      hasChanged = true;
    } else if (pressedKeys.up && !pressedKeys.upPrev && this.y > 0) {
      pressedKeys.upPrev = true;
      this.y -= 1;
      hasChanged = true;
    } else if (pressedKeys.down && !pressedKeys.downPrev && this.y < fieldMain.rows-1) {
      pressedKeys.downPrev = true;
      this.y += 1;
      hasChanged = true;
    }

    if (hasChanged) {
      fieldMain.ffs[this.y][this.x]();
    }
  };

  this.draw = function() {
    fill(...this.color);
    rect(this.xo+btnProp.w*this.x, this.yo+btnProp.h*this.y, this.w, this.h);
  };
};

var canvProp = new function() {
  this.h = 0;
  this.w = 0;
};

var mouseProp = new function() {
  this.released = false;
  this.x = 0;
  this.y = 0;
};

var colors = [
  '#111111',
  '#eea921',
  '#b03529',
  '#7143e0'
];

var hexInvertTable = {
  '0': 'F', '1': 'E', '2': 'D', '3': 'C', '4': 'B',
  '5': 'A', '6': '9', '7': '8', '9': '6', '8': '7',
  'F': '0', 'E': '1', 'D': '2', 'C': '3', 'B': '4', 'A': '5',
  'f': '0', 'e': '1', 'd': '2', 'c': '3', 'b': '4', 'a': '5'
};

var colorsFont = colors.map(x =>
  x.split('').map(y => {
    console.log(`x: ${x}, y: ${y}`);
    if (y in hexInvertTable) {
      return hexInvertTable[y];
    }
    return y;
  }).join('')
);

var colorsRGB = colors.map(x => {
  return x.slice(1).match(/.{1,2}/g).map(y =>
  {
    return parseInt(y, 16);
  });
});

console.log(`colors: ${colors}`);
console.log(`colorsFont: ${colorsFont}`);

var fieldMain = new function() {
  this.rows = 3;
  this.cols = 4;
  this.r = 0;
  this.c = 0;
  this.field = [];
  this.fs = [];
  this.ffs = [];
  this.divIds = [];
  this.objsBtn = {};
  this.btnIds = [];
  this.txtIds = [];
  this.fsBtn = {};
  this.btnsProp = {};
  this.divObjUp = {};
  this.divObjDown = {};
  this.divObjD2 = {};
  this.divMainId = "#buttons_field";
  this.btnColors = colors;

  var fieldMain = this;

  for (let j = 0; j < this.rows; j++) {
    let fRow = [];
    for (let i = 0; i < this.cols; i++) {
      fRow.push(function() {
        let j1 = j;
        let i1 = i;
        return function() {
          fieldMain.field[j1][i1] = (fieldMain.field[j1][i1] + 1) % colorsAmount;
        };
      }());
    }
    this.fs.push(fRow);
  }

  function logic1(fs, i, j) {
    if (j > 0) {
      fs.push(fieldMain.fs[j-1][i]);
    }
    if (j < fieldMain.rows-1) {
      fs.push(fieldMain.fs[j+1][i]);
    }
    if (i > 0) {
      fs.push(fieldMain.fs[j][i-1]);
    }
    if (i < fieldMain.cols-1) {
      fs.push(fieldMain.fs[j][i+1]);
    }
  }

  function logic2(fs, i, j) {
    if ((i % 2 == 0) && (j % 2 == 0) || (i % 2 == 1) && (j % 2 == 1)) {
      if (j > 0) {
        fs.push(fieldMain.fs[j-1][i]);
      }
      if (j < fieldMain.rows-1) {
        fs.push(fieldMain.fs[j+1][i]);
      }
    } else {
      if (i > 0) {
        fs.push(fieldMain.fs[j][i-1]);
      }
      if (i < fieldMain.cols-1) {
        fs.push(fieldMain.fs[j][i+1]);
      }
    }
  }

  function logic3(fs, i, j) {
    if (i > 0) {
      fs.push(fieldMain.fs[j][i-1]);
    }
    if (i < fieldMain.cols-1) {
      fs.push(fieldMain.fs[j][i+1]);
    }
    if (j > 0) {
      fs.push(fieldMain.fs[j-1][i]);

      if (i > 0) {
        fs.push(fieldMain.fs[j-1][i-1]);
      }
      if (i < fieldMain.cols-1) {
        fs.push(fieldMain.fs[j-1][i+1]);
      }
    }
    if (j < fieldMain.rows-1) {
      fs.push(fieldMain.fs[j+1][i]);

      if (i > 0) {
        fs.push(fieldMain.fs[j+1][i-1]);
      }
      if (i < fieldMain.cols-1) {
        fs.push(fieldMain.fs[j+1][i+1]);
      }
    }
  }

  for (let j1 = 0; j1 < this.rows; j1++) {
    let fRow = [];
    for (let i1 = 0; i1 < this.cols; i1++) {
      fRow.push(function() {
        let j = j1;
        let i = i1;

        function g() {
          for (let f of g.fs) {
            f();
          }
        }
        g.fs = [fieldMain.fs[j][i]];

        // // original
        // logic1(g.fs, i, j);

        // // horizontal and vertical separate
        // logic2(g.fs, i, j);

        // original
        logic3(g.fs, i, j);

        return g;
      }());
    }
    this.ffs.push(fRow);
  }
};

function setup() {
  canvProp.w = fieldMain.cols * btnProp.w + 1;
  canvProp.h = fieldMain.rows * btnProp.h + 1;
  canvas = createCanvas(canvProp.w, canvProp.h);
  canvas.parent("canvas_div");
  canvas.oncontextmenu = function () {
    return false;
  };

  var field = fieldMain.field;
  for (var j = 0; j < fieldMain.rows; j++) {
    var row = [];
    for (var i = 0; i < fieldMain.cols; i++) {
      row.push(0);
    }
    field.push(row);
  }

  frameRate(60);
}

function draw() {
  background(0);
  // noStroke();
  stroke(0x80);

  if (mouseProp.released === true) {
    if (mouseProp.x >= 0 && mouseProp.x < canvProp.w &&
        mouseProp.y >= 0 && mouseProp.y < canvProp.h) {
      var idxX = Math.floor(mouseProp.x / btnProp.w);
      var idxY = Math.floor(mouseProp.y / btnProp.h);

      // fieldMain.field[idxY][idxX] = (fieldMain.field[idxY][idxX] + 1) % colorsAmount;
      fieldMain.ffs[idxY][idxX]();
    }
    mouseProp.released = false;
  }

  sqrPlayer.update();

  var field = fieldMain.field;
  for (var j = 0; j < fieldMain.rows; j++) {
    var row = field[j];
    for (var i = 0; i < fieldMain.cols; i++) {
      var val = row[i];
      fill(...colorsRGB[val]);
      rect(btnProp.w*i, btnProp.h*j, btnProp.w, btnProp.h);
    }
  }

  sqrPlayer.draw();
}

function mouseReleased() {
  if (mouseProp.released === false) {
    mouseProp.released = true;
    mouseProp.x = mouseX;
    mouseProp.y = mouseY;
  }
}

function btnclickMixField() {
  function* h() {
    var dirTable = {'L': 37, 'U': 38, 'R': 39, 'D': 40};
    var amountMoves = fieldMain.rows*fieldMain.cols*2;
    var moveTable = [];

    for (let j = 0; j < fieldMain.rows; j++) {
      let moveTableRow = [];
      for (let i = 0; i < fieldMain.cols; i++) {
        let moveTableCell = [];
        if (j > 0) {
          moveTableCell.push(dirTable['U']);
        }
        if (j < fieldMain.rows-1) {
          moveTableCell.push(dirTable['D']);
        }
        if (i > 0) {
          moveTableCell.push(dirTable['L']);
        }
        if (i < fieldMain.cols-1) {
          moveTableCell.push(dirTable['R']);
        }

        moveTableRow.push(moveTableCell);
      }
      moveTable.push(moveTableRow);
    }

    for (let i = 0; i < amountMoves; i++) {
      console.log(`mixing: i: ${i}`);
      var moves = moveTable[sqrPlayer.y][sqrPlayer.x];
      let keyCode = moves[Math.floor(Math.random() * moves.length)];

      var prevX = sqrPlayer.x;
      var prevY = sqrPlayer.y;

      keyDown({keyCode: keyCode});
      yield true;

      while (prevX === sqrPlayer.x && prevY === sqrPlayer) {
        yield "wait";
      }

      keyUp({keyCode: keyCode});
      yield true;
    }

    yield false;
  }

  var gen = h();

  async function f() {
    var r = gen.next().value;
    if (r === "wait") {
      setTimeout(f, 10);
    } else if (r) {
      setTimeout(f, mixSpeed);
    }
  }
  f();
}
