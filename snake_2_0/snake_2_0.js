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

var c;
var ratio_h_w = 1.2;

var frameXSlider;
var frameYSlider;
var xSlider;
var ySlider;
var ratioSlider;

var isCentered = false;
var buttonCenter;

var frameX = 30;
var frameY = 40;
var amount_x = 10;
var amount_y = 14;
var ratio_width_block = 30;

function setFrameCenter() {
    isCentered = !isCentered;
    if (isCentered) {
        frameXSlider.value();
    }
    console.log("Hello World!");
}

function setup() {
    frameRate(60);
    c = createCanvas(innerWidth, innerHeight);

    buttonCenter = createButton("Center frame");
    buttonCenter.position(20, 170);
    buttonCenter.size(100, 30);
    buttonCenter.mousePressed(setFrameCenter);

    frameXSlider = createSlider(0, 500, frameX);
    frameXSlider.position(20, 20);
    frameXSlider.size(300, frameXSlider.height);

    frameYSlider = createSlider(0, 500, frameY);
    frameYSlider.position(20, 50);
    frameYSlider.size(300, frameYSlider.height);

    xSlider = createSlider(2, 30, amount_x);
    xSlider.position(20, 80);
    xSlider.size(300, xSlider.height);

    ySlider = createSlider(2,30, amount_y);
    ySlider.position(20, 110);
    ySlider.size(300, ySlider.height);

    ratioSlider = createSlider(10, 300, ratio_width_block);
    ratioSlider.position(20, 140);
    ratioSlider.size(300, ratioSlider.height);
}

function mousePressed() {
}

function getColor() {
}

function mouseDragged() {
}

function mouseReleased() {
}

function draw() {
    if (c.height != innerHeight || c.width != innerWidth) {
        c.size(innerWidth, innerHeight)
    }

    // Real background
    background(51);
    // Forground of game
    fill(0x00, 0x60, 0x00);

    var x;
    var y;
    var w;
    var h;
    if (c.width * ratio_h_w < c.height) {
        x = 0;
        y = (c.height - c.width * ratio_h_w) / 2;
        w = c.width;
        h = c.width * ratio_h_w;
    } else {
        x = (c.width - c.height / ratio_h_w) / 2;
        y = 0;
        w = c.height / ratio_h_w;
        h = c.height;
    }
    rect(x, y, w, h);
    // console.log("x: {0}, y: {1}, w: {2}, h: {3}".format(x, y, w, h));

    amount_x = xSlider.value();
    amount_y = ySlider.value();
    ratio_width_block = ratioSlider.value() / 1000.;
    var width = w <= h ? w*ratio_width_block : h*ratio_width_block;

    if (isCentered) {
        frameX = (w-amount_x*width)/2+frameXSlider.value();
        frameY = (h-amount_y*width)/2+frameYSlider.value();
    } else {
        frameX = frameXSlider.value();
        frameY = frameYSlider.value();
    }

    fill(0x30, 0x80, 0xA0);
    for (var i = 0; i < amount_x; i+=1) {
        rect(x+frameX + width * i, y+frameY, width, width);
    }
    for (var i = 0; i < amount_x; i+=1) {
        rect(x+frameX + width * i, y+frameY+width*(amount_y-1), width, width);
    }
    for (var i = 1; i < amount_y-1; i+=1) {
        rect(x+frameX, y+frameY+width*i, width, width);
    }
    for (var i = 1; i < amount_y-1; i+=1) {
        rect(x+frameX+width*(amount_x-1), y+frameY+width*i, width, width);
    }

    fill(0xFF, 0x00, 0xFF)
    text("frameX: "+frameX, frameXSlider.x * 2 + frameXSlider.width, 35);
    text("frameY: "+frameY, frameYSlider.x * 2 + frameYSlider.width, 65);
    text("amount-x: "+amount_x, xSlider.x * 2 + xSlider.width, 95);
    text("amount-y: "+amount_y, ySlider.x * 2 + ySlider.width, 125);
    text("ratioWidth: "+ratio_width_block, ratioSlider.x * 2 + ratioSlider.width, 155);
}
