document.addEventListener('contextmenu', event => event.preventDefault());

var canv = document.getElementById("myCanvas");
var canv_ctx = canv.getContext("2d");

canv_ctx.fillStyle = "blue";
canv_ctx.fillRect(0, 0, canv.width, canv.height);

var id = canv_ctx.createImageData(1, 1); // only do this once per page
var d = id.data;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function set_random_pixel(iterations = 1) {
  for (i = 0; i < iterations; ++i) {
    y = getRandomInt(0, canv.height)
    x = getRandomInt(0, canv.width)
    d[0] = getRandomInt(0, 256);
    d[1] = getRandomInt(0, 256);
    d[2] = getRandomInt(0, 256);
    d[3] = 255;
    canv_ctx.putImageData(id, x, y);
  }
}

canv.addEventListener('click', async function () {
  set_random_pixel(10000);
}, false);

function create_new_btn_field($parent, btn_field_id, class_btn_group, class_btn_group_row, class_btn, rows, cols) {
  var $div_btn_field = $(`<div id="${btn_field_id}" class="unselectable ${class_btn_group}"></div>`);
  $parent.append($div_btn_field);

  btn_field_array = []
  row_array = []

  function create_btn_field_rows($div_btn_field, rows, cols) {
    for (var row = 0; row < rows; ++row) {
      var id_btn_field_row = `btn_field_r${row}`;
      var $btn_field_row = $(`<div id="${id_btn_field_row}" class="unselectable ${class_btn_group_row}"></div>`);
      $div_btn_field.append($btn_field_row);

      btn_field_array_row = []

      function create_btn_field_row_btns($btn_field_row, row, cols) {
        for (col = 0; col < cols; ++col) {
          var id_btn_field_row_btn = `btn_${row}_${col}`;
          var $btn = $(`<button id="${id_btn_field_row_btn}" class="unselectable ${class_btn}" type="button"></button>`);
          $btn_field_row.append($btn);
          btn_field_array_row.push($btn);
        }
      }

      create_btn_field_row_btns($btn_field_row, row, cols);
      btn_field_array.push(btn_field_array_row);
      row_array.push($btn_field_row);
    }
  }

  create_btn_field_rows($div_btn_field, rows, cols)

  return {
    'btn_field_array': btn_field_array,
    'row_array': row_array,
  };
}

var $parent = $('div#div_canvas');
btn_fields = {}
btn_fields['btn_field_1'] = create_new_btn_field($parent, 'btn_field_1', 'btn-group-1', 'btn-group-row-1', 'btn-1', 5, 5);
btn_fields['btn_field_2'] = create_new_btn_field($parent, 'btn_field_2', 'btn-group-2', 'btn-group-row-2', 'btn-2', 7, 1);

var obj = btn_fields['btn_field_2'];
var btn_field_array = obj.btn_field_array;

btn_field_array[0][0].get(0).append('Start');
btn_field_array[1][0].get(0).append('Stop');
btn_field_array[2][0].get(0).append('Incr. Width');
btn_field_array[3][0].get(0).append('Decr. Width');

function increase_canvas_width() {
  var width = canv.width;
  if (width >= 300) {
    return;
  }

  width += 10;
  canv.width = width;

  canv_ctx.fillStyle = "#00FF00";
  canv_ctx.fillRect(0, 0, canv.width, canv.height);
}

function decrease_canvas_width() {
  var width = canv.width;
  if (width <= 100) {
    return;
  }

  width -= 10;
  canv.width = width;

  canv_ctx.fillStyle = "#FF0000";
  canv_ctx.fillRect(0, 0, canv.width, canv.height);
}

btn_field_array[2][0].get(0).onclick = increase_canvas_width;
btn_field_array[3][0].get(0).onclick = decrease_canvas_width;


var btn_colors = [
  '#c20b0b',
  '#1212b6',
  '#10a310',
];
var variables = {
  btn_colors: btn_colors,
};

var name_of_field_val = 'btn_field_1';
var btn_field_array = btn_fields['btn_field_1'].btn_field_array;

var field_val_1 = [];
for (var y = 0; y < btn_field_array.length; ++y) {
  field_val_1_row = [];
  for (var x = 0; x < btn_field_array[y].length; ++x) {
    field_val_1_row.push(0);
  }
  field_val_1.push(field_val_1_row);
}
var fields_val = {
  btn_field_1: field_val_1,
}

var used_field_val = fields_val[name_of_field_val];
var btn_field_array_obj = [];
for (var row = 0; row < btn_field_array.length; ++row) {
  var btn_field_array_row = btn_field_array[row];
  var btn_field_array_obj_row = [];
  for (var col = 0; col < btn_field_array_row.length; ++col) {
    var $btn = btn_field_array_row[col];
    var btn = $btn.get(0);
    // console.log(btn);

    var obj = {
      row: row, col: col, state: 1,
    };
    btn_field_array_obj_row.push(obj);

    (function (btn, used_field_val) {
      btn.obj = obj;

      btn.oncontextmenu = () => {
        var obj = btn.obj;
        if (obj.state == 0) {
          return;
        }
        --obj.state;
        btn.style.backgroundColor = variables.btn_colors[obj.state];
        used_field_val[obj.row][obj.col] = obj.state - 1;
      };

      btn.onclick = () => {
        var obj = btn.obj;
        if (obj.state == 2) {
          return;
        }
        ++obj.state;
        btn.style.backgroundColor = variables.btn_colors[obj.state];
        used_field_val[obj.row][obj.col] = obj.state - 1;
      };

      btn.style.backgroundColor = variables.btn_colors[1];
    }(btn, used_field_val));
  }
  btn_field_array_obj.push(btn_field_array_obj_row);
}
