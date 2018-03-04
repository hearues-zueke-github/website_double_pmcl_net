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
let grid_nums;
let grid_cells;
let color_map;
let font_color_map;
let number_map;
let size = 5;
let new_numbers = 2;

let back2_w_proc = 0.8;
let grid_w_proc = 0.8;

let grid = {};
grid.x = 0;
grid.y = 0;
grid.w = 0;
grid.h = 0;

let back2 = {};
back2.x = 0;
back2.y = 0;
back2.w = 0;
back2.h = 0;
back2.draw_rect = () => {
    fill(color(0, 102, 204));
    noStroke();
    rect(back2.x, back2.y, back2.w, back2.h);
};

let score;

let round = 0;

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

function get_new_grid_cells() {
    let get_new_cell = (j, i) => new function() {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.text_x =  0;
        this.text_y =  0;

        this.draw_cell = function() {
            let val = grid_nums[j][i];

            fill(color_map[val]);
            stroke(255);
            strokeWeight(2);
            rect(this.x, this.y, this.w, this.h);
            
            // if (j == 0 && i == 0) {
            //     console.log("In the draw_cell function! j:"+j+", i: "+i+", val: "+val);
            // }

            let num = number_map[val];
            if (val != 0) {
                var text_size_factor;
                if (num < 1000) {
                    text_size_factor = 26;
                } else if (num < 100000) {
                    text_size_factor = 18;
                } else {
                    text_size_factor = 14;
                }
                stroke(255);
                strokeWeight(1);
                textSize(Math.floor(text_size_factor*this.w/60));
                textAlign(CENTER, CENTER);
                fill(font_color_map[val]);
                text(num, this.text_x, this.text_y);
            }
        }
    }();

    new_grid = [];
    for (let j = 0; j < size; j++) {
        arr =  [];
        for (let i = 0; i < size; i++) {
            arr[i] = get_new_cell(j, i);
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

    grid_nums = get_new_grid();
    grid_cells = get_new_grid_cells();
    score = 0;

    color_map = {};
    font_color_map = {};
    number_map = {};

    number_map[0] = 0;
    color_map[0] = color(0);

    set_positions();

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
    frameRate(40);
}

function set_positions() {
    back2.h = c.height;
    back2.w = back2.h*back2_w_proc;
    if (back2.w < c.width) {
        back2.x = (c.width-back2.w) / 2;
        back2.y = 0;
    } else {
        back2.w = c.width;
        back2.h = back2.w/back2_w_proc;

        back2.x = 0;
        back2.y = (c.height-back2.h) / 2;
    }

    grid.w = Math.floor(back2.w*grid_w_proc);
    grid.h = grid.w;
    let left_space = (back2.w-grid.w)/2
    grid.y = back2.y+back2.h-grid.w-left_space;
    grid.x = back2.x+left_space;
    
    let w = grid.w/size;
    let h = grid.h/size;

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let cell = grid_cells[j][i];
            cell.x = grid.x+i*w;
            cell.y = grid.y+j*h;
            cell.w = w;
            cell.h = h;
            cell.text_x = grid.x+w/2+w*i;
            cell.text_y = grid.y+h/2+h*j;
        }
    } 
}

function draw() {
    if (c.height != innerHeight || c.width != innerWidth) {
        c.size(innerWidth, innerHeight);

        set_positions();
    }

    background(0);

    back2.draw_rect();

    draw_score();

    draw_grid();

    //if (round % 25 == 0) {
    //    key = "E";
    //    keyCode = 69;
    //    keyPressed();
    //} else if (round % 25 == 5) {
    //    keyCode = 38;
    //    keyPressed();
    //} else if (round % 5 == 0) {
    //    keyCode = 39;
    //    keyPressed();
    //}
    //
    //round = (round+1) % 25;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw_score() {

}

function draw_grid() {
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            grid_cells[j][i].draw_cell();
        }
    }
}

function add_new_numbers(size_new_numbers) {
    var free_spaces = 0;
    for (var j = 0; j < size; j++) {
        for (var i = 0; i < size; i++) {
            if (grid_nums[j][i] == 0) {
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
        } while (grid_nums[j][i] != 0);


        let r = Math.random();
        grid_nums[j][i] = r < 0.7 ? 1 : 2;

    }
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

function sort_horizontal(grid_nums) {
    // let compare = (a, b) => { a - b; };
    // console.log("compare: "+compare);
    for (var j = 0; j < size; j++) {
        grid_nums[j].sort(function(a, b) {return a-b;});
    }
}

function move_numbers_right(grid_nums) {
    var moved_grid = get_new_grid();

    for (var j = 0; j < size; j++) {
        var prev_val = 0;
        var index = size-1;

        for (var i = size-1; i > -1; i--) {
            let value = grid_nums[j][i];
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

function move_numbers_left(grid_nums) {
    var moved_grid = get_new_grid();

    for (var j = 0; j < size; j++) {
        var prev_val = 0;
        var index = 0;

        for (var i = 0; i < size; i++) {
            let value = grid_nums[j][i];
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

function move_numbers_down(grid_nums) {
    var moved_grid = get_new_grid();

    for (var i = 0; i < size; i++) {
        var prev_val = 0;
        var index = size-1;

        for (var j = size-1; j > -1; j--) {
            let value = grid_nums[j][i];
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

function move_numbers_up(grid_nums) {
    var moved_grid = get_new_grid();

    for (var i = 0; i < size; i++) {
        var prev_val = 0;
        var index = 0;

        for (var j = 0; j < size; j++) {
            let value = grid_nums[j][i];
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
  // console.log("keyPressed: keyCode: "+keyCode);
  if (keyCode === LEFT_ARROW) {
    moved_grid = move_numbers_left(grid_nums);
  } else if (keyCode === RIGHT_ARROW) {
    moved_grid = move_numbers_right(grid_nums);
  } else if (keyCode === UP_ARROW) {
    moved_grid = move_numbers_up(grid_nums);
  } else if (keyCode === DOWN_ARROW) {
    moved_grid = move_numbers_down(grid_nums);
  } else {
    if (key == "E") {
        sort_horizontal(grid_nums);
    }
    return;
  }

  has_moved = !check_if_grid_equal(moved_grid, grid_nums)

  if (has_moved) {
    grid_nums = moved_grid;
    add_new_numbers(new_numbers);
  }
}

// function keyReleased() {
//   if (keyCode === LEFT_ARROW) {
//     grid_nums[0][1] = 0;
//   }
// }
