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

let ellipses = [];
let ellipse_color;

let c_width = 400;
let c_height = c_width;

let go_right = true;

let graph;

function setup() {
    frameRate(0);
    c = createCanvas(c_width, c_height);
    // createCanvas(canvas_size, canvas_size);
    // graph = createGraphics(c_width, c_height);
    background(0);
    ellipse_color = color(255, 255, 255);
    frameRate(20);
}

function draw() {
    background(0);

    let len = ellipses.length;
    for (var i = 0; i < len; i++) {
        let p = ellipses[i];
        fill(p[2]);
        noStroke();
        ellipse(p[0], p[1], (i+1)*2.6, (i+1)*2.6);
    }
    ellipses.forEach(function(p) {
    });

    strokeWeight(0.5);
    stroke(0, 255, 255);
    line(mouseX, 0, mouseX, c_height);
    stroke(255, 0, 255);
    line(0, mouseY, c_width, mouseY);

    ellipses.push([mouseX, mouseY, ellipse_color]);

    if (ellipses.length > 10) {
        ellipse_color = getRandomColor();
        ellipses.splice(0, 1);
    }

    //if (go_right) {
    //    mouseX += 5;
    //    if (mouseX > 250) {
    //        go_right = false;
    //    }
    //} else {
    //    mouseX -= 8;
    //    if (mouseX < 50) {
    //        go_right = true;
    //    }
    //}
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
    return color(105+getRandomInt(150), 105+getRandomInt(150), 105+getRandomInt(150));
}

function mousePressed() {
    ellipse_color = getRandomColor();

    // prevent default
    return false;
}
