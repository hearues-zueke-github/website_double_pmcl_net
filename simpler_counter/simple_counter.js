// String.prototype.format = function()
// {
//     var content = this;
//     for (var i=0; i < arguments.length; i++)
//     {
//         var replacement = '{' + i + '}';
//         content = content.replace(replacement, arguments[i]);
//     }
//     return content;
// };

// image.prototype.drawrect = function(x1, y1, x2, y2, fill) {
//     for (var j = y1; j <= y2; j++) {
//         for (var i = x1; i <= x2; i++) {
//             this.set(i, j, fill);
//         }
//     }
// }

var c;

var counter = 0;

var text_size = 80;

function print_window_size() {
    console.log("width = "+innerWidth);
    console.log("height = "+innerHeight);
}

function setup() {
    print_window_size();
    c = createCanvas(innerWidth, innerHeight);
}

function keyPressed() {
  console.log("p5 keyCode: " + keyCode);
  console.log("p5 key: " + key);

  if (keyCode === 32) {
    counter++;
    console.log("counter: "+counter)
  }
}

function draw() {
    if (c.height != innerHeight || c.width != innerWidth) {
        print_window_size();
        c.size(innerWidth, innerHeight)
    }

    background(0);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(text_size);
    text(counter, width/2, height/2);
}
