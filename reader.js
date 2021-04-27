var index = 0;
var wording = [];
var options = {};
var readDisplay = document.getElementById('readDisplay');
var optionsDisplay = document.getElementById('optionsDisplay');
var speedDisplay = document.getElementById('speed');
var optionsShow = document.getElementById('optionsShow');

var speed = 200;

chrome.storage.local.get(['text'], (result) => {
    wording = result.text.split(" ");
    chrome.storage.local.get(['options'], (result) => {
        options = result.options;
        console.log(result)
        setTimeout(readWord, ms(speed));
        console.log("started reading")
        speedDisplay.innerText = options.speed;
    });
});


function readWord() {
    readDisplay.innerText = wording[index++]
    if (index < wording.length) {
        setTimeout(readWord, ms(speed));
    };
};

function ms(speed) {
    return parseInt(60000 / speed)
}

document.onkeypress = function (e) {
    e = e || window.event;
    console.log(e.key, e);
};

document.onwheel = function (e) {
    if (e.deltaY > 0 && speed > 100) {
        speed -= options.scrollSens;
    } else if (e.deltaY < 0 && speed < 1000) {
        speed += options.scrollSens;
    };
    speedDisplay.value = speed;
};

optionsShow.onclick = function (e) {
    console.log('the dispaly', optionsDisplay.style.display)
    if (optionsDisplay.style.visibility == 'hidden'){
        // optionsDisplay.style.paddingTop = '100px';
        optionsDisplay.style.visibility = 'visible';
    }else{
        optionsDisplay.style.visibility = 'hidden';
        // optionsDisplay.style.paddingTop = '100px';
    };
};