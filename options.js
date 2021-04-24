//js for options page
let buttonDiv = document.getElementById('buttondiv');
function constructButtons(div) {
    let button = document.createElement('button');
    button.textContent = "Button";
    button.addEventListener('click', function () {
        //do something on click
    });
    buttonDiv.appendChild(button);
}

constructButtons(buttonDiv);
