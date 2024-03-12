document.addEventListener("DOMContentLoaded", function () {
    const removeTagsButton = document.getElementById("removeTagsButton");
    removeTagsButton.addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "removeTags" });
    });
});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get('popupButton', function (data) {
        document.getElementById("removeTagsButton").innerHTML = data.popupButton
    })
})

/*var toggleButton = document.getElementById("removeTagsButton")
console.log(toggleButton)
toggleButton.addEventListener("click", (e) => {
    chrome.storage.sync.get("popupButton", function (data) {
        console.log(data)
        if (data.popupButton === "Hide Tags") {
            toggleButton.innerHTML = "Show Tags"
            chrome.storage.sync.set({ popupButton: "Show Tags" }, () => {
                console.log("Hide Button Clicked")
            })
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { message: "hide" });
            })
        }
        else if (data.popupButton === "Show Tags") {
            toggleButton.innerHTML = "Hide Tags"
            chrome.storage.sync.set({ popupButton: "Hide Tags" }, () => {
                console.log("Show Button Clicked")
            })
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { message: "show" });
            })
        }
    })

})*/

document.addEventListener("DOMContentLoaded", function () {
    // Get the button state from Chrome storage
    chrome.storage.sync.get('canShow', function (data) {
        // Update the button text based on the canShow value
        document.getElementById("removeTagsButton").innerHTML = data.canShow ? "Hide Tags" : "Show Tags";
    });

    var toggleButton = document.getElementById("removeTagsButton");
    toggleButton.addEventListener("click", (e) => {
        chrome.storage.sync.get("canShow", function (data) {
            var show = !data.canShow; // Toggle the value
            toggleButton.innerHTML = show ? "Hide Tags" : "Show Tags";
            // Store the updated value in Chrome storage
            chrome.storage.sync.set({ canShow: show }, function () {
                console.log('canShow value updated and stored in popup:', show);
                // Send message to content script to show/hide tags after the value is updated
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { message: show ? "show" : "hide" });
                });
            });
        });
    });
});