var index = 0;
var wording = ['3', '2', '1'];
var options = {};
var saveable = [];
var readDisplay = document.getElementById('readDisplay');
var optionsDisplay = document.getElementById('optionsDisplay');
var speedDisplay = document.getElementById('speed');
var optionsShow = document.getElementById('optionsShow');
var fnt = document.getElementById('fontSize');
var progress = document.getElementById('progress');
var timer;

//min, max, +- button effect. 
const buttons = {
    'speed': {
        min: 100,
        max: 1000,
        interval: 5
    },
    'periodPause': {
        min: 0,
        max: 1000,
        interval: 15
    },
    'scrollSens': {
        min: 1,
        max: 50,
        interval: 2
    },
    'fontSize': {
        min: 1,
        max: 150,
        interval: 2,
        callBack: updateFont
    }
}


chrome.storage.local.get(['text'], (result) => {
    var excluded = ["", '/', '.']
    result.text.split(/\s|\/|\—/).forEach((elem) => {
        if (excluded.indexOf(elem)) {
            wording.push(elem);
        }
    });
    console.log(wording);
    chrome.storage.local.get(['options'], (result) => {
        options = result.options;
        console.log(result)
        init();
        optionsShow.click();
    });
});

function init() {
    Object.keys(options).forEach(option => {
        if (buttons.hasOwnProperty(option) && document.getElementById(option)) {
            var elem = document.getElementById(option);
            elem.value = options[option];
            saveable.push(elem);
            elem.previousElementSibling.onclick = function (e) {
                elem.value = Math.min(buttons[option]['max'], Math.max(buttons[option]['min'], elem.value - buttons[option]['interval']))
                if (buttons[option].hasOwnProperty('callBack')) {
                    buttons[option].callBack();
                };
            };
            elem.nextElementSibling.onclick = function (e) {
                elem.value = Math.min(buttons[option]['max'], Math.max(buttons[option]['min'], elem.value - -buttons[option]['interval']))
                if (buttons[option].hasOwnProperty('callBack')) {
                    buttons[option].callBack();
                };
            };
        };
    });

    document.getElementById('save').onclick = function (e) {
        saveOptions();
    };
    document.getElementById('reset').onclick = function (e) {
        resetOptions();
    };

    // document.getElementById('fontSize').oninput = updateFont;
    fnt.addEventListener('input', updateFont);

    readDisplay.style.fontSize = fnt.value + 'px';
};

function updateFont() {
    readDisplay.style.fontSize = fnt.value + 'px';
};

function saveOptions() {
    saveable.forEach((elem) => {
        if (options.hasOwnProperty(elem.id)) {
            options[elem.id] = elem.value;
        };
    });
    chrome.storage.local.set({ options: options }, () => {
        console.log('saved options');
    });
};

function resetOptions() {
    chrome.storage.local.get(['factoryOptions'], (result) => {
        options = result.factoryOptions;
        saveable.forEach((elem) => {
            if (options.hasOwnProperty(elem.id)) {
                elem.value = options[elem.id];
            };
        });
    });
};

function readWord() {
    drawWord();
    index++;
    if (index < wording.length) {
        if (readDisplay.innerText.endsWith('.') || readDisplay.innerText.endsWith(',')) {
            timer = setTimeout(readWord, parseInt(options.periodPause) + ms(options.speed));
        } else {
            timer = setTimeout(readWord, ms(options.speed));
        };
    };
};

function ms(speed) {
    return parseInt(60000 / speed)
}

document.onkeypress = function (e) {
    e = e || window.event;
    console.log(e.key, e);
    if (e.key == " ") {
        if (timer && index < wording.length) {
            clearTimeout(timer)
            timer = 0;
        } else if (index < wording.length) {
            timer = setTimeout(readWord, ms(options.speed));
        } else {
            index = 0;
            timer = setTimeout(readWord, 100 + ms(options.speed));
        };
    };
};

document.onkeydown = function (e) {
    e = e || window.event;
    console.log(e.key, e);
    if (e.key == "ArrowLeft") {
        if (timer) {
            clearTimeout(timer)
            timer = 0;
        };
        if (index > 0) {
            index--;
            drawWord();
        } else {
            index = wording.length - 1;
            drawWord();
        };
    };
    if (e.key == "ArrowRight") {
        if (timer) {
            clearTimeout(timer);
            timer = 0;
        }
        if (index < wording.length - 1) {
            index++;
            drawWord();
        } else {
            index = 0;
            drawWord();
        };
    };
};
function drawWord() {
    progress.style.width = 100 * index / (wording.length - 1) + "%"
    readDisplay.innerText = wording[index]
};
document.onwheel = function (e) {
    if (e.deltaY > 0 && options.speed > 100) {
        options.speed -= options.scrollSens;
    } else if (e.deltaY < 0 && options.speed < 1000) {
        options.speed -= -options.scrollSens;
    };
    speedDisplay.value = options.speed;
};

optionsShow.onclick = function (e) {
    if (optionsDisplay.style.visibility == 'hidden') {
        optionsDisplay.style.visibility = 'visible';
        optionsShow.textContent = '\\/';
    } else {
        optionsDisplay.style.visibility = 'hidden';
        optionsShow.textContent = '/\\';
    };
};


