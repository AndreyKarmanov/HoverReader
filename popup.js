//js for the popup
let buttonDiv = document.getElementById('buttondiv');
function constructButtons(div) {
    let button = document.createElement('button');
    button.innerText = 'send message';
    //what the button does on click
    button.addEventListener('click', function () {
        //sets the storage to hello
        chrome.storage.local.set({
            teststorage: 'hello'
        });
        //sends message to the 'onMessage' listener in background.js
        chrome.runtime.sendMessage({
            message: 'storage updated'
        });
    });
    //adds button to the buttonDiv in the popup.html page
    buttonDiv.appendChild(button);
}

constructButtons(buttonDiv);