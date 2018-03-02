String.prototype.format = function()
{
    var content = this;
    for (var i=0; i < arguments.length; i++)
    {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }
    return content;
};

let canvas_size = 600;
let grid;
let color_map;
let font_color_map;
let number_map;
let size = 8;

function get_new_grid() {
    new_grid = [];
    for (let j = 0; j < size; j++) {
        arr =  [];
        for (let i = 0; i < size; i++) {
            arr[i] = 0;
        }
        new_grid[j] = arr;
    }

    return new_grid;
}

function setup() {
    createCanvas(canvas_size, canvas_size);
    background(0);

    grid = get_new_grid()

    color_map = {};
    font_color_map = {};
    number_map = {};

    let random_value = (i_min, i_max) => i_min+getRandomInt(i_max-i_min);
    var num = 2;
    for (var i = 1; i < 30; i++) {
        var r = random_value(50, 200);
        var g = random_value(50, 200);
        var b = random_value(50, 200);
        
        color_map[i] = color(r, g, b);
        font_color_map[i] = color(255-r, 255-g, 255-b); // the invert color of color_map
        number_map[i] = num;
        num *= 2;
    }

    add_one_number();
    add_one_number();
    add_one_number();
}

function draw() {
    background(0);

    draw_grid();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw_grid() {
    let w = width/size;
    stroke(255);
    strokeWeight(2);
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let value = grid[j][i];
            if (value != 0) {
                fill(color_map[value]);
                // fill(50);
            } else {
                noFill();
            }

            rect(i*w, j*w, w, w);
        }
    }
    
    let text_size = 32;
    textSize(text_size);
    textAlign(CENTER, CENTER);
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let val = grid[j][i];
            if (val != 0) {
                fill(font_color_map[val]);
                // fill(255, 255, 255);
                text(""+number_map[val], w/2+w*i, w/2+w*j);
                // text(""+grid[j][i], w/2+w*i, w/2+w*j);
            }
        }
    }
}

function add_one_number() {
    // First check if grid is full!
    var is_full = true;
    for (var j = 0; j < size; j++) {
        for (var i = 0; i < size; i++) {
            if (grid[j][i] == 0) {
                is_full = false;
                break;
            }
        }
        if (!is_full) {
            break;
        }
    }

    if (is_full) {
        return;
    }

    var i;
    var j;
    do {
        i = getRandomInt(size);
        j = getRandomInt(size);

    } while (grid[j][i] != 0);

    let r = Math.random();
    grid[j][i] = r < 0.3333 ? 1 : r < 0.6666 ? 2 : 3;
}

function check_if_grid_equal(grid1, grid2) {
    for (var j = 0; j < size; j++) {
        for (var i = 0; i < size; i++) {
            if (grid1[j][i] != grid2[j][i]) {
                return false;
            }
        }
    }

    return true;
}

function move_right(grid) {
    var moved_grid = get_new_grid();

    for (var j = 0; j < size; j++) {
        var prev_val = 0;
        var index = size-1;

        for (var i = size-1; i > -1; i--) {
            let value = grid[j][i];
            if (value != 0) {
                if (prev_val == 0) {
                    prev_val = value;
                } else if (value != prev_val) {
                    moved_grid[j][index] = prev_val;
                    prev_val = value;
                    index--;
                } else {
                    moved_grid[j][index] = value+1;
                    prev_val = 0;
                    index--;
                }
            }
        }

        if (prev_val != 0) {
            moved_grid[j][index] = prev_val;
        }
    }

    return moved_grid;
}

function move_left(grid) {
    var moved_grid = get_new_grid();

    for (var j = 0; j < size; j++) {
        var prev_val = 0;
        var index = 0;

        for (var i = 0; i < size; i++) {
            let value = grid[j][i];
            if (value != 0) {
                if (prev_val == 0) {
                    prev_val = value;
                } else if (value != prev_val) {
                    moved_grid[j][index] = prev_val;
                    prev_val = value;
                    index++;
                } else {
                    moved_grid[j][index] = value+1;
                    prev_val = 0;
                    index++;
                }
            }
        }

        if (prev_val != 0) {
            moved_grid[j][index] = prev_val;
        }
    }

    return moved_grid;
}

function move_down(grid) {
    var moved_grid = get_new_grid();

    for (var i = 0; i < size; i++) {
        var prev_val = 0;
        var index = size-1;

        for (var j = size-1; j > -1; j--) {
            let value = grid[j][i];
            if (value != 0) {
                if (prev_val == 0) {
                    prev_val = value;
                } else if (value != prev_val) {
                    moved_grid[index][i] = prev_val;
                    prev_val = value;
                    index--;
                } else {
                    moved_grid[index][i] = value+1;
                    prev_val = 0;
                    index--;
                }
            }
        }

        if (prev_val != 0) {
            moved_grid[index][i] = prev_val;
        }
    }

    return moved_grid;
}

function move_up(grid) {
    var moved_grid = get_new_grid();

    for (var i = 0; i < size; i++) {
        var prev_val = 0;
        var index = 0;

        for (var j = 0; j < size; j++) {
            let value = grid[j][i];
            if (value != 0) {
                if (prev_val == 0) {
                    prev_val = value;
                } else if (value != prev_val) {
                    moved_grid[index][i] = prev_val;
                    prev_val = value;
                    index++;
                } else {
                    moved_grid[index][i] = value+1;
                    prev_val = 0;
                    index++;
                }
            }
        }

        if (prev_val != 0) {
            moved_grid[index][i] = prev_val;
        }
    }

    return moved_grid;
}

function keyPressed() {
  var moved_grid;
  var has_moved = false;
  if (keyCode === LEFT_ARROW) {
    moved_grid = move_left(grid);
  } else if (keyCode === RIGHT_ARROW) {
    moved_grid = move_right(grid);
  } else if (keyCode === UP_ARROW) {
    moved_grid = move_up(grid);
  } else if (keyCode === DOWN_ARROW) {
    moved_grid = move_down(grid);
  }

  has_moved = !check_if_grid_equal(moved_grid, grid)

  if (has_moved) {
    grid = moved_grid;
    add_one_number();
    add_one_number();
    add_one_number();
  }
}

// function keyReleased() {
//   if (keyCode === LEFT_ARROW) {
//     grid[0][1] = 0;
//   }
// }
