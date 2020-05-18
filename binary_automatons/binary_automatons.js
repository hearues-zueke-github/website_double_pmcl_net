document.addEventListener('contextmenu', event => event.preventDefault());

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var id = ctx.createImageData(1,1); // only do this once per page
var d  = id.data;

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, c.width, c.height);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function set_random_pixel(iterations=1) {
    for (i = 0; i < iterations; ++i) {
        y = getRandomInt(0, c.height)
        x = getRandomInt(0, c.width)
        d[0] = getRandomInt(0, 256);
        d[1] = getRandomInt(0, 256);
        d[2] = getRandomInt(0, 256);
        d[3] = 255;
        ctx.putImageData(id, x, y);
    }
}

c.addEventListener('click', async function() {
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
                    // $btn.append(`b_${row}_${col}`);
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
        'row_array': row_array
    };
}

var $parent = $('div#div_canvas');
btn_fields = {}
btn_fields['btn_field_1'] = create_new_btn_field($parent, 'btn_field_1', 'btn-group-1', 'btn-group-row-1', 'btn-1', 5, 5);
btn_fields['btn_field_2'] = create_new_btn_field($parent, 'btn_field_2', 'btn-group-2', 'btn-group-row-2', 'btn-2', 7, 1);

function test_print() {
    console.log("YES! BTN is working!");
}
function test_print_2() {
    console.log("YES! BTN is working TOO!");
}

btn_fields['btn_field_1'].btn_field_array[1][2].click(test_print);
btn_fields['btn_field_1'].btn_field_array[2][4].click(async function() {
    set_random_pixel(10000);
});

btn_fields['btn_field_2'].btn_field_array[0][0].click(test_print_2);

var obj = btn_fields['btn_field_2'];
var btn_field_array = obj.btn_field_array;

btn_field_array[0][0].append('Start');
btn_field_array[1][0].append('Stop');

btn_field_array[1][0].get(0).onclick = function(){console.log("TEST12313213123!")};
btn_field_array[1][0].get(0).oncontextmenu = ()=>{console.log("GET!")};;
