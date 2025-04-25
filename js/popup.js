document.addEventListener("DOMContentLoaded", function () {
    const blockButton = document.getElementById("blockSite");
    const whitelistButton = document.getElementById("whitelistSite");
    const statusMessage = document.getElementById("statusMessage");

    // Function to get the active tab URL
    function getActiveTab(callback) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                callback(tabs[0].url);
            } else {
                callback(null);
            }
        });
    }

    // Block the current site
    blockButton.addEventListener("click", function () {
        getActiveTab(function (url) {
            if (url) {
                chrome.runtime.sendMessage({ action: "block", url: url }, function (response) {
                    statusMessage.textContent = "Site blocked successfully!";
                    statusMessage.style.color = "red";
                });
            }
        });
    });

    // Whitelist the current site
    whitelistButton.addEventListener("click", function () {
        getActiveTab(function (url) {
            if (url) {
                chrome.runtime.sendMessage({ action: "whitelist", url: url }, function (response) {
                    statusMessage.textContent = "Site added to whitelist!";
                    statusMessage.style.color = "green";
                });
            }
        });
    });
});
