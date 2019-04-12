var btnFieldRows = 4;
var btnFieldCols = 5;

var solveSpeed = 100; // in ms

var btnProp = {
  h: 70,
  w: 70
};

var colorsAmount = 3;

var colors = [
  '#111111',
  '#eea921',
  '#b03529',
  '#7143e0'
];

var hexInvertTable = {
  '0': 'F', '1': 'E', '2': 'D', '3': 'C', '4': 'B', '5': 'A', '6': '9', '7': '8', '9': '6', '8': '7',
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

var btnsFieldMain = {
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
  divMainId: "#buttons_field",
  btnColors: colors
};

var btnsFieldClick = {
  divIds: [],
  objsBtn: {},
  btnIds: [],
  fs: {},
  fsBtn: {},
  divMainId: "#buttons_field_used",
  btnColors: colors
};

var btnsFields = {
  rows: 0,
  fieldObjs: [],
  btnRows: 3,
  btnCols: 3,
  colors:
    [
      '#820000',
      '#00cd00',
      '#b03529',
      '#7143e0'
    ]
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

function createButtonsGridClicked() {
  function doSomeStuff() {
    for (var r = 0; r < btnFieldRows; r++) {
        var btnIdsRow = [];
        btnsFieldClick.divIds.push(`div_btn_row_${r}`);
        for (var c = 0; c < btnFieldCols; c++) {
          btnIdsRow.push(`btn_${r}_${c}`);
        }
        btnsFieldClick.btnIds.push(btnIdsRow);
    }

    btnsFieldClick.divIds.forEach(function(divId) {
      $(`${btnsFieldClick.divMainId}`).append(getDivHTML(divId));
    });

    (zip([btnsFieldClick.divIds, btnsFieldClick.btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];
      btnIdsRow.forEach(function(btnId){
        $(`${btnsFieldClick.divMainId} #${divId}`).append(getButtonHTML(btnId, btnProp.w, btnProp.h, btnsFieldClick.btnColors[0], ''));
      });
    });

    (zip([btnsFieldClick.divIds, btnsFieldClick.btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];

      btnIdsRow.forEach(function(btnId) {
        var fullId = `${btnsFieldClick.divMainId} #${divId} #${btnId}`;

        $.ensure(fullId).then(function() {
          var $obj = $(fullId);
          var f = function() {
            f.i = (f.i+1)%f.colorsAmount;
            var c = f.colors[f.i];
            $obj.css('background-color', c);
            console.log(`divMainId: ${btnsFieldClick.divMainId}, clicked ${btnId}`);

            var $divDown = btnsFieldMain.divObjDown[btnId];
            //$divDown.html(`${f.i}`);
          };
          
          f.colors = btnsFieldClick.btnColors;
          f.colorsAmount = colorsAmount;
          f.i = 0;
          
          f.reset = function() {
            f.i = -1;
            f();
          }

          btnsFieldClick.fs[btnId] = f;

          var fBtn = function() {
            // var ff = btnsFieldMain.ffs[btnId];
            // ff();

            console.log(`btnsFieldClick.divMainId: ${btnsFieldClick.divMainId}, clicked ${btnId}`);
            f();
          };

          btnsFieldClick.fsBtn[btnId] = fBtn;
          
          var $obj = $(fullId);
          $obj.on('click', fBtn);
          btnsFieldClick.objsBtn[btnId] = $obj;
        });
      });
    });
  }

  $.ensure('#buttons_field').then(doSomeStuff);
}

// function createButtonsGrid() {
//   function doSomeStuff() {
//     for (var r = 0; r < btnFieldRows; r++) {
//         var btnIdsRow = [];
//         btnsFieldMain.divIds.push(`div_btn_row_${r}`);
//         for (var c = 0; c < btnFieldCols; c++) {
//           btnIdsRow.push(`btn_${r}_${c}`);
//         }
//         btnsFieldMain.btnIds.push(btnIdsRow);
//     }
//
//     btnsFieldMain.divIds.forEach(function(divId) {
//       $(`${btnsFieldMain.divMainId}`).append(getDivHTML(divId));
//     });
//
//     (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
//       divId = arr[0];
//       btnIdsRow = arr[1];
//       btnIdsRow.forEach(function(btnId){
//         var arr = btnId.split("_", 3);
//         var r = parseInt(arr[1]);
//         var c = parseInt(arr[2]);
//         var divIdUp = "upper_div";
//         var divIdDown = "lower_div";
//         var content = `
//         <div>
//           <div id="${divIdUp}" style="color: ${colorsFont[0]}">${r},${c}</div>
//           <div id="${divIdDown}" style="color: ${colorsFont[0]};">0</div>
//         </div>`;
//
//         btnsFieldMain.btnsProp[btnId] = {};
//         btnsFieldMain.btnsProp[btnId].r = r;
//         btnsFieldMain.btnsProp[btnId].c = c;
//
//         $(`${btnsFieldMain.divMainId} #${divId}`).append(getButtonHTML(btnId, btnProp.w, btnProp.h, btnsFieldMain.btnColors[0], content));
//         var fullDivIdUp = `#${btnId} #${divIdUp}`;
//         $.ensure(fullDivIdUp).then(function() {
//           var $obj = $(fullDivIdUp);
//           btnsFieldMain.divObjUp[btnId] = $obj;
//         });
//
//         var fullDivIdDown = `#${btnId} #${divIdDown}`;
//         $.ensure(fullDivIdDown).then(function() {
//           var $obj = $(fullDivIdDown);
//           btnsFieldMain.divObjDown[btnId] = $obj;
//         });
//       });
//     });
//
//     (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
//       divId = arr[0];
//       btnIdsRow = arr[1];
//
//       btnIdsRow.forEach(function(btnId) {
//         var fullId = `${btnsFieldMain.divMainId} #${divId} #${btnId}`;
//
//         $.ensure(fullId).then(function() {
//           var $obj = $(fullId);
//           var f = function() {
//             f.i = (f.i+1)%f.colorsAmount;
//             var c = f.colors[f.i];
//             $obj.css('background-color', c);
//             var $divUp = btnsFieldMain.divObjUp[btnId];
//             var $divDown = btnsFieldMain.divObjDown[btnId];
//             $divUp.css("color", colorsFont[f.i]);
//             $divDown.css("color", colorsFont[f.i]);
//           };
//
//           f.colors = btnsFieldMain.btnColors;
//           f.colorsAmount = colorsAmount;
//           f.i = 0;
//
//           f.reset = function() {
//             f.i = -1;
//             f();
//           }
//
//           btnsFieldMain.fs[btnId] = f;
//         });
//       });
//     });
//
//     (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
//       divId = arr[0];
//       btnIdsRow = arr[1];
//
//       btnIdsRow.forEach(function(btnId) {
//         var fullId = `${btnsFieldMain.divMainId} #${divId} #${btnId}`;
//
//         $.ensure(fullId).then(function() {
//           console.log(`is going well for '${fullId}'!`);
//
//           var ff = function() {
//             if (ff.up !== undefined) {
//               ff.up();
//             }
//             if (ff.down !== undefined) {
//               ff.down();
//             }
//             if (ff.left !== undefined) {
//               ff.left();
//             }
//             if (ff.right !== undefined) {
//               ff.right();
//             }
//
//             ff.center();
//           }
//           ff.center = btnsFieldMain.fs[btnId];
//
//           var btnPropNow = btnsFieldMain.btnsProp[btnId];
//           var r = btnPropNow.r;
//           var c = btnPropNow.c;
//
//           if (r > 0) {
//             ff.up = btnsFieldMain.fs[`btn_${r-1}_${c}`];
//           }
//           if (r < btnFieldRows-1) {
//             ff.down = btnsFieldMain.fs[`btn_${r+1}_${c}`];
//           }
//           if (c > 0) {
//             ff.left = btnsFieldMain.fs[`btn_${r}_${c-1}`];
//           }
//           if (c < btnFieldCols-1) {
//             ff.right = btnsFieldMain.fs[`btn_${r}_${c+1}`];
//           }
//           btnsFieldMain.ffs[btnId] = ff;
//
//           var fBtn = function() {
//             // ff();
//             var ff = btnsFieldMain.ffs[btnId];
//             ff();
//
//             console.log(`btnsFieldMain.divMainId: ${btnsFieldMain.divMainId}, clicked ${btnId}`);
//             // var fClick = btnsFieldClick.fs[btnId];
//             // fClick();
//             var fClick = btnsFieldClick.fs[btnId];
//             fClick();
//           };
//
//           fBtn.reset = function() {
//             btnsFieldMain.fs[btnId].reset();
//             btnsFieldClick.fs[btnId].reset();
//           }
//
//           btnsFieldMain.fsBtn[btnId] = fBtn;
//
//           var $obj = $(fullId);
//           $obj.on('click', fBtn);
//         });
//       });
//     });
//   }
//   $.ensure('#buttons_field').then(doSomeStuff);
// }

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
      var f = btnsFieldClick.fs[key];
      var $obj = btnsFieldClick.objsBtn[key];
      var amount = (f.i === 0 ? 0 : colorsAmount - f.i);

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

function btnclickDisplaySolution() {
  var $obj = $("#buttons_field_used");
  var display = $obj.css('display');

  if (display === 'table') {
    $obj.css('display', 'none');
  } else {
    $obj.css('display', 'table');
  }
}

function addNewBtnField() {
  function _addNewBtnField() {
    if (btnsFields.rows >= 3) {
      return;
    }

    btnsFieldRow = {
      fAddBtnField: null,
      fDeleteField: null,
      row: btnsFields.rows + 0,
      fieldRowObjs: [],
      cols: 0,
      divId: `btns_field_row_${btnsFields.rows}`
    };

    console.log(`btnsFieldRow: row: ${btnsFieldRow.row}, cols: ${btnsFieldRow.cols}`);

    var idAddButton = `add_new_field_${btnsFieldRow.row}`;
    var idDeleteButton = `delete_field_${btnsFieldRow.row}`;

    btnsFieldRow.divHtml = `
<div id="${btnsFieldRow.divId}" style="display: table-row">
  <div id="extra_buttons_${btnsFields.rows}" style="
  display: table-row;
  float: left;
  padding-top: 30px;">
    <div style="display: block;">
      ${getButtonHTML(idAddButton, 100, 60, '#DD88AA', 'Add BtnsField')}
    </div>
    <div style="display: block;">
      ${getButtonHTML(idDeleteButton, 100, 60, '#DDAA88', 'Delete BtnsField')}
    </div>
  </div>
</div>`;

    var colorsAmount = 2;

      function addNewBtnFieldInRow() {
      if (btnsFieldRow.cols >= 4) {
        return;
      }

      btnField = {
        divIds: [],
        btnIds: [],
        fsBtn: [],
        objsBtn: [],
        fs: {},
        row: btnsFieldRow.row,
        col: btnsFieldRow.cols,
        divId: `btns_field_${btnsFieldRow.row}_${btnsFieldRow.cols}`
      };

      console.log(`add btnsFieldRow: row: ${btnsFieldRow.row}, cols: ${btnsFieldRow.cols}`);
      console.log(`addNewBtnFieldInRow.rowIdx: ${addNewBtnFieldInRow.rowIdx}`);

      // var btnFieldId = `btns_field_${btnsFieldRow.row}_${btnsFieldRow.cols}`;
      var btnFieldHtml = `
        <div id="${btnField.divId}" style="
          background: #101010;
          margin: auto;
          padding: 0px;
          float: left;
          display: table;
          text-align: left;
          padding-top: 30px;
          padding-left: 10px;
          ">
        </div>`;

      $(`#${btnsFieldRow.divId}`).append(btnFieldHtml)

      // var idBtnField = `#${btnsFieldRow.divId} #${btnField.divId}`;
      // $.ensure(`#${idBtnField}`).then(function () {
      //   console.log(`now trying to add the btn field id: ${idBtnField}`);
      // }());

      // add the button field!!

      for (var r = 0; r < btnsFields.btnRows; r++) {
        var btnIdsRow = [];
        btnField.divIds.push(`div_${btnsFieldRow.row}_btn_row_${r}`);
        for (var c = 0; c < btnsFields.btnCols; c++) {
          btnIdsRow.push(`btn_${btnsFieldRow.row}_${r}_${c}`);
        }
        btnField.btnIds.push(btnIdsRow);
      }

      $.ensure(`#${btnField.divId}`).then(function () {
        // console.log(`should be there! ${btnField.divId}`);
        btnField.divIds.forEach(function (divId) {
          // console.log(`doing divId: ${divId} right now!`)
          $(`#${btnField.divId}`).append(getDivHTML(divId))
        });
      }());

      // var it = 0;
      (zip([btnField.divIds, btnField.btnIds])).forEach(function (arr) {
        divId = arr[0];
        btnIdsRow = arr[1];
        btnIdsRow.forEach(function (btnId) {
          // console.log(`divId: ${divId}, btnId: ${btnId}`);
          // console.log(`#$btnField.divId #divId: #${btnField.divId} #${divId}`);
          // $(`#${divId}`).append(getButtonHTML(btnId, 40, 30, btnsFields.colors[0], ''));
          // $(`#${btnField.divId} #${divId}`).append(`Test ${it++}`);
          $(`#${btnField.divId} #${divId}`).append(getButtonHTML(btnId, 40, 40, btnsFields.colors[0], ''));
        });
      });

      (zip([btnField.divIds, btnField.btnIds])).forEach(function (arr) {
        divId = arr[0];
        btnIdsRow = arr[1];

        btnIdsRow.forEach(function (btnId) {
          var fullId = `#${btnField.divId} #${divId} #${btnId}`;

          $.ensure(fullId).then(function () {
            var $obj = $(fullId);
            var f = function () {
              f.i = (f.i + 1) % f.colorsAmount;
              var c = f.colors[f.i];
              $obj.css('background-color', c);
              console.log(`divMainId: ${btnField.divId}, clicked ${btnId}`);

              // var $divDown = btnsFieldMain.divObjDown[btnId];
              //$divDown.html(`${f.i}`);
            };

            f.colors = btnsFields.colors;
            f.colorsAmount = colorsAmount;
            f.i = 0;

            f.reset = function () {
              f.i = -1;
              f();
            }

            btnField.fs[btnId] = f;

            var fBtn = function () {
              // var ff = btnsFieldMain.ffs[btnId];
              // ff();

              console.log(`btnField.divMainId: ${btnField.divMainId}, clicked ${btnId}`);
              f();
            };

            btnField.fsBtn[btnId] = fBtn;

            var $obj = $(fullId);
            $obj.on('click', fBtn);
            btnField.objsBtn[btnId] = $obj;
          });
        });
      });

      btnsFieldRow.fieldRowObjs.push(btnField);
      btnsFieldRow.cols++;
    }


      function deleteLastBtnFieldInRow() {

        if (btnsFieldRow.cols <= 0) {
          return;
        }
        var btnField = btnsFieldRow.fieldRowObjs.pop();

        // var btnFieldId = `btns_field_${btnsFieldRow.row}_${btnsFieldRow.cols}`;
        $(`#${btnsFieldRow.divId} #${btnField.divId}`).remove();
        btnsFieldRow.cols--;

        console.log(`delete btnField: row: ${deleteLastBtnFieldInRow.rowIdx}, col: ${btnField.col}`);
        // console.log(`delete btnField: row: ${btnField.row}, col: ${btnField.col}`);
        console.log(`deleteLastBtnFieldInRow.rowIdx: ${deleteLastBtnFieldInRow.rowIdx}`);
      }



    // var addNewBtnFieldInRow = getaddNewBtnFieldInRow();
    // var deleteLastBtnFieldInRow = getdeleteLastBtnFieldInRow();

    addNewBtnFieldInRow.rowIdx = btnsFieldRow.row;
    deleteLastBtnFieldInRow.rowIdx = btnsFieldRow.row;

    $('#buttons_field_chosen_cells').append(btnsFieldRow.divHtml);

    $.ensure(`#${btnsFieldRow.divId}`).then(function () {
      $.ensure(idAddButton).then(function () {
        $(`#${idAddButton}`).on('click', addNewBtnFieldInRow);
      }());
      $.ensure(idDeleteButton).then(function () {
        $(`#${idDeleteButton}`).on('click', deleteLastBtnFieldInRow);
      }());
    }());


    btnsFieldRow.fAddBtnField = addNewBtnFieldInRow;
    btnsFieldRow.fDeleteField = deleteLastBtnFieldInRow;

    btnsFields.fieldObjs.push(btnsFieldRow);

    btnsFields.rows++;
    console.log('Clicked at addNewBtnField() Button!');
  }

  $.ensure('buttons_field_chosen_cells').then(_addNewBtnField());
}

function deleteBtnField() {
  if (btnsFields.fieldObjs.length > 0) {
    // $.ensure(`${btnsFields.fieldObjs}`).then(function () {
      var btnsFieldRow = btnsFields.fieldObjs.pop();
      $(`#${btnsFieldRow.divId}`).remove();
      btnsFields.rows--;
    // }());
  }
}

function doSomethingWithTest() {
  console.log("TEST!");
  $.ensure('test_div').then(function () {
    console.log("test_div is there!");
    $('#test_div').append(`<div>TEST!</div>`);
  }());
}
