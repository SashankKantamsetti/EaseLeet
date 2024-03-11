chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        console.log(tab);
        if (changeInfo.url && changeInfo.url.includes("https://leetcode.com/problems/")) {
            console.log("yes")
            chrome.tabs.sendMessage(tabId, { message: "yes" });
    }
});