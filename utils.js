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

function changeRatio() {
    var width = game.canvas.width;
    var height = game.canvas.height;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    if (height / width < innerHeight / innerWidth) {
        game.canvas.style.width = "100%";
        game.canvas.style.height = "";
    } else {
        game.canvas.style.width = "";
        game.canvas.style.height = "100%";
    }
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}
