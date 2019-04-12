var btnFieldRows = 4;
var btnFieldCols = 5;

var solveSpeed = 100; // in ms

var changeText = true;

var colorsAmount = 2;

var btnProp = {
  h: 70,
  w: 70
};

var pressedKeys = {
  37: false,
  38: false,
  39: false,
  40: false
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

console.log(`colors: ${colors}`);
console.log(`colorsFont: ${colorsFont}`);

// window.event.preventDefault();

function doKeyDown(e) {
  console.log(`e.keyCode: ${e.keyCode}`);
}

// var arrL = $.Event( "keydown", { keyCode: 37 } );
// var arrU = $.Event( "keydown", { keyCode: 38 } );
// var arrR = $.Event( "keydown", { keyCode: 39 } );
// var arrD = $.Event( "keydown", { keyCode: 40 } );

// window.addEventListener( "keypress", doKeyDown, false );

var btnsFieldMain = {
  r: 0,
  c: 0,
  divIds: [],
  objsBtn: {},
  btnIds: [],
  txtIds: [],
  fs: {},
  ffs: {},
  fsBtn: {},
  btnsProp: {},
  divObjUp: {},
  divObjDown: {},
  divObjD2: {},
  divMainId: "#buttons_field",
  btnColors: colors
};

function getDivHTML(id) {
  return `
    <div id="${id}" style="
      display: table-row;
      // float: right;
      // display: block;
      // flex-wrap: wrap;
    ">
    </div>
  `;
}

function getButtonHTML(id, width, height, bgcolor, content) {
  return `
    <button id="${id}" style="
    width: ${width}px;
    height: ${height}px;
    background-color: ${bgcolor};
    ">${content}</button>
  `;
}

function createButtonsGrid() {
  function doSomeStuff() {
    for (var r = 0; r < btnFieldRows; r++) {
        var btnIdsRow = [];
        btnsFieldMain.divIds.push(`div_btn_row_${r}`);
        for (var c = 0; c < btnFieldCols; c++) {
          btnIdsRow.push(`btn_${r}_${c}`);
        }
        btnsFieldMain.btnIds.push(btnIdsRow);
    }
    
    btnsFieldMain.divIds.forEach(function(divId) {
      $(`${btnsFieldMain.divMainId}`).append(getDivHTML(divId));
    });

    (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];
      btnIdsRow.forEach(function(btnId){
        var arr = btnId.split("_", 3);
        var r = parseInt(arr[1]);
        var c = parseInt(arr[2]);
        var divIdUp = "upper_div";
        var divIdDown = "lower_div";
        var divIdD2 = "div_2";

        var val = (r == btnsFieldMain.r && c == btnsFieldMain.c ? 1 : 0);
        var content = `
        <div>
          <div id="${divIdUp}" style="color: ${colorsFont[0]}; font-size: 10;">${r},${c}</div>
          <div id="${divIdDown}" style="color: ${colorsFont[0]}; font-size: 10;">0</div>
          <div id="${divIdD2}" style="color: ${colorsFont[0]}; font-size: 10;">${val}</div>
        </div>`;

        btnsFieldMain.btnsProp[btnId] = {};
        btnsFieldMain.btnsProp[btnId].r = r;
        btnsFieldMain.btnsProp[btnId].c = c;

        $(`${btnsFieldMain.divMainId} #${divId}`).append(getButtonHTML(btnId, btnProp.w, btnProp.h, btnsFieldMain.btnColors[0], content));
        var fullDivIdUp = `#${btnId} #${divIdUp}`;
        $.ensure(fullDivIdUp).then(function() {
          var $obj = $(fullDivIdUp);
          btnsFieldMain.divObjUp[btnId] = $obj;
        });

        var fullDivIdDown = `#${btnId} #${divIdDown}`;
        $.ensure(fullDivIdDown).then(function() {
          var $obj = $(fullDivIdDown);
          btnsFieldMain.divObjDown[btnId] = $obj;
        });

        var fullDivIdD2 = `#${btnId} #${divIdD2}`;
        $.ensure(fullDivIdD2).then(function() {
          var $obj = $(fullDivIdD2);
          btnsFieldMain.divObjD2[btnId] = $obj;
        });
      });
    });

    (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];

      btnIdsRow.forEach(function(btnId) {
        var fullId = `${btnsFieldMain.divMainId} #${divId} #${btnId}`;

        $.ensure(fullId).then(function() {
          var $obj = $(fullId);
          var f = function() {
            f.i = (f.i+1)%f.colorsAmount;
            var c = f.colors[f.i];
            $obj.css('background-color', c);
            var $divUp = btnsFieldMain.divObjUp[btnId];
            var $divDown = btnsFieldMain.divObjDown[btnId];
            $divUp.css("color", colorsFont[f.i]);
            $divDown.css("color", colorsFont[f.i]);
          };
          
          f.colors = btnsFieldMain.btnColors;
          f.colorsAmount = colorsAmount;
          f.i = 0;
          
          f.reset = function() {
            f.i = -1;
            f();
          }

          btnsFieldMain.fs[btnId] = f;
          btnsFieldMain.objsBtn[btnId] = $obj;
        });
      });
    });

    (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];

      btnIdsRow.forEach(function(btnId) {
        var fullId = `${btnsFieldMain.divMainId} #${divId} #${btnId}`;

        $.ensure(fullId).then(function() {
          console.log(`is going well for '${fullId}'!`);

          var ff = function() {
            ff.i = (ff.i+1) % colorsAmount;
            if (ff.up !== undefined) {
              ff.up();
            }
            if (ff.down !== undefined) {
              ff.down();
            }
            if (ff.left !== undefined) {
              ff.left();
            }
            if (ff.right !== undefined) {
              ff.right();
            }

            ff.center();

            var $divDown = btnsFieldMain.divObjDown[btnId];
            $divDown.html(`${ff.i}`);
          }
          ff.i = 0;
          ff.center = btnsFieldMain.fs[btnId];

          var btnPropNow = btnsFieldMain.btnsProp[btnId];
          var r = btnPropNow.r;
          var c = btnPropNow.c;

          if (r > 0) {
            ff.up = btnsFieldMain.fs[`btn_${r-1}_${c}`];
          }
          if (r < btnFieldRows-1) {
            ff.down = btnsFieldMain.fs[`btn_${r+1}_${c}`];
          }
          if (c > 0) {
            ff.left = btnsFieldMain.fs[`btn_${r}_${c-1}`];
          }
          if (c < btnFieldCols-1) {
            ff.right = btnsFieldMain.fs[`btn_${r}_${c+1}`];
          }
          btnsFieldMain.ffs[btnId] = ff;

          var fBtn = function() {
            // ff();
            var ff = btnsFieldMain.ffs[btnId];
            ff();

            console.log(`btnsFieldMain.divMainId: ${btnsFieldMain.divMainId}, clicked ${btnId}`);
            // var fClick = btnsFieldClick.fs[btnId];
            // fClick();
            // var fClick = btnsFieldClick.fs[btnId];
            // fClick();
          };

          fBtn.reset = function() {
            btnsFieldMain.fs[btnId].reset();
            // btnsFieldClick.fs[btnId].reset();
          }

          btnsFieldMain.fsBtn[btnId] = fBtn;
          
          var $obj = $(fullId);
          $obj.on('click', fBtn);
        });
      });
    });
  }
  $.ensure('#buttons_field').then(doSomeStuff);
}

function btnclickResetField() {
  Object.keys(btnsFieldMain.fsBtn).forEach(function(key) {
    btnsFieldMain.fsBtn[key].reset();
  });
}

function btnclickMixField() {
  Object.keys(btnsFieldMain.fsBtn).forEach(function(key) {
    var f = btnsFieldMain.fsBtn[key];
    var amount = Math.floor(Math.random()*colorsAmount);

    for (var i = 0; i < amount; i++) {
      f();
    }
  });
}

function btnclickSolveField() {
  function* h() {
    var keys = Object.keys(btnsFieldMain.fsBtn);
    console.log(`keys: ${keys}`);
    for (let key of keys) {
      console.log(`key: ${key}`);

    // Object.keys(btnsFieldMain.fsBtn).forEach(function(key) {
      var ff = btnsFieldMain.ffs[key];
      var $obj = btnsFieldMain.objsBtn[key];
      var amount = (ff.i === 0 ? 0 : colorsAmount - ff.i);

      for (var i = 0; i < amount; i++) {
        yield true;
        $obj.click();
      }
    }

    yield false;
  }

  var gen = h();
  
  async function f() {
    var r = gen.next().value;
    if (r) {
      setTimeout(f, solveSpeed);
    }
  }
  f();
}

function btnclickMixField() {
  Object.keys(btnsFieldMain.fsBtn).forEach(function(key) {
    var f = btnsFieldMain.fsBtn[key];
    var amount = Math.floor(Math.random()*colorsAmount);

    for (var i = 0; i < amount; i++) {
      f();
    }
  });
}

function btnclickDisplaySolution() {
  var $obj = $("#buttons_field_used");
  // var display = $obj.css('display');

  if (changeText) {
    // $obj.css('display', 'none');
    $obj.html("Used!");
    changeText = false;
  } else {
    // $obj.css('display', 'table');
    $obj.html("Not used!");
    changeText = true;
  }
}

function keyDown(event) {
  // console.log(`keyDown: event.keyCode: ${event.keyCode}`);
  var keyCode = event.keyCode;

  if (keyCode in pressedKeys) {
    if (pressedKeys[keyCode] === true) {
      return;
    } else {
      pressedKeys[keyCode] = true;
    }
  }

  var r = btnsFieldMain.r;
  var c = btnsFieldMain.c;
  var btnNameNow = `btn_${r}_${c}`;
  var divNow = btnsFieldMain.divObjD2[btnNameNow];

  switch (keyCode) {
    case 37: // left
      console.log("down left");
      var btnNameNew = `btn_${r}_${c-1}`;
      if (btnNameNew in btnsFieldMain.objsBtn) {
        btnsFieldMain.c -= 1;
        var divNew = btnsFieldMain.divObjD2[btnNameNew];

        divNow.html("0");
        divNew.html("1");
        btnsFieldMain.objsBtn[btnNameNew].click();
      }
      break;
    case 38: // up
      console.log("down up");
      var btnNameNew = `btn_${r-1}_${c}`;
      if (btnNameNew in btnsFieldMain.objsBtn) {
        btnsFieldMain.r -= 1;
        var divNew = btnsFieldMain.divObjD2[btnNameNew];

        divNow.html("0");
        divNew.html("1");
        btnsFieldMain.objsBtn[btnNameNew].click();
      }
      break;
    case 39: // right
      console.log("down right");
      var btnNameNew = `btn_${r}_${c+1}`;
      if (btnNameNew in btnsFieldMain.objsBtn) {
        btnsFieldMain.c += 1;
        var divNew = btnsFieldMain.divObjD2[btnNameNew];

        divNow.html("0");
        divNew.html("1");
        btnsFieldMain.objsBtn[btnNameNew].click();
      }
      break;
    case 40: // down
      console.log("down down");
      var btnNameNew = `btn_${r+1}_${c}`;
      if (btnNameNew in btnsFieldMain.objsBtn) {
        btnsFieldMain.r += 1;
        var divNew = btnsFieldMain.divObjD2[btnNameNew];

        divNow.html("0");
        divNew.html("1");
        btnsFieldMain.objsBtn[btnNameNew].click();
      }
      break;
  }
}

function keyUp(event) {
  // console.log(`keyUp: event.keyCode: ${event.keyCode}`);
  var keyCode = event.keyCode;

  if (keyCode in pressedKeys) {
    if (pressedKeys[keyCode] === false) {
      return;
    } else {
      pressedKeys[keyCode] = false;
    }
  }

  switch (keyCode) {
    case 37: // left
      console.log("up left");
      break;
    case 38: // up
      console.log("up up");
      break;
    case 39: // right
      console.log("up right");
      break;
    case 40: // down
      console.log("up down");
      break;
  }
}
