
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        chrome.tabs.sendMessage(tabId, { message: "yes-main" });
        if (changeInfo.url && changeInfo.url.includes("https://leetcode.com/")) {
            console.log("yes-main")
            chrome.tabs.sendMessage(tabId, { message: "yes-main" });
        }
        if (changeInfo.url && changeInfo.url.includes("https://leetcode.com/problems/")) {
            console.log("yes")
            chrome.tabs.sendMessage(tabId, { message: "yes" });
        }
        
});