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

function changeRatio(canv) {
    var width = canv.width;
    var height = canv.height;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    if (height / width < innerHeight / innerWidth) {
        canv.style.width = "100%";
        canv.style.height = "";
    } else {
        canv.style.width = "";
        canv.style.height = "100%";
    }
}

function changeCanvasSize(canv) {
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
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
