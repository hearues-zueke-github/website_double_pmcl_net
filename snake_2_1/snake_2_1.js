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

var snake;

var frames = 0;

var c;
var ratio_h_w = 1.2;

var x_game_field = 0;
var y_game_field = 0;
var w_game_field = 0;
var h_game_field = 0;

var text_game_over = "Game Over!";
var text_game_over_color;
var text_size = 0;
var text_size_max = 80;

var is_game_over = false;
var is_centered = true;

var block_width = 0;
var frame_x = 30;
var frame_y = 40;
var frame_x_offset = 0;
var frame_y_offset = 50;

var amount_x = 15;
var amount_y = 15;
var ratio_width_block = 0.06;

function setup() {
    frameRate(15);
    c = createCanvas(innerWidth, innerHeight);

    text_game_over_color = color(0x30, 0x82, 0xD0);

    updateGameField();

    snake = new Snake(frame_x, frame_y, block_width, amount_x-2, amount_y-2);
}

function draw() {
    if (c.height != innerHeight || c.width != innerWidth) {
        c.size(innerWidth, innerHeight);

        updateGameField();
        snake.updateSizes(frame_x, frame_y, block_width);
    }

    // Real background
    background(51);
    // Forground of game
    fill(0x00, 0x60, 0x00);
    rect(x_game_field, y_game_field, w_game_field, h_game_field);

    fill(0x30, 0x80, 0xA0);
    for (var i = 0; i < amount_x; i+=1) {
        rect(frame_x+block_width*i, frame_y, block_width, block_width);
    }
    for (var i = 0; i < amount_x; i+=1) {
        rect(frame_x+block_width*i, frame_y+block_width*(amount_y-1), block_width, block_width);
    }
    for (var i = 1; i < amount_y-1; i+=1) {
        rect(frame_x, frame_y+block_width*i, block_width, block_width);
    }
    for (var i = 1; i < amount_y-1; i+=1) {
        rect(frame_x + block_width * (amount_x - 1), frame_y + block_width * i, block_width, block_width);
    }

    frames += 1;
    snake.update();
    snake.debugOutput();
    if (is_game_over) {
        text_size += 3;
        fill(text_game_over_color);
        textSize(text_size);
        textFont("Helvetica");
        text(text_game_over, x_game_field+w_game_field/2-text_size*2.8, y_game_field+h_game_field/2+text_size*0.4);
        if (text_size >= text_size_max) {
            text_size = 0;
            snake.resetGame();
            is_game_over = false;
        }
    }
}

function updateGameField() {
    if (c.width * ratio_h_w < c.height) {
        x_game_field = 0;
        y_game_field = (c.height - c.width * ratio_h_w) / 2;
        w_game_field = c.width;
        h_game_field = c.width * ratio_h_w;
    } else {
        x_game_field = (c.width - c.height / ratio_h_w) / 2;
        y_game_field = 0;
        w_game_field = c.height / ratio_h_w;
        h_game_field = c.height;
    }

    block_width = w_game_field <= h_game_field ? w_game_field*ratio_width_block : h_game_field*ratio_width_block;

    if (is_centered) {
        frame_x = (w_game_field-amount_x*block_width)/2+x_game_field+frame_x_offset;
        frame_y = (h_game_field-amount_y*block_width)/2+y_game_field+frame_y_offset;
    } else {
        frame_x = frame_x_offset;
        frame_y = frame_y_offset;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function padZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function Snake(x_game_field, y_game_field, block_width, amount_x, amount_y) {
    this.dirs = {U: [0, -1], D: [0, 1], R: [1, 0], L: [-1, 0]};
    this.xspeed = 1;
    this.yspeed = 0;

    this.tail = [[0, 0]];
    this.turn_allow = true;

    this.head_color = color(0x80, 0x90, 0x50);
    this.tail_color = color(0x10, 0x90, 0x30);
    this.food_color = color(0xB0, 0x70, 0xA0);
    this.super_food_color = color(0xF0, 0x40, 0x50);
    this.mega_food_color = color(0xFF, 0x10, 0x20);

    this.super_food_counter_max = 2;
    this.super_food_counter = this.super_food_counter_max;

    this.mega_food_counter_max = 2;
    this.mega_food_counter = this.mega_food_counter_max;

    this.food_not_consumed = 0;
    this.food_weight = 1;
    this.super_food_weight = 3;
    this.mega_food_weight = 8;

    this.is_super_food_active = false;
    this.is_mega_food_active = false;

    this.x_head = 1;
    this.y_head = 0;
    this.x_food = getRandomInt(0, amount_x-1);
    this.y_food = getRandomInt(0, amount_y-1);
    this.x_super_food = getRandomInt(0, amount_x-1);
    this.y_super_food = getRandomInt(0, amount_y-1);
    this.x_mega_food = getRandomInt(0, amount_x-1);
    this.y_mega_food = getRandomInt(0, amount_y-1);

    this.x_field = x_game_field+block_width;
    this.y_field = y_game_field+block_width;

    this.block_width = block_width;

    this.amount_x = amount_x;
    this.amount_y = amount_y;

    this.updateSizes = function(x_game_field, y_game_field, block_width) {
        this.x_field = x_game_field+block_width;
        this.y_field = y_game_field+block_width;
        this.block_width = block_width;
    }

    this.debugOutput = function() {
        fill(0xFF, 0x00, 0xFF);
        textSize(12);
        textFont("monospace");

        var y_line = 0;
        var y_space_size = 15;
        text("x_head:         , y_head:       ", 10, 20+y_space_size*y_line); y_line++;
        text("x_food:         , y_food:       ", 10, 20+y_space_size*y_line); y_line++;
        text("x_super_food:   , y_super_food:   , is_super_food_acitve: ", 10, 20+y_space_size*y_line); y_line++;
        text("x_mega_food:    , y_mega_food:    , is_mega_food_acitve:  ", 10, 20+y_space_size*y_line); y_line++;
        fill(0xFF, 0xFF, 0x00);
        var x_column = 111;
        y_line = 0;
        text(padZeros(this.x_head, 2), x_column, 20+y_space_size*y_line); y_line++;
        text(padZeros(this.x_food, 2), x_column, 20+y_space_size*y_line); y_line++;
        text(padZeros(this.x_super_food, 2), x_column, 20+y_space_size*y_line); y_line++;
        text(padZeros(this.x_mega_food, 2), x_column, 20+y_space_size*y_line); y_line++;

        x_column = 241;
        y_line = 0;
        text(padZeros(this.y_head, 2), x_column, 20+y_space_size*y_line); y_line++;
        text(padZeros(this.y_food, 2), x_column, 20+y_space_size*y_line); y_line++;
        text(padZeros(this.y_super_food, 2), x_column, 20+y_space_size*y_line); y_line++;
        text(padZeros(this.y_mega_food, 2), x_column, 20+y_space_size*y_line); y_line++;

        x_column = 429;
        y_line = 2;
        text(padZeros(this.is_super_food_active, 2), x_column, 20+y_space_size*y_line); y_line++;
        text(padZeros(this.is_mega_food_active, 2), x_column, 20+y_space_size*y_line); y_line++;
    }

    this.moveSnake = function() {
        var x_head_prev = this.x_head;
        var y_head_prev = this.y_head;

        var new_x = x_head_prev+this.xspeed;
        var new_y = y_head_prev+this.yspeed;

        new_x = new_x >= 0 ? (new_x < this.amount_x ? new_x : this.amount_x - 1) : 0;
        new_y = new_y >= 0 ? (new_y < this.amount_y ? new_y : this.amount_y - 1) : 0;

        // console.log("new_x: "+new_x+", new_y: "+new_y);
        for (var i = 0; i < this.tail.length-1; i++) {
            // console.log("i: "+i+", tail x: "+this.tail[i][0]+", tail y: "+this.tail[i][1]);
            if ((new_x == this.tail[i][0]) && (new_y == this.tail[i][1])) {
                this.turn_allow = true;
                is_game_over = true;
                return;
            }
        }

        if (this.food_not_consumed > 0) {
            if ((new_x == this.tail[this.tail.length-1][0]) && (new_y == this.tail[this.tail.length-1][1])) {
                this.turn_allow = true;
                return;
            }
        }

        this.x_head = new_x;
        this.y_head = new_y;
        this.turn_allow = true;

        if (this.x_head != x_head_prev || this.y_head != y_head_prev) {
            var last_tail = this.tail[this.tail.length-1];
            var x_last_tail = last_tail[0];
            var y_last_tail = last_tail[1];

            for (var i = this.tail.length; i > 1; i--) {
                this.tail[i - 1] = this.tail[i - 2];
            }
            this.tail[0] = [x_head_prev, y_head_prev];

            if (this.x_food == this.x_head && this.y_food == this.y_head) {
                this.food_not_consumed += this.food_weight;
                do {
                    this.x_food = getRandomInt(0, amount_x - 1);
                    this.y_food = getRandomInt(0, amount_y - 1);

                    if (this.x_food == this.x_head && this.y_food == this.y_head) {
                        continue;
                    }
                    for (var i = 0; i < this.tail.length; i++) {
                        if (this.x_food == this.tail[i][0] && this.y_food == this.tail[i][1]) {
                            continue;
                        }
                    }
                } while (false);
                this.super_food_counter -= 1;
                if (this.super_food_counter <= 0) {
                    this.super_food_counter = this.super_food_counter_max;
                    this.is_super_food_active = true;
                }
            }

            if (this.x_super_food == this.x_head && this.y_super_food == this.y_head && this.is_super_food_active) {
                this.is_super_food_active = false;
                this.food_not_consumed += this.super_food_weight;
                this.x_super_food = getRandomInt(0, amount_x - 1);
                this.y_super_food = getRandomInt(0, amount_y - 1);
                this.mega_food_counter -= 1;
                if (this.mega_food_counter <= 0) {
                    this.mega_food_counter = this.mega_food_counter_max;
                    this.is_mega_food_active = true;
                }
            }

            if (this.x_mega_food == this.x_head && this.y_mega_food == this.y_head && this.is_mega_food_active) {
                this.is_mega_food_active = false;
                this.food_not_consumed += this.mega_food_weight;
                this.x_mega_food = getRandomInt(0, amount_x - 1);
                this.y_mega_food = getRandomInt(0, amount_y - 1);
            }

            if (this.food_not_consumed > 0) {
                this.food_not_consumed -= 1;
                this.tail.push([x_last_tail, y_last_tail]);
            }
        } else {
            is_game_over = true;
            // this.resetGame();
        }
    }

    this.update = function() {
        if (!is_game_over && frames % 2 == 0) {
            this.moveSnake();
        }

        fill(this.tail_color);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.x_field+this.tail[i][0]*this.block_width, this.y_field+this.tail[i][1]*this.block_width, this.block_width, this.block_width);
        }

        fill(this.food_color);
        rect(this.x_field+this.x_food*this.block_width, this.y_field+this.y_food*this.block_width, this.block_width, this.block_width);

        if (this.is_super_food_active) {
            fill(this.super_food_color);
            rect(this.x_field+this.x_super_food*this.block_width, this.y_field+this.y_super_food*this.block_width, this.block_width, this.block_width);
        }

        if (this.is_mega_food_active) {
            fill(this.mega_food_color);
            rect(this.x_field+this.x_mega_food*this.block_width, this.y_field+this.y_mega_food*this.block_width, this.block_width, this.block_width);
        }

        fill(this.head_color);
        rect(this.x_field+this.x_head*this.block_width, this.y_field+this.y_head*this.block_width, this.block_width, this.block_width);
    }

    this.set_dir = function(dir) {
        this.dir = dir;
        this.xspeed = dir[0];
        this.yspeed = dir[1];
    }

    this.resetGame = function() {
        this.set_dir(snake.dirs.R);
        this.food_not_consumed = 0;
        this.x_head = 1;
        this.y_head = 0;
        this.tail = [[0, 0]];
        this.is_super_food_active = false;
        this.is_mega_food_active = false;
    }
}

function mousePressed() {
}

function getColor() {
}

function mouseDragged() {
}

function mouseReleased() {
}

function keyPressed() {
    if (snake.turn_allow == false) {
        return;
    }

    switch (keyCode) {
        case UP_ARROW:
            if (snake.dir == snake.dirs.D) {
                return;
            }
            snake.set_dir(snake.dirs.U);
            snake.turn_allow = false;

            break;
        case DOWN_ARROW:
            if (snake.dir == snake.dirs.U) {
                return;
            }
            snake.set_dir(snake.dirs.D);
            snake.turn_allow = false;

            break;
        case RIGHT_ARROW:
            if (snake.dir == snake.dirs.L) {
                return;
            }
            snake.set_dir(snake.dirs.R);
            snake.turn_allow = false;

            break;
        case LEFT_ARROW:
            if (snake.dir == snake.dirs.R) {
                return;
            }
            snake.set_dir(snake.dirs.L);
            snake.turn_allow = false;

            break;
        case 82: // r
            is_game_over = false;
            text_size = 0;
            snake.resetGame();
            console.log("keyCode: "+keyCode);
            break;
    }
}
