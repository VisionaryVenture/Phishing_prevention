let blacklistedSites = new Set();

// Load blacklist from local file
async function loadBlacklist() {
    try {
        const response = await fetch(chrome.runtime.getURL("blacklist.txt"));
        const text = await response.text();
        blacklistedSites = new Set(text.split("\n").map(site => site.trim()).filter(site => site));
        console.log("Blacklist loaded:", blacklistedSites);
    } catch (error) {
        console.error("Error loading blacklist:", error);
    }
}

// Check and redirect if site is blacklisted
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const url = new URL(details.url).hostname;
    if (blacklistedSites.has(url)) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("blocked.html") });
    }
}, { urls: ["<all_urls>"] });

// Load blacklist when extension starts
loadBlacklist();
