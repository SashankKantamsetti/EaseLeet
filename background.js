var show;
var popupButtonText = "Hide Tags"
chrome.storage.sync.set({ popupButton: popupButtonText, canShow: show }, function () {
    console.log("Button initiated to", popupButtonText)
})
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab);
    chrome.tabs.sendMessage(tabId, { message: "yes-main", info: tab.url });
    /*if (changeInfo.url && changeInfo.url.includes("https://leetcode.com/problemset/")) {
        console.log("yes-main")
    }
    if (changeInfo.url && changeInfo.url.includes("https://leetcode.com/problems/")) {
        console.log("yes")
        chrome.tabs.sendMessage(tabId, { message: "yes" });
    }*/
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is to refresh the tab
    if (message.action === "refreshTab") {
        console.log("Refresh message received")
        console.log("Message is ", message.changeCanShow)
        // Get the current active tab
        chrome.storage.sync.set({ canShow: message.changeCanShow }, async function () {
            show = message.changeCanShow
            console.log('canShow value updated and stored in background:', show);
            /*if (show === false) {
                chrome.storage.sync.set({ popupButton: "Show Tags" }, () => {
                    console.log("Hide Button Clicked")
                })
            }
            else {
                chrome.storage.sync.set({ popupButton: "Hide Tags" }, () => {
                    console.log("Show Button Clicked")
                })
            }*/
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                // Refresh the tab
                setTimeout(() => { chrome.tabs.reload(tabs[0].id); }, 1000)

            });
        });

        return true;
    }
});