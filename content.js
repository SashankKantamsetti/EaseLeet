console.log("Hey this is content")
var canShow = true;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is to remove the tags
    if (message.message === "hide") {
        console.log("Hide message received!")
        chrome.runtime.sendMessage({ action: "refreshTab", changeCanShow: false });
    }
    else if (message.message === "show") {
        console.log("Show message received!")
        chrome.runtime.sendMessage({ action: "refreshTab", changeCanShow: true });
    }
    if (message.message === "yes-main") {
        console.log("yes-main message received")
        chrome.storage.sync.get('canShow', function (data) {
            canShow = data.canShow;
            console.log("Now canShow is", canShow);
            removeDifficultyTagsOuter();
        });
    }
    if (message.message === "yes") {
        console.log("message received")
        removeDifficultyTags();
    }
});


// Function to remove the difficulty tags from the page
function removeDifficultyTags(canShow) {
    chrome.storage.sync.get('canShow', function (data) {
        console.log("Data is ", data)
        canShow = data.canShow
        console.log("Now canShow is", canShow)
    })
    if (canShow !== undefined && canShow === false) {
        // Array of class names representing difficulty tags
        const difficultyClasses = ["text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard", "text-yellow", "text-olive", "text-pink"];

        // Loop through each difficulty class
        difficultyClasses.forEach(className => {
            // Select elements with the current difficulty class
            const elements = document.querySelectorAll("." + className);

            // Remove each selected element
            elements.forEach(element => {
                element.remove();
            });
        });
    }
}
function removeDifficultyTagsOuter() {
    // Array of class names representing difficulty tags
    if (canShow !== undefined && canShow === false) {
        setTimeout(() => {
            const difficultyClasses = ["text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard", "text-yellow", "text-olive", "text-pink"];

            // Loop through each difficulty class
            difficultyClasses.forEach(className => {
                // Select elements with the current difficulty class
                const elements = document.querySelectorAll("." + className);

                // Remove each selected element
                elements.forEach(element => {
                    element.remove();
                });
            })
        }, 1000);
    }
}
