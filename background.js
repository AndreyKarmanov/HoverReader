// //This script runs ONE time at the start of the function
// //if you go into your 'extensions' page on chrome there should be a 'background page' that you can click on, the console will go to this
// console.log("Background")

// // sets the local storage with address 'teststorage' to 'test' 
// chrome.storage.local.set({
//   teststorage: 'test'
// });

// //gets the local storage from 'teststorage' and prints it to the console
// chrome.storage.local.get(['teststorage'], function (result) {
//   console.log('Value is: ', result.teststorage)
// });

// //when a message is sent from another script, it goes through this listener
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   //checks if message matches
//   if (request.message === 'storage updated') {
//     chrome.storage.local.get(['teststorage'], function (result) {
//       //prints out the value from the storage
//       console.log(result.teststorage)
//     });
//   }
// });
var factoryOptions = {
  speed: 200,
  periodPause: 0,
  scrollSens: 10,
  fontSize: 24,
  backColour: "#f0f8ff",
  fontColour: "#000000"
}
var options = {};
chrome.storage.local.set({ factoryOptions: factoryOptions });
chrome.storage.local.get(['options'], (result) => {
  if (result.options == null) {
    options = factoryOptions;
  } else {
    options = result.options;
  };

  Object.keys(factoryOptions).forEach((elem) => {
    options[elem] = options.hasOwnProperty(elem) ? options[elem] : factoryOptions[elem];
  });
  console.log(options);
  chrome.storage.local.set({ options: options });
});


function SpeedRead(info, tab) {
  chrome.storage.local.set({ text: info.selectionText }, () => {
    chrome.tabs.create({
      url: "/reader.html"
    }, () => {
      console.log("Created Reader")
    });
  });
};


chrome.contextMenus.create({
  title: "Speedread: %s",
  contexts: ["selection"],
  onclick: SpeedRead
});

