
async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0].id;
}
document.addEventListener("DOMContentLoaded", function () {
    var tabId = getActiveTabURL()
    const removeTagsButton = document.getElementById("removeTagsButton");
    removeTagsButton.addEventListener("click", function () {
        chrome.tabs.sendMessage(tabId, { message: "yes-main" })
    });
});
