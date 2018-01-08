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

var canvas;

var buttons;
var buttons_value;
var buttons_back_colors = ["#FF0000", "#00FF00"];
var buttons_font_colors = ["#FFFFFF", "#000000"];
var buttons_width = 30;
var buttons_height = 20;

var all_buttons = {};

var field;

function Field(rows, cols, tile_width, tile_height) {
    this.colors = ["#222222", "#44FF88"];
    this.rows = rows;
    this.cols = cols;
    this.tile_width = tile_width;
    this.tile_height = tile_height;
    this.grid = null;
    this.grid_prev = null;
    this.grid_diff = null;

    this.timer = 0;

    this.init_grid = function() {
        this.grid = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols);
        }

        this.grid_prev = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.grid_prev[i] = new Array(this.cols);
        }

        this.grid_diff = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.grid_diff[i] = new Array(this.cols);
        }

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r >= this.rows/4) && (r < this.rows*3/4) &&
                    (c >= this.cols/4) && (c < this.cols*3/4)) {
                    this.grid[r][c] = getRandomInt(0, 1);
                } else {
                    this.grid[r][c] = 0;
                }
            }
        }

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.grid_prev[r][c] = this.grid[r][c];
                this.grid_diff[r][c] = 0;
            }
        }
    }

    this.move_rows_right = function() {
        for (let r = 0; r < this.rows; r++) {
            let t = this.grid[r][this.cols-1];
            for (let c = this.cols; c > 1; c--) {
                this.grid[r][c-1] = this.grid[r][c-2];
            }
            this.grid[r][0] = t;
        }
    }

    this.move_rows_left = function() {
        for (let r = 0; r < this.rows; r++) {
            let t = this.grid[r][0];
            for (let c = 0; c < this.cols-1; c++) {
                this.grid[r][c] = this.grid[r][c+1];
            }
            this.grid[r][this.cols-1] = t;
        }
    }

    this.move_rows_down = function() {
        for (let c = 0; c < this.cols; c++) {
            let t = this.grid[this.rows-1][c];
            for (let r = this.rows; r > 1; r--) {
                this.grid[r-1][c] = this.grid[r-2][c];
            }
            this.grid[0][c] = t;
        }
    }

    this.move_rows_up = function() {
        for (let c = 0; c < this.cols; c++) {
            let t = this.grid[0][c];
            for (let r = 0; r < this.rows-1; r++) {
                this.grid[r][c] = this.grid[r+1][c];
            }
            this.grid[this.rows-1][c] = t;
        }
    }

    this.do_one_conway_of_livfe_cycle = function() {
        let new_grid = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            new_grid[i] = new Array(this.cols);
        }

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                new_grid[r][c] = 0;
            }
        }

        for (let r = 1; r < this.rows+1; r++) {
            for (let c = 1; c < this.cols+1; c++) {
                let val = this.grid[r % this.rows][c % this.cols];

                new_grid[(r + 1) % this.rows][c % this.cols] += val;
                new_grid[(r - 1) % this.rows][c % this.cols] += val;
                new_grid[r % this.rows][(c + 1) % this.cols] += val;
                new_grid[r % this.rows][(c - 1) % this.cols] += val;

                new_grid[(r + 1) % this.rows][(c + 1) % this.cols] += val;
                new_grid[(r + 1) % this.rows][(c - 1) % this.cols] += val;
                new_grid[(r - 1) % this.rows][(c + 1) % this.cols] += val;
                new_grid[(r - 1) % this.rows][(c - 1) % this.cols] += val;
            }
        }

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.grid_prev[r][c] = this.grid[r][c];
            }
        }

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let val = new_grid[r][c];

                if (buttons_value[val] == 1) {
                    this.grid[r][c] = 1;
                } else {
                    this.grid[r][c] = 0;
                }
            }
        }

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.grid_diff[r][c] = (this.grid[r][c] + this.grid_prev[r][c]) % 2;
            }
        }

        this.timer = (this.timer+1) % 2;
    }

    this.draw_field = function() {
        translate((width-this.tile_width*this.cols)/2, (height-this.tile_height*this.rows)/2);

        noStroke();
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                fill(this.colors[this.grid[r][c]]);
                //fill(this.colors[(this.grid[r][c]+this.timer)%2]);
                //fill(this.colors[this.grid_diff[r][c]]);
                rect(this.tile_width*c, this.tile_height*r, this.tile_width, this.tile_height);
            }
        }
    }

    this.init_grid();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

function change_button_color(idx) {
    function change() {
        let v = buttons_value[idx];
        v = (v+1) % 2;

        buttons[idx].style("background-color", buttons_back_colors[v]);
        buttons[idx].style("color", buttons_font_colors[v]);
        buttons_value[idx] = v;
    }

    return change;
}

//function get_

function setup() {
    canvas = createCanvas(600, 600);
    frameRate(10);

    buttons = new Array(9);
    buttons_value = new Array(9);
    for (let i = 0; i < 9; i++) {
        buttons[i] = createButton(i);
        let pos = canvas.position();
        buttons[i].position(pos.x+0, pos.y+buttons_height*i);

        buttons[i].mousePressed(change_button_color(i));
        buttons_value[i] = 0;
        buttons[i].style("background-color", buttons_back_colors[0]);
        buttons[i].style("color", buttons_font_colors[0]);
        buttons[i].style("border-style", "none");
        buttons[i].style("width", buttons_width+"px");
        buttons[i].style("height", buttons_height+"px");
    }

    change_button_color(3)();
    change_button_color(4)();

    field = new Field(80, 80, 5, 5);
}

function print_grid(grid, rows, cols, x, y, color) {
    //fill("#FF00FF");
    fill(color);
    textSize(12);
    textFont("monospace");

    translate(0, 0);
    //rectMode(CORNER);
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            text(grid[j][i], x+10*i, y+12*j)
        }
    }
}

function position_buttons() {
    let pos = canvas.position();

    for (let i = 0; i < 9; i++) {
        buttons[i].position(pos.x + 0, pos.y + buttons_height * i);
    }
}

function draw() {
    //change_button_color(0)();

    background(0);
    position_buttons();

    field.draw_field();
    field.do_one_conway_of_livfe_cycle();
}
