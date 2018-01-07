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

//var angle_rate;
//var offset_rate;
var canvas;

var angle;
//var w;

var slider_angle_rate;
var slider_offset_rate;
var slider_w_rate;

function set_pos() {
    let pos = canvas.position();

    slider_angle_rate.position(pos.x+145, pos.y+10-5);
    slider_offset_rate.position(pos.x+145, pos.y+30-5);
    slider_w_rate.position(pos.x+145, pos.y+50-5);
}

function setup() {
    canvas = createCanvas(500, 500);

    slider_angle_rate = createSlider(10, 200, 100);

    slider_offset_rate = createSlider(10, 5000, 200);
    slider_w_rate = createSlider(3, 100, 20);
    slider_angle_rate.style('width', '250px');

    slider_offset_rate.style('width', '250px');
    slider_w_rate.style('width', '250px');

    set_pos();

    angle = 0;
}

function draw() {
    set_pos();

    background(0);
    translate(0, 0);
    rectMode(CORNER);

    let offset_rate = slider_offset_rate.value() / 1000;
    let angle_rate = slider_angle_rate.value() / 1000;
    let w = slider_w_rate.value();

    fill(0xFF, 0x00, 0xFF);
    textSize(12);
    textFont("monospace");

    text("angle rate", 20, 20);
    text("offset rate", 20, 40);
    text("w rate", 20, 60);

    text(angle_rate, 120, 20);
    text(offset_rate, 120, 40);
    text(w, 120, 60);

    translate(width/2, height/2);
    rectMode(CENTER);

    let offset = 0;
    for (let x = 0; x < width; x += w) {
        let a = angle + offset;
        let h = map(sin(a), -1, 1, 50, 200);
        fill(255);
        //translate(x - width / 2, 0, 0);
        rect(x-width/2+w/2, 0, w-1, h);
        offset += offset_rate;
    }
    angle += angle_rate;
}
