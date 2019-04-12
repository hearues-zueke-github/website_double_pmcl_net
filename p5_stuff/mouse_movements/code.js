// var s1, s2, s3;

var s_s = [];
var n = 30;
var gravity = 9.0;
var mass = 10.;



function setup() {
  createCanvas(800, 600);
  fill(255, 126);
  // Inputs: x, y, mass, gravity
  console.log("width: "+width+", height: "+height);
  for (var i = 0; i < n; i++) {
    s_s.push(new Spring2D(width/2, (height*0.3+i*0.1), mass, gravity, i));
  }
  console.log("fps before: "+frameRate());
  frameRate(120);
  console.log("fps after: "+frameRate());

  mouseX = s_s[0].x;
  mouseY = s_s[0].y;

  // s1 = ;
  // s2 = new Spring2D(0.0, width/2, mass, gravity);
  // s3 = new Spring2D(0.0, width/2, mass, gravity);
}

function draw() {
  background(0);
  var x = mouseX;
  var y = mouseY;
  s_s[0].update(mouseX, mouseY);
  s_s[0].display(mouseX, mouseY);
  var s_prev = s_s[0];

  for (var i = 1; i < n; i++) {
    var s_now = s_s[i];
    x = s_prev.x;
    y = s_prev.y;

    s_now.update(x, y);
    s_now.display(x, y);
    s_prev = s_now;
  }
  // s2.update(s1.x, s1.y);
  // s2.display(s1.x, s1.y);
  // s3.update(s2.x, s2.y);
  // s3.display(s2.x, s2.y);
}
  
function Spring2D(xpos, ypos, m, g, idNum) {
  this.x = xpos;// The x- and y-coordinates
  this.y = ypos;
  this.vx = 0; // The x- and y-axis velocities
  this.vy = 0;
  this.mass = m;
  this.gravity = g;
  this.radius = 10;
  this.stiffness = 1.;
  this.damping = 0.7;
  this.idNum = idNum

  this.max_l = 10;
  
  this.update = function(targetX, targetY) {
    var forceX = (targetX - this.x) * this.stiffness;
    var ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    var forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    var ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;

    // var l = sqrt(pow(targetX-this.x, 2)+pow(targetY-this.y, 2))
    // if (l > this.max_l) {
    //   this.x = (this.x-targetX)*l/this.max_l*0.00001;
    //   this.y = (this.y-targetY)*l/this.max_l*0.00001;
    // }

    if (this.vx > 10. || this.vx < -10.) {
      this.vx *= 0.999;
      // console.log("idNum: "+this.idNum+", vx: "+this.vx);
    }
    if (this.vy > 10. || this.vy < -10.) {
      this.vy *= 0.999;
    }
  }
  
  this.display = function(nx, ny) {
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
    stroke(255);
    line(this.x, this.y, nx, ny);
  }
}
