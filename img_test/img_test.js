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

image.prototype.drawrect = function(x1, y1, x2, y2, fill) {
    for (var j = y1; j <= y2; j++) {
        for (var i = x1; i <= x2; i++) {
            this.set(i, j, fill);
        }
    }
}

var c;

var img;  // Declare variable 'img'.
var img2;

var p1x;
var p1y;
var p2x;
var p2y;
var is_current_pic;
var current_fill;

var points;

function print_window_size() {
    console.log("width = "+innerWidth);
    console.log("height = "+innerHeight);
}

function setup() {
    points = [];
    is_current_pic = false;
    current_fill = [0, 0, 0, 0];
    print_window_size();
    c = createCanvas(innerWidth, innerHeight);
    img = createImage(230, 230);
    img.loadPixels();
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var a = map(y, 0, img.height, 255, 0);
            img.set(x, y, [40, 103, 244, a]);
        }
    }
    img.updatePixels();

    img2 = createImage(300, 300);
    img2.loadPixels();
    for (var x = 0; x < img2.width; x++) {
        for (var y = 0; y < img2.height; y++) {
            img2.set(x, y, [30, 30, 30, 255]);
        }
    }
    img2.updatePixels();
}

function mousePressed() {
    current_fill = getColor();
    is_current_pic = true;
    p1x = mouseX;
    p1y = mouseY;
    p2x = mouseX;
    p2y = mouseY;
}

function getColor() {
    return [Math.floor(Math.random()*256),
        Math.floor(Math.random()*256),
        Math.floor(Math.random()*256),
        128+Math.floor(Math.random()*128)];
}

function mouseDragged() {
    p2x = mouseX;
    p2y = mouseY;
}

function mouseReleased() {
    p2x = mouseX;
    p2y = mouseY;
    console.log("p1x: {0}, p1y: {1}, p2x: {2}, p2y: {3}, color: {4}".format(p1x, p1y, p2x, p2y, color));
    var temp;
    if (p1x > p2x) {
        temp = p1x;
        p1x = p2x;
        p2x = temp;
    }
    if (p1y > p2y) {
        temp = p1y;
        p1y = p2y;
        p2y = temp;
    }
    points.push([p1x, p1y, p2x-p1x, p2y-p1y, current_fill]);
    is_current_pic = false;
}

function draw() {
    if (c.height != innerHeight || c.width != innerWidth) {
        print_window_size();
        c.size(innerWidth, innerHeight)
    }
    background(0);
    // image(img, 90, 80);
    // image(img, mouseX-img.width/2, mouseY-img.height/2);
    // image(img2, 350, 250);

    points.forEach(function(p) {
        print("p: {0}".format(p));
        fill(p[4][0], p[4][1], p[4][2], p[4][3]);
        rect(p[0], p[1], p[2], p[3]);
    });

    if (is_current_pic) {
        fill(current_fill);
        var temp = [p1x, p1y, p2x, p2y];
        if (temp[0] > temp[2]) {
            var t = temp[0];
            temp[0] = temp[2];
            temp[2] = t;
        }
        if (temp[1] > temp[3]) {
            var t = temp[1];
            temp[1] = temp[3];
            temp[3] = t;
        }
        rect(temp[0], temp[1], temp[2] - temp[0], temp[3] - temp[1]);
    }
}
