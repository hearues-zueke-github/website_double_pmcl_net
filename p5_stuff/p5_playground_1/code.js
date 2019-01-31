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
var ball;

function Ball(x, y) {
  this.ax = 0.15;
  this.ay = 0.15;

  this.ax_dec = 0.05;
  this.ay_dec = 0.05;

  this.ax_mouse = 0.01;
  this.ay_mouse = 0.01;

  this.vx = 0;
  this.vy = 0;

  this.x = x;
  this.y = y;
  this.color = [0xFF, 0x00, 0x00, 0x80];
  this.radius = 40;

  this.updateMouse = function(mouseX, mouseY) {
    this.vx += (mouseX-this.x) * this.ax_mouse;
    this.vy += (mouseY-this.y) * this.ay_mouse;
  }

  this.update = function() {
    var isLeft = keyIsDown(LEFT_ARROW);
    var isRight = keyIsDown(RIGHT_ARROW);
    var isUp = keyIsDown(UP_ARROW);
    var isDown = keyIsDown(DOWN_ARROW);

    if (isLeft || isRight) {
      if (isLeft) {
        this.vx -= this.ax;
      } else if (isRight) {
        this.vx += this.ax;
      }
    } else {
      if (this.vx > 0) {
        this.vx -= this.ax_dec;
        if (this.vx < 0) {
          this.vx = 0;
        }
      } else {
        this.vx += this.ax_dec;
        if (this.vx > 0) {
          this.vx = 0;
        }
      }
    }

    if (isUp || isDown) {
      if (isUp) {
        this.vy -= this.ay;
      } else if (isDown) {
        this.vy += this.ay;
      }
    } else {
      if (this.vy > 0) {
        this.vy -= this.ay_dec;
        if (this.vy < 0) {
          this.vy = 0;
        }
      } else {
        this.vy += this.ay_dec;
        if (this.vy > 0) {
          this.vy = 0;
        }
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }
    if (this.x > width) {
      this.x = width;
      this.vx = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }
    if (this.y > height) {
      this.y = height;
      this.vy = 0;
    }
  }

  this.draw = function() {
    fill(...this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.oncontextmenu = function() {
        return false;
    }

    background(0);
    ball = new Ball(width/2, height/2);
    
    frameRate(120);
}

function draw() {
  background(0);

  if (isMousePressed) {
    console.log("mouseButton: "+mouseButton);
    var color;
    if (mouseButton == "left") {
      strokeWeight(6);
      color = [0x80, 0xB0, 0x40];
      // stroke(...color);
      // line(mouseX, mouseY, pmouseX, pmouseY);

      // fill(0x80, 0xB0, 0x40);
      // noStroke();
      // rect(mouseX-10, mouseY-10, 20, 20);
    } else if (mouseButton == "right") {
      strokeWeight(9);
      color = [0x30, 0xA0, 0x60];
      
      // fill(0x30, 0xA0, 0x60);
      // noStroke();
      // rect(mouseX-20, mouseY-10, 40, 20);
    }
    stroke(...color);
    line(mouseX, mouseY, pmouseX, pmouseY);

    ball.updateMouse(mouseX, mouseY);
  }

  ball.update();
  ball.draw();
}

function ballUp() {
  ball.vy += -4;
}

function ballDown() {
  ball.vy += 4;
}

function ballLeft() {
  ball.vx += -4;
}

function ballRight() {
  ball.vx += 4;
}
