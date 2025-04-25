// Listen for messages from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkPage") {
        let currentUrl = window.location.href;

        // Send URL back to background.js for verification
        sendResponse({ url: currentUrl });
    }
});


// add currentUrl to frontend to dynamically insert url in datavase