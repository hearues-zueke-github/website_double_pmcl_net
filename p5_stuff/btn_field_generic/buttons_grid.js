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

function getDivHTML (id) {
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

function getDivHTMLFloatLeft (id) {
  return `
    <div id="${id}" style="
      display: table-row;
      float: left;
      margin-top: 20px;
      margin-left: 10px;
      // display: block;
      // flex-wrap: wrap;
    ">
    </div>
  `;
}

function getDivHTMLFloatLeftTable (id) {
  return `
    <div id="${id}" style="
      display: table;
      float: left;
      margin-top: 20px;
      margin-left: 10px;
      // display: block;
      // flex-wrap: wrap;
    ">
    </div>
  `;
}

function getButtonHTML (id, width, height, bgcolor, content) {
  return `
    <button id="${id}" style="
    width: ${width}px;
    height: ${height}px;
    background-color: ${bgcolor};
    ">${content}</button>
  `;
}

function addNewBtnField () {
  function _addNewBtnField () {
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

      function addNewBtnFieldInRow () {
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


      function deleteLastBtnFieldInRow () {

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

function deleteBtnField () {
  if (btnsFields.fieldObjs.length > 0) {
    // $.ensure(`${btnsFields.fieldObjs}`).then(function () {
      var btnsFieldRow = btnsFields.fieldObjs.pop();
      $(`#${btnsFieldRow.divId}`).remove();
      btnsFields.rows--;
    // }());
  }
}

class BtnObj {
  constructor (parent, col, row) {
    this.parent = parent;
    this.col = col;
    this.row = row;
    this.divId = `div_field_x${col}_y${row}`;
    this.btnId = `btn_x${col}_y${row}`;
    this.colorIdx = 0;

    var t = this;
    $.ensure(`#${this.parent.divId}`).then(function () {
      t.parent.$obj.append(getDivHTMLFloatLeft(t.divId));
    }());

    $.ensure(`#${this.parent.divId} #${this.divId}`).then(function () {
      t.$divObj = $(`#${t.parent.divId} #${t.divId}`);
      t.$divObj.append(getButtonHTML(t.btnId, 40, 40, btnProperties.colors[t.colorIdx], ''));
    }());

    $.ensure(`#${this.parent.divId} #${this.divId} #${this.btnId}`).then(function () {
      t.$btnObj = $(`#${t.parent.divId} #${t.divId} #${t.btnId}`);
      t.$btnObj.on('click', function() {
        t.colorIdx = (t.colorIdx + 1) % btnProperties.colorsInUse;
        var c = btnProperties.colors[t.colorIdx];
        t.$btnObj.css('background-color', c);
      });
      t.$btnObj.on('contextmenu', function() {
        t.colorIdx = mod(t.colorIdx - 1, btnProperties.colorsInUse);
        var c = btnProperties.colors[t.colorIdx];
        t.$btnObj.css('background-color', c);
      });
    }());
  }
}

class OneBtnField {
  constructor (parent, colField, rowField, btnsX, btnsY) {
    this.parent = parent;
    this.colField = colField;
    this.rowField = rowField;
    this.btnsX = btnsX;
    this.btnsY = btnsY;
    this.divId = `one_btn_field_x${colField}_y${rowField}`;

    this.idRows = [];
    this.$btnRows = [];

    this.idBtns = [];
    this.$btns = [];
    this.counterObjs = [];

    // background-color could be made dynamically too!
    var btnFieldHtml = `
        <div id="${this.divId}" style="
          background: #101010;
          margin: auto;
          padding: 0px;
          float: left;
          display: table;
          text-align: left;
          padding-top: 15px;
          padding-bottom: 15px;
          padding-left: 8px;
          padding-right: 5px;
          ">
        </div>`;

    var t = this;
    var useColorIdx = 1;
    var selParent = `#${this.parent.divId}`;
    $.ensure(selParent).then(function () {
      t.parent.$obj.append(btnFieldHtml);
      // t.parent.$obj.append(getDivHTMLFloatLeftTable(t.divId));
    }());

    var selThis = `${selParent} #${this.divId}`;
    $.ensure(selThis).then(function () {
      t.$obj = $(selThis);

      // now first create rows!!
      for (var row = 0; row < t.btnsY; row++) {
        var divIdRow = `row_btns_r${row}`;
        var divHtml = getDivHTML(divIdRow);

        t.$obj.append(divHtml);
        t.idRows.push(divIdRow);

        var selRow = `${selThis} #${divIdRow}`;
        $.ensure(selRow).then(function () {
          var $rowObj = $(`#${t.divId} #${divIdRow}`);
          t.$btnRows.push($rowObj);

          var idBtnsRow = [];
          var $btnsRow = [];
          var counterObjsRow = [];
          // now for each row add t.btnsX buttons!
          for (var col = 0; col < t.btnsX; col++) {
            var btnId = `btn_x${col}_y${row}`;

            $rowObj.append(getButtonHTML(btnId, 30, 30, btnProperties.colors[useColorIdx], ''));

            var counter = new function () {
              this.colorIdx = useColorIdx;
            }();
            counterObjsRow.push(counter);

            var selBtn = `${selRow} #${btnId}`;
            idBtnsRow.push(btnId);
            $.ensure(selBtn).then(function () {
              var $btnObj = $(selBtn);
              $btnsRow.push($btnObj);

              // TODO: add the BtnObj for this purpose!!!!

              var counter = counterObjsRow[col];

              $btnObj.on('click', function() {
                if (counter.colorIdx >= btnProperties.colorsInUse - 1) {
                  return;
                }
                counter.colorIdx = (counter.colorIdx + 1) % btnProperties.colorsInUse;
                var c = btnProperties.colors[counter.colorIdx];
                $btnObj.css('background-color', c);
              });

              $btnObj.on('contextmenu', function() {
                if (counter.colorIdx <= 0) {
                  return;
                }
                counter.colorIdx = mod(counter.colorIdx - 1, btnProperties.colorsInUse);
                var c = btnProperties.colors[counter.colorIdx];
                $btnObj.css('background-color', c);
              });

              // $btnObj.click();
            }());
          }

          t.idBtns.push(idBtnsRow);
          t.$btns.push($btnsRow);
          t.counterObjs.push(counterObjsRow);
        }());
      }
    }());
  }
}

class BtnObjRow {
  constructor (parent, row) {
    this.parent = parent;
    this.row = row;
    this.btnObjs = [];
    this.cols = 0;
    this.divId = `btns_field_row_${this.row}`;
    this.addBtnDivId = `add_new_field_${this.row}`;
    this.deleteBtnDivId = `delete_new_field_${this.row}`;

    var htmlContent = getAddDeleteHtmlDiv(this.row, this.divId, this.addBtnDivId, this.deleteBtnDivId);
    this.parent.$obj.append(htmlContent);

    var t = this;
    $.ensure(`#${this.divId}`).then(function() {
      t.$obj = $(`#${t.parent.divId} #${t.divId}`);
    }());

    $.ensure(`#${this.divId} #${this.addBtnDivId}`).then(function() {
      t.$addObj = $(`#${t.divId} #${t.addBtnDivId}`);
      t.$addObj.on('click', function () {
        console.log(`Clicked addObj '${t.addBtnDivId}'`);
        t.addBtnObj();
      });
    }());

    $.ensure(`#${this.divId} #${this.deleteBtnDivId}`).then(function() {
      t.$deleteObj = $(`#${t.divId} #${t.deleteBtnDivId}`);
      t.$deleteObj.on('click', function () {
        console.log(`Clicked deleteObj '${t.deleteBtnDivId}'`);
        t.popBtnObj();
      });
    }());
  }

  addBtnObj() {
    this.btnObjs.push(new OneBtnField(this, this.cols, this.row, btnProperties.btnsX, btnProperties.btnsY));
    this.cols++;
  }

  popBtnObj() {
    var obj = null;

    if (this.cols > 0) {
      obj = this.btnObjs.pop();
      this.cols--;
      obj.$obj.remove();
      // obj.$divObj.remove();
    }

    return obj;
  }
}

class BtnObjField {
  constructor (parentDivId) {
    this.divId = parentDivId;
    var t = this;
    $.ensure(`#${this.divId}`).then(function() {
      var divId = `#${t.divId}`;
      console.log(`divId: ${divId}`);
      t.$obj = $(divId);
      console.log(`got the '${t.divId}' object!`);
    }());
    this.btnObjRows = [];
    this.rows = 0;
  }

  addNewRow() {
    this.btnObjRows.push(new BtnObjRow(this, this.rows));
    this.rows++;
  }

  popRow() {
    var obj = null;

    if (this.rows > 0) {
      obj = this.btnObjRows.pop();
      this.rows--;
      obj.$obj.remove();
    }

    return obj;
  }
}

function getAddDeleteHtmlDiv (row, divId, addId, deleteId) {
  return `
<div id="${divId}" 
style="
/*display: table-row;*/
display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
white-space: nowrap;
/*width: 100%;*/
">
  <div id="extra_buttons_row_${row}" style="
  display: table-row;
  float: left;
  padding-top: 30px;">
    <div style="display: block;">
      ${getButtonHTML(addId, 100, 60, '#DD88AA', 'Add Btn\'s')}
    </div>
    <div style="display: block;">
      ${getButtonHTML(deleteId, 100, 60, '#DDAA88', 'Delete Btn\'s')}
    </div>
  </div>
</div>`;
}

class BtnFieldLambdaConverter {
  constructor (n) {
    this.n = n;
    this.size = n*2+1;
    // create empty array field first
    this.vars = Array(this.size);
    for (var i = 0; i < this.size; i++) {
      this.vars[i] = Array(this.size);
    }
    // create mapping for u, d, l, r
    this.vars[this.n][this.n] = 'p';
    for (var j = 0; j < this.n; j++) {
      var uz = 'u'.repeat(j+1);
      var dz = 'd'.repeat(j+1);
      var lz1 = 'l'.repeat(j+1);
      var rz1 = 'r'.repeat(j+1);

      this.vars[this.n-j-1][this.n] = uz;
      this.vars[this.n+j+1][this.n] = dz;
      this.vars[this.n][this.n-j-1] = lz1;
      this.vars[this.n][this.n+j+1] = rz1;
      for (var i = 0; i < this.n; i++) {
        var lz = 'l'.repeat(i+1);
        var rz = 'r'.repeat(i+1);

        this.vars[this.n-j-1][this.n-i-1] = uz+lz;
        this.vars[this.n-j-1][this.n+i+1] = uz+rz;
        this.vars[this.n+j+1][this.n-i-1] = dz+lz;
        this.vars[this.n+j+1][this.n+i+1] = dz+rz;
      }
    }
  }
}

var lambdaVars = new BtnFieldLambdaConverter(1);

var btnProperties = {
  colors: [
    '#b00000',
    '#000000',
    '#1d9700',
  ],
  colorsInUse: 3,
  btnsX: lambdaVars.size,
  btnsY: lambdaVars.size
};

var btnObjField;

function addNewBtnRow () {
  console.log('add new btn row!');

  btnObjField.addNewRow();
}

function deleteBtnRow () {
  console.log('delete btn row!');

  btnObjField.popRow();
}

function convertToLambdas () {
  var $obj = $('#div_lambda_functions');
  $obj.empty();

  // $obj.append(`<div style="color: #88FF88;">New Line!</div>`);

  var usedOrExpr = [];
  for (var j = 0; j < btnObjField.btnObjRows.length; j++) {
    var rowObj = btnObjField.btnObjRows[j];

    var usedAndExpr = [];
    for (var i = 0; i < rowObj.btnObjs.length; i++) {
      var objField = rowObj.btnObjs[i];
      usedVars = [];
      for (var j2 = 0; j2 < btnProperties.btnsY; j2++) {
        for (var i2 = 0; i2 < btnProperties.btnsX; i2++) {
          var idx = objField.counterObjs[j2][i2].colorIdx;
          if (idx == 0) {
            usedVars.push(`inv(${lambdaVars.vars[j2][i2]})`);
          } else if (idx == 2) {
            usedVars.push(lambdaVars.vars[j2][i2]);
          }
        }
      }

      if (usedVars.length > 0) {
        var andExpr = usedVars.join('&');
        usedAndExpr.push(andExpr);
      }
    }

    if (usedAndExpr.length > 0) {
      var orExpr = usedAndExpr.join('|');
      usedOrExpr.push('lambda: '+orExpr);
    } else {
      usedOrExpr.push('No inputs found!!!!');
    }
  }

  if (usedOrExpr.length > 0) {
    for (var i = 0; i < usedOrExpr.length; i++) {
      $obj.append(`<div style="color: #4ecb19;">${usedOrExpr[i]}</div>`);
      // $obj.append(`<div style="color: #15761b;">lambda expressions Nr. ${i}: <a style="color: #2ca218;">${usedOrExpr[i]}</a></div>`);
    }
  } else {
    $obj.append(`<div style="color: #ff0000;">No single lambda inputs found!!!</div>`);
  }
}

function drawOnCanvasRandomRects () {
  var canvas = document.getElementById("canvas_images_1");
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;

  var randX = getRandomInt(0, width);
  var randY = getRandomInt(0, height);
  var randW = getRandomInt(0, width-randX);
  var randH = getRandomInt(0, height-randY);

  ctx.fillStyle = getRandomColor(50, 200);
  // console.log(`randX: ${randX}, randY: ${randY}, randW: ${randW}, randH: ${randH}, ctx.fillStyle: ${ctx.fillStyle}`);
  ctx.fillRect(randX, randY, randW, randH);
}

function drawRandomPixels () {
  console.log(`calling function 'drawRandomPixels()'`);

  var canvas = document.getElementById("canvas_images_1");
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;

  var imagedata = ctx.createImageData(width, height);

  var data = imagedata.data;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var pixelindex = (y * width + x) * 4;
      data[pixelindex] = getRandomInt(0, 256);
      data[pixelindex+1] = getRandomInt(0, 256);
      data[pixelindex+2] = getRandomInt(0, 256);
      data[pixelindex+3] = 255;
    }
  }

  ctx.putImageData(imagedata, 0, 0);
  // ctx.fillStyle = getRandomColor(50, 200);
  // console.log(`randX: ${randX}, randY: ${randY}, randW: ${randW}, randH: ${randH}, ctx.fillStyle: ${ctx.fillStyle}`);
  // ctx.fillRect(randX, randY, randW, randH);
}

function downloadCanvasImage () {
  var canvas = document.getElementById("canvas_images_1");

  var image = canvas.toDataURL();
  // create temporary link
  var tmpLink = document.createElement( 'a' );
  tmpLink.download = 'image_test_123.png';
  // set the name of the download file
  tmpLink.href = image;
  // temporarily add link to body and initiate the download
  document.body.appendChild( tmpLink );
  tmpLink.click();
  document.body.removeChild( tmpLink );
}

function drawABlankCanvas () {
  var canvas = document.getElementById("canvas_images_1");
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  console.log(`width: ${width}, height: ${height}`);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

function getFrameField (height, width) {
  field = Array(height);
  for (var i = 0; i < height; i++) {
    field[i] = Array(width);
  }
  return field
}

var frames = [];
var framesField = [];
var frameIdx = 0;
var timeoutFunction = 0;

function getNewBWFrame (width, height, addText=true) {
  var canvas2 = document.getElementById("canvas_temp");
  var ctx2 = canvas2.getContext("2d");

  var idx = frames.length;
  canvas2.height = height;
  canvas2.width = width;
  var imagedata = ctx2.createImageData(width, height);

  var field = getFrameField(height, width);

  var data = imagedata.data;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var v = getRandomInt(0, 256);
      v = v < 128 ? 0 : 1;
      field[y][x] = v;
    }
  }

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var v = getRandomInt(0, 256);
      v = v < 128 ? 0 : 1;
      field[y][x] = (field[y][x] + v) % 2;
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var v = getRandomInt(0, 256);
      v = v < 128 ? 0 : 1;
      field[y][x] = (field[y][x] + v) % 2;
    }
  }

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var v = getRandomInt(0, 256);
      v = v < 128 ? 0 : 1;
      field[y][x] = (field[y][x] + v) % 2;
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var pixelindex = (y * width + x) * 4;
      // black white image!
      var v = field[y][x];
      data[pixelindex+0] = v*255; // getRandomInt(0, 256);
      data[pixelindex+1] = v*255; // getRandomInt(0, 256);
      data[pixelindex+2] = v*255; // getRandomInt(0, 256);
      data[pixelindex+3] = 255;
    }
  }

  if (addText) {
    ctx2.putImageData(imagedata, 0, 0);
    ctx2.fillStyle = '#000000FF';
    ctx2.font = "30px Arial";
    ctx2.fillText(""+(idx+1), 10, 50);
  }

  imagedata = ctx2.getImageData(0, 0, width, height);
  return [field, imagedata];
}

function addNewRandomFrames () {
  console.log(`calling function 'addNewRandomFrames ()'`);

  var canvas = document.getElementById("canvas_images_1");
  // var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;

  for (var i = 0; i < 10; i++) {
    var tuple = getNewBWFrame(width, height);
    field= tuple[0];
    imagedata = tuple[1];
    frames.push(imagedata);
  }
}

var frameTimeout = 100;

function applyNewBWLambdaFunctions () {
  console.log(`calling function 'applyNewBWLambdaFunctions ()'`);

  if (timeoutFunction) {
    clearTimeout(timeoutFunction);
  }

  var canvas = document.getElementById("canvas_images_1");
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;

  var tuple = getNewBWFrame(width, height, addText=false);
  var fieldPrev = tuple[0];
  var framePrev = tuple[1];

  // framePrev = ctx.getImageData(0, 0, width, height);
  var data = framePrev.data;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var pixelindex = (y * width + x) * 4;
      // black white image!
      var v = fieldPrev[y][x];
      data[pixelindex+0] = v*255; // getRandomInt(0, 256);
      data[pixelindex+1] = v*255; // getRandomInt(0, 256);
      data[pixelindex+2] = v*255; // getRandomInt(0, 256);
      data[pixelindex+3] = 255;
    }
  }

  ctx.putImageData(framePrev, 0, 0);
  ctx.fillStyle = '#FF0000FF';
  ctx.font = "30px Arial";
  ctx.fillText("nr.: "+(0), 20, 50);
  framePrev = ctx.getImageData(0, 0, width, height);

  frames = [];
  framesField = [];

  frames.push(framePrev);
  frames.push(framePrev);
  frames.push(framePrev);
  framesField.push(fieldPrev);
  framesField.push(fieldPrev);
  framesField.push(fieldPrev);

  var maxFrames = 14;
  for (var i = 1; i < maxFrames; i++) {
    var field = getFrameField(height, width);
    var frame = ctx.createImageData(width, height);
    var data = frame.data;
    // apply later! function: u&r&p | u&ur&p | l&dl&d&!p

    // apply function: u&r&p | u&r&p | l&d&!p
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var p = fieldPrev[y][x];
        var u, d, l, r;
        if (y-1 < 0) { u = fieldPrev[height-1][x]; } else { u = fieldPrev[y-1][x]; }
        if (y+1 > height-1) { d = fieldPrev[0][x]; } else { u = fieldPrev[y+1][x]; }
        if (x-1 < 0) { l = fieldPrev[y][width-1]; } else { l = fieldPrev[y][x-1]; }
        if (x+1 > width-1) { r = fieldPrev[y][0]; } else { r = fieldPrev[y][x+1]; }

        field[y][x] = (u&r&p | u&r&p | l&d&!p | l&u&p + 1) % 2;

        var pixelindex = (y * width + x) * 4;
        // black white image!
        var v = field[y][x];
        data[pixelindex+0] = v*255; // getRandomInt(0, 256);
        data[pixelindex+1] = v*255; // getRandomInt(0, 256);
        data[pixelindex+2] = v*255; // getRandomInt(0, 256);
        data[pixelindex+3] = 255;
      }
    }

    ctx.putImageData(frame, 0, 0);
    ctx.fillStyle = '#FF0000FF';
    ctx.font = "30px Arial";
    ctx.fillText("nr.: "+(i), 20, 50);
    frame = ctx.getImageData(0, 0, width, height);

    // frames.push(frame);

    framesField.push(field);
    frames.push(frame);

    fieldPrev = field;
    framePrev = frame;
  }

  frames.push(framePrev);
  frames.push(framePrev);
  frames.push(framePrev);
  framesField.push(fieldPrev);
  framesField.push(fieldPrev);
  framesField.push(fieldPrev);

  frameIdx = 0;
  timeoutFunction = setTimeout(doTheFrameLoop, frameTimeout);
}

// TODO: create bw random frames!

function doTheFrameLoop () {
  var canvas = document.getElementById("canvas_images_1");
  var ctx = canvas.getContext("2d");

  frameIdx = (frameIdx + 1) % frames.length;
  ctx.putImageData(frames[frameIdx], 0, 0);

  timeoutFunction = setTimeout(doTheFrameLoop, frameTimeout);
}

function startTheFrameLoop () {
  frames = [];
  frameIdx = 0;
  addNewRandomFrames();

  timeoutFunction = setTimeout(doTheFrameLoop, frameTimeout);
}

function stopTheFrameLoop () {
  if (timeoutFunction) {
    clearTimeout(timeoutFunction);
  }
}

class GifCanvases {
  constructor () {
    this.n = 0;
    // this.$obj = [];
    this.$canvases = [];
    var t = this;
    $.ensure(`#div_canvases`).then(function () {
      t.$obj = $('#div_canvases');
    });
    const a = 2;

  }
}
