var index = 0;
var wording = [];
var options = {};
var readDisplay = document.getElementById('read');
var speedDisplay = document.getElementById('speed');
var speed = 500;

chrome.storage.local.get(['text'], (result) => {
    wording = result.text.split(" ");
    chrome.storage.local.get(['options'], (result) => {
        options = result.options;
        console.log(result)
        setTimeout(readWord, speed);
        console.log("started reading")
    });
});


function readWord() {
    readDisplay.innerText = wording[index++]
    if (index < wording.length) {
        setTimeout(readWord, speed);
    };
};

function wpm(speed){
    return parseInt(60000 / speed)
}
document.onkeypress = function (e) {
    e = e || window.event;
    console.log(e.key, e);
};

document.onwheel = function (e) {
    if (e.deltaY > 0 && speed < 1000){
        speed += options.scrollSens;
    }else if (e.deltaY < 0  && speed > 120){
        speed -= options.scrollSens;
    };
    speedDisplay.innerText = wpm(speed);
};