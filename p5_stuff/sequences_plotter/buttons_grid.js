var divIds = [];
var btnIds = [];
var fs = {};
var fsBtn = {};

function createButtonsGrid() {
  var divMainId = "#buttons_field";
  var btnColors = ['#FF0000', '#00FF00', '#0000FF']

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
    var rows = 4;
    var cols = 5;

    for (var r = 0; r < rows; r++) {
        var btnIdsRow = [];
        divIds.push(`div_btn_row_${r}`);
        for (var c = 0; c < cols; c++) {
          btnIdsRow.push(`btn_${r}_${c}`);
        }
        btnIds.push(btnIdsRow);
    }
    
    var btnProp = {
      h: 50,
      w: 50
    };

    divIds.forEach(function(divId) {
      $(`${divMainId}`).append(getDivHTML(divId));
    });

    (zip([divIds, btnIds])).forEach(function(arr) {
      divId = arr[0];
      btnIdsRow = arr[1];
      btnIdsRow.forEach(function(btnId){
        $(`${divMainId} #${divId}`).append(getButtonHTML(btnId, btnProp.w, btnProp.h, '#FF0000', ''));
      });
    });

    (zip([divIds, btnIds])).forEach(function(arr) {
    // btnIds.forEach(function(btnId) {
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
          f.colorsAmount = 2;
          f.i = 0;
          
          f.reset = function() {
            f.i = -1;
            f();
          }

          fs[btnId] = f;
        });
      });
    });

    (zip([divIds, btnIds])).forEach(function(arr) {
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
          };
          fBtn.center = fs[btnId];

          arr = btnId.split("_", 3);
          var r = parseInt(arr[1]);
          var c = parseInt(arr[2]);

          if (r > 0) {
            fBtn.up = fs[`btn_${r-1}_${c}`];
          }
          if (r < rows-1) {
            fBtn.down = fs[`btn_${r+1}_${c}`];
          }
          if (c > 0) {
            fBtn.left = fs[`btn_${r}_${c-1}`];
          }
          if (c < cols-1) {
            fBtn.right = fs[`btn_${r}_${c+1}`];
          }

          fsBtn[btnId] = fBtn;
          $obj.on('click', fBtn);
        });
      });
    });

  }
  $.ensure('#buttons_field').then(doSomeStuff);
}
