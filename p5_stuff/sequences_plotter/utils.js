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
