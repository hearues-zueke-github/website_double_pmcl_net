var btnFieldRows = 5;
var btnFieldCols = 9;

var colorsAmount = 3;

var btnsFieldMain = {
  divIds: [],
  btnIds: [],
  fs: {},
  fsBtn: {},
  divMainId: "#buttons_field",
  btnColors: ['#111111', '#EEEE00', '#0000B0']
};

var btnsFieldClick = {
  divIds: [],
  btnIds: [],
  fs: {},
  divMainId: "#buttons_field_used",
  btnColors: ['#111111', '#EEEE00', '#0000B0']
};

var btnProp = {
  h: 50,
  w: 50
};

function createButtonsGridClicked() {
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

  function getButtonHTML(id, width, height, bgcolor, text) {
    return `
      <button id="${id}" style="
      width: ${width}px;
      height: ${height}px;
      background-color: ${bgcolor};
      ">${text}</button>
    `;
  }

  function doSomeStuff() {
    // var btnFieldRows = 4;
    // var btnFieldCols = 5;

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
    // btnsFieldClick.btnIds.forEach(function(btnId) {
      divId = arr[0];
      btnIdsRow = arr[1];

      btnIdsRow.forEach(function(btnId) {
        var fullId = `${btnsFieldClick.divMainId} #${divId} #${btnId}`;

        // console.log(`adding click event to '${fullId}'`);
        $.ensure(fullId).then(function() {
          // console.log(`is going well for '${fullId}'!`);
          var $obj = $(fullId);
          var f = function() {
            f.i = (f.i+1)%f.colorsAmount;
            var c = f.colors[f.i];
            $obj.css('background-color', c);
            console.log(`divMainId: ${btnsFieldClick.divMainId}, clicked ${btnId}`);
          };
          
          f.colors = btnsFieldClick.btnColors;
          f.colorsAmount = colorsAmount;
          // f.colorsAmount = 2;
          f.i = 0;
          
          f.reset = function() {
            f.i = -1;
            f();
          }

          // $obj.on('click', f);
          btnsFieldClick.fs[btnId] = f;
        });
      });
    });
  }

  $.ensure('#buttons_field').then(doSomeStuff);
}

function createButtonsGrid() {
  var divMainId = "#buttons_field";
  var btnColors = ['#111111', '#EEEE00', '#0000FF'];

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

  function getButtonHTML(id, width, height, bgcolor, text) {
    return `
      <button id="${id}" style="
      width: ${width}px;
      height: ${height}px;
      background-color: ${bgcolor};
      ">${text}</button>
    `;
  }

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
      $(`${divMainId}`).append(getDivHTML(divId));
    });

    (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];
      btnIdsRow.forEach(function(btnId){
        $(`${divMainId} #${divId}`).append(getButtonHTML(btnId, btnProp.w, btnProp.h, btnColors[0], ''));
      });
    });

    (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
    // btnsFieldMain.btnIds.forEach(function(btnId) {
      divId = arr[0];
      btnIdsRow = arr[1];

      btnIdsRow.forEach(function(btnId) {
        var fullId = `${divMainId} #${divId} #${btnId}`;

        // console.log(`adding click event to '${fullId}'`);
        $.ensure(fullId).then(function() {
          // console.log(`is going well for '${fullId}'!`);
          var $obj = $(fullId);
          var f = function() {
            f.i = (f.i+1)%f.colorsAmount;
            var c = f.colors[f.i];
            $obj.css('background-color', c);
          };
          
          f.colors = btnColors;
          f.colorsAmount = colorsAmount;
          // f.colorsAmount = 2;
          f.i = 0;
          
          f.reset = function() {
            f.i = -1;
            f();
          }

          btnsFieldMain.fs[btnId] = f;
        });
      });
    });

    (zip([btnsFieldMain.divIds, btnsFieldMain.btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];

      btnIdsRow.forEach(function(btnId) {
        var fullId = `${divMainId} #${divId} #${btnId}`;

        $.ensure(fullId).then(function() {
          // console.log(`is going well for '${fullId}'!`);
          var $obj = $(fullId);
          var fBtn = function() {
            if (fBtn.up !== undefined) {
              fBtn.up();
            }
            if (fBtn.down !== undefined) {
              fBtn.down();
            }
            if (fBtn.left !== undefined) {
              fBtn.left();
            }
            if (fBtn.right !== undefined) {
              fBtn.right();
            }

            fBtn.center();

            console.log(`divMainId: ${divMainId}, clicked ${btnId}`);
            btnsFieldClick.fs[btnId]();
          };
          fBtn.center = btnsFieldMain.fs[btnId];

          arr = btnId.split("_", 3);
          var r = parseInt(arr[1]);
          var c = parseInt(arr[2]);

          if (r > 0) {
            fBtn.up = btnsFieldMain.fs[`btn_${r-1}_${c}`];
          }
          if (r < btnFieldRows-1) {
            fBtn.down = btnsFieldMain.fs[`btn_${r+1}_${c}`];
          }
          if (c > 0) {
            fBtn.left = btnsFieldMain.fs[`btn_${r}_${c-1}`];
          }
          if (c < btnFieldCols-1) {
            fBtn.right = btnsFieldMain.fs[`btn_${r}_${c+1}`];
          }

          fBtn.reset = function() {
            btnsFieldMain.fs[btnId].reset();
            btnsFieldClick.fs[btnId].reset();
          }

          btnsFieldMain.fsBtn[btnId] = fBtn;
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
