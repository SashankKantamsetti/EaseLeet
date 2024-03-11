document.addEventListener("DOMContentLoaded", function () {
    const removeTagsButton = document.getElementById("removeTagsButton");
    removeTagsButton.addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "removeTags" });
    });
});
