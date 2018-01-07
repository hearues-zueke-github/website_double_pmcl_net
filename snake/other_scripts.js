// if (document.fullscreenEnabled) {
//     window.alert("Fullscreen is enabled!");
// } else {
//     window.alert("Fullscreen is restricted!!!!");
// }
document.documentElement.requestFullscreen();
window.alert("You loose!!! xD");

function changeBackground(color) {
   document.body.style.background = color;
}
