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

function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHex(n, leading) {
  var h = n.toString(16);
  if (leading > h.length) {
    h = "0".repeat(leading-n.length)+h;
  }
  return h;
}

function getRandomColor(min, max) {
  var h1 = toHex(getRandomInt(min, max));
  var h2 = toHex(getRandomInt(min, max));
  var h3 = toHex(getRandomInt(min, max));
  var h4 = toHex(getRandomInt(50, 256));
  return `#${h1}${h2}${h3}${h4}`;
}

/**
 * Computes x mod n
 * x arbitrary integer
 * n natural number
 */
const mod = (x, n) => (x % n + n) % n;

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}
