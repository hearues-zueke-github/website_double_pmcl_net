// function f_apply(i, colors, idxTable) {
//   noStroke();
//   // var colors = [[0x80, 0xB0, 0x40], [0x30, 0xA0, 0x60]];
//   var len = colors.length;

//   // var obj = getIdxTable(5, 5);
//   rows = idxTable.rows;
//   cols = idxTable.cols;
//   rect_rows_cols = idxTable.rect_rows_cols;

//   for (var y = 0; y < rows; y++) {
//     for (var x = 0; x < cols; x++) {
//       fill(...colors[(y+x*2+i)%len]);
//       rect(...rect_rows_cols[y][x]);
//     }
//   }
// }

// function getIdxTable(cols, rows) {
//   var key = ""+cols+","+rows
//   if (idxTable.hasOwnProperty(key)) {
//     return idxTable[key];
//   }

//   var rect_rows_cols = [];
//   for (var y = 0; y < rows; y++) {
//     var rect_row = [];
//     for (var x = 0; x < cols; x++) {
//       // fill(...colors[(y+x+i)%len1]);
//       rect_row.push([width*x/cols, height*y/rows, width/cols, height/rows]);
//     }
//     rect_rows_cols.push(rect_row);
//   }

//   idxTable[key] = {"rows": rows, "cols": cols, "rect_rows_cols": rect_rows_cols};
//   return rect_rows_cols;
// }

// var canvas;
// var ball;
// var idx;
// var used_f;
// var mod_idx;

// var colorsNow;
// var idxTableNow;

// var colors = [
//   [[0x80, 0xB0, 0x40], [0x30, 0xA0, 0x60]],
//   [[0x80, 0xD0, 0x50], [0x20, 0x90, 0x60], [0x30, 0xA0, 0x60]],
//   [[0x80, 0xD0, 0x50], [0x20, 0x90, 0x60], [0x30, 0xA0, 0x60], [0x70, 0x60, 0x70]]
// ];

// var idxTable = {}

// function setup() {
//   canvas = createCanvas(600, 600);
//   canvas.parent("canvas_div");
//   canvas.oncontextmenu = function() {
//     return false;
//   }
  
//   useFunction1();

//   idx = 0;
//   frameRate(5);
// }

// function draw() {
//   // background(0);
//   // used_f(idx);
//   f_apply(idx, colorsNow, idxTableNow);
//   idx = (idx+1) % mod_idx;
// }

// function useFunction1() {
//   console.log("function nr. 1");
//   mod_idx = 2;
//   colorsNow = colors[0];
//   idxTableNow = getIdxTable(3, 4);
// }

// function useFunction2() {
//   console.log("function nr. 2");
//   mod_idx = 3;
//   colorsNow = colors[1];
//   idxTableNow = getIdxTable(5, 4);
// }

// function useFunction3() {
//   console.log("function nr. 3");
//   mod_idx = 4;
//   colorsNow = colors[2];
//   idxTableNow = getIdxTable(6, 6);
// }
