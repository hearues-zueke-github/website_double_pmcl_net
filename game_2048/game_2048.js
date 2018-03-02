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
let size = 4;
let new_numbers = 2;

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

// TODO: make a highscore
// TODO: make a default color pallet
// TODO: make a default nummer map
// TODO: make button for game
// TODO: add game over, when no more moves are possible!
function setup() {
    c = createCanvas(innerWidth, innerHeight);
    // createCanvas(canvas_size, canvas_size);
    background(0);

    grid = get_new_grid()

    color_map = {};
    font_color_map = {};
    number_map = {};

    let random_value = (i_min, i_max) => i_min+getRandomInt(i_max-i_min);
    var num = 2;
    for (var i = 1; i < 30; i++) {
        var r = 50+(i*30)%150; // random_value(50, 200);
        var g = 50+(Math.floor(i/5)*30)%150; // random_value(50, 200);
        var b = 50+(Math.floor(i/5/5)*30)%150; // random_value(50, 200);
        
        color_map[i] = color(r, g, b);
        font_color_map[i] = color(255-r, 255-g, 255-b); // the invert color of color_map
        // number_map[i] = i;
        number_map[i] = num;
        num *= 2;
    }

    add_new_numbers(new_numbers);
}

function draw() {
    if (c.height != innerHeight || c.width != innerWidth) {
        // print_window_size();
        c.size(innerWidth, innerHeight)
    }

    background(0);

    draw_grid();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw_grid() {
    let grid_w = 0;
    let grid_w_proc = 0.8;

    let offset_x = 0;
    let offset_y = 0;
    let w = (c.width*grid_w_proc)/size;
    let h = (c.height*grid_w_proc)/size;
    
    let offset_x_back2 = 0;
    let offset_y_back2 = 0;
    let offset_w_back2 = 0;
    let offset_h_back2 = 0;

    if (c.width > c.height) {
        grid_w = Math.floor(c.height*grid_w_proc);
        offset_y = (c.height-grid_w) / 2;
        offset_x = (c.width-c.height) / 2 + offset_y;
        w = h;
    } else {
        grid_w = Math.floor(c.width*grid_w_proc);
        offset_x = (c.width-grid_w) / 2;
        offset_y = (c.height-c.width) / 2 + offset_x;
        h = w;
    }

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

            rect(offset_x+i*w, offset_y+j*h, w, h);
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
                text(""+number_map[val], offset_x+w/2+w*i, offset_y+h/2+h*j);
                // text(""+grid[j][i], w/2+w*i, w/2+w*j);
            }
        }
    }
}

function add_new_numbers(size_new_numbers) {
    var free_spaces = 0;
    for (var j = 0; j < size; j++) {
        for (var i = 0; i < size; i++) {
            if (grid[j][i] == 0) {
                free_spaces++;
                if (free_spaces >= size_new_numbers) {
                    break;
                }
            }
        }
        if (free_spaces >= size_new_numbers) {
            break;
        }
    }

    for (var k = 0; k < free_spaces; k++) {
        var i;
        var j;
        do {
            i = getRandomInt(size);
            j = getRandomInt(size);
        } while (grid[j][i] != 0);

        let r = Math.random();
        grid[j][i] = r < 0.5 ? 1 : 2;
    }
    // grid[j][i] = r < 0.3333 ? 1 : r < 0.6666 ? 2 : 3;
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

function move_numbers_right(grid) {
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

function move_numbers_left(grid) {
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

function move_numbers_down(grid) {
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

function move_numbers_up(grid) {
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
    moved_grid = move_numbers_left(grid);
  } else if (keyCode === RIGHT_ARROW) {
    moved_grid = move_numbers_right(grid);
  } else if (keyCode === UP_ARROW) {
    moved_grid = move_numbers_up(grid);
  } else if (keyCode === DOWN_ARROW) {
    moved_grid = move_numbers_down(grid);
  }

  has_moved = !check_if_grid_equal(moved_grid, grid)

  if (has_moved) {
    grid = moved_grid;
    add_new_numbers(new_numbers);
  }
}

// function keyReleased() {
//   if (keyCode === LEFT_ARROW) {
//     grid[0][1] = 0;
//   }
// }
