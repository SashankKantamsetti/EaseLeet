
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        chrome.tabs.sendMessage(tabId, { message: "yes-main",info: tab.url });
        
});