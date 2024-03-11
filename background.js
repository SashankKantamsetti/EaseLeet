chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;
    chrome.tabs.get(tabId, (tab) => {
        console.log(tab);
        if (tab.url && tab.url.includes("https://leetcode.com/problems/")) {
            console.log("yes")
            chrome.tabs.sendMessage(tabId, { message: "yes" });
        }
    });
});


