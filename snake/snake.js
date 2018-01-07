var play_button;
var button_restart;

var snake;

var whole_width = 700;
var whole_height = 750;

var game_width = 600;
var game_height = 600;

var init_frame_rate = 6.;
var frame_rate = init_frame_rate;
var frame_rate_increment = 0.02;

var moves = 0;

var game_x = (whole_width - game_width) / 2;
var game_y = (whole_height - game_height - 50);

function setup() {
	var g = createCanvas(whole_width, whole_height);
	snake = new Snake();

	// button_restart = createButton("Restart Game");
	// button_restart.position(100, 230);
	// button_restart.size(200, 100);
	// button_restart.mousePressed(function(){
	//     window.alert("canvas position: "+g.offsetX);//+Object.keys(g.style));
	//     snake.init();
	// });
	play_button = createButton("play gamejsdkfjsdl");
	// window.alert("play_button keys: "+Object.keys(play_button));
	// window.alert(`play_button: width: ${play_button.width}, height: ${play_button.height}`);
	play_button.position(100, 200);
	play_button.width = "300px";
	play_button.height = "200px";
	// play_button.hide();
	play_button.border = null;
	// window.alert(`play_button: width: ${play_button.width}, height: ${play_button.height}`);
	play_button.mousePressed(message);
}

function message() {
	window.alert("document.fullscreenEnabled bla = "+document.fullscreenEnabled+
				 "\nwidth: "+width+
				 "\nheight: "+height+
				 "\ninner width : "+innerWidth+
				 "\ninner height: "+innerHeight+
				 "\nplay_button.width: "+play_button.width+
				 "\nplay_button.height: "+play_button.height);
}

function draw() {
  // Real background
  background(51);
  // Forground of game
  fill(0x00, 0x60, 0x00);
  rect(game_x+snake.scale, game_y+snake.scale, game_width-2*snake.scale, game_height-2*snake.scale);
  // Frame
  fill(0);
  rect(game_x, game_y, snake.scale, game_height);
  rect(game_x, game_y, game_width, snake.scale);
  rect(game_x+game_width-snake.scale, game_y, snake.scale, game_height);
  rect(game_x, game_y+game_height-snake.scale, game_width, snake.scale);

  snake.update();
  snake.show();
}

function keyPressed() {
	if (snake.turn_allow == false)
		return;

	if (keyCode === UP_ARROW) {
		if (snake.dir == snake.dirs.D)
			return
		snake.set_dir(snake.dirs.U);
		snake.turn_allow = false;
	} else if (keyCode === DOWN_ARROW) {
		if (snake.dir == snake.dirs.U)
			return
		snake.set_dir(snake.dirs.D);
		snake.turn_allow = false;
	} else if (keyCode === RIGHT_ARROW) {
		if (snake.dir == snake.dirs.L)
			return
		snake.set_dir(snake.dirs.R);
		snake.turn_allow = false;
	} else if (keyCode === LEFT_ARROW) {
		if (snake.dir == snake.dirs.R)
			return
		snake.set_dir(snake.dirs.L);
		snake.turn_allow = false;
	}
}

function Snake() {
	this.scale = 40;
	
	this.score = 0;
	this.highscore = 0;

	this.x = 0;
	this.y = 0;
	
	this.columns = 0;
	this.rows = 0;

	this.xfood = 0;
	this.yfood = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.dirs = {U: [0, -1], D: [0, 1], R: [1, 0], L: [-1, 0]};
	this.dir = this.dirs.R;
	this.length = 0;
	this.tail = [];
	this.turn_allow = true;

	this.pre_init = function() {
		noStroke();

		console.log("game_width = "+game_width);
		console.log("game_height = "+game_height);
		this.columns = (game_width-this.scale*2) / this.scale
		this.rows = (game_height-this.scale*2) / this.scale
		console.log("rows = "+this.rows);
		console.log("columns = "+this.columns);
	}

	this.init = function() {
		frame_rate = init_frame_rate;
		moves = 0;
		frameRate(frame_rate);
		this.score = 0;
		this.highscore = 0;
		this.set_dir(this.dirs.R)
		this.x = Math.floor(game_width / this.scale / 2)*this.scale;
		this.y = Math.floor(game_height / this.scale / 2)*this.scale;
		this.new_food_location();
		this.length = 0;
		this.tail = [];
	}

	this.new_food_location = function() {
		this.xfood = this.scale + floor(random((game_width-this.scale*2) / this.scale)) * this.scale
		this.yfood = this.scale + floor(random((game_height-this.scale*2) / this.scale)) * this.scale
		// console.log("this.xfood = "+this.xfood);
		// console.log("this.yfood = "+this.yfood);
	}

	this.update = function() {
		var new_x = this.x + this.xspeed*this.scale;
		var new_y = this.y + this.yspeed*this.scale;

		for (var i = 0; i < this.tail.length-1; i++) {
			if ((new_x == this.tail[i][0]) && (new_y == this.tail[i][1])) {
				// window.alert("You can not eat yourself! Oh man...");
				this.init();
				return;
			}
		}

		if (new_x == this.xfood && new_y == this.yfood) {
			// console.log("this.tail = "+this.tail);
			// console.log("this.tail.length = "+this.tail.length);
			this.new_food_location();
			this.length++;
			this.tail.push([])
			this.score += 10;
			frame_rate += frame_rate_increment;
			frameRate(frame_rate);
			if (this.score > this.highscore) {
				this.highscore = this.score;
			}
		}

		for (var i = this.tail.length; i > 1; i--) {
			this.tail[i-1] = this.tail[i-2];
		}
		this.tail[0] = [this.x, this.y];

		this.x = new_x;
		this.y = new_y;

		if ((this.x < this.scale) || (this.x > game_width-this.scale*2) ||
			(this.y < this.scale) || (this.y > game_height-this.scale*2)) {
			// window.alert("You loose!!! xD");
			this.init()
		}

		this.x = constrain(this.x, this.scale, width-this.scale*2);
		this.y = constrain(this.y, this.scale, height-this.scale*2);

		this.turn_allow = true;
	}

	this.show = function() {
		// Highscore
		textSize(24);
		fill(0xFF, 0xFF, 0xFF);
		text("Score: "+this.score, game_x, 40)
		text("Highscore: "+this.highscore, game_x, 80)
		text("Speed: "+nf(frame_rate, 0, 1), game_x+200, 40)
		text("Moves: "+moves, game_x+200, 80)
		moves++;

		// Snake Body
		fill(0xFF, 0x7F, 0x00);
		for (var i = 0; i < this.tail.length; i++) {
			rect(this.tail[i][0] + game_x, this.tail[i][1] + game_y, this.scale, this.scale);
		}
		// Snake Head
		fill(0xFF, 0x40, 0x00);
		rect(this.x + game_x, this.y + game_y, this.scale, this.scale);
		// Food
		fill(255, 100, 200);
		rect(this.xfood + game_x, this.yfood + game_y, this.scale, this.scale);
	}

	this.set_dir = function(dir) {
		this.dir = dir;
		this.xspeed = dir[0];
		this.yspeed = dir[1];
	}

	this.pre_init();
	this.init();
}

var press_x;
var press_y;
var release_x;
var release_y;

function mousePressed() {
	press_x = round(mouseX);
	press_y = round(mouseY);
}

function mouseReleased() {
	release_x = round(mouseX);
	release_y = round(mouseY);
	if (press_x > release_x) {
		var temp = press_x;
		press_x = release_x;
		release_x = temp;
	}
	if (press_y > release_y) {
		var temp = press_y;
		press_y = release_y;
		release_y = temp;
	}
	fill(0x34, 0x03, random(0, 255));
	rect(press_x, press_y, release_x-press_x, release_y-press_y);
}