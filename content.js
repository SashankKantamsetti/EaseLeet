console.log("Hey this is content")
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is to remove the tags
    if (message.message === "yes") {
        console.log("message received")
        removeDifficultyTags();
    }
    if (message.action === "removeTags") {
        console.log("ContentScript Message received")
        // Remove the difficulty tags from the page
        removeDifficultyTags();

    }
});

// Function to remove the difficulty tags from the page
function removeDifficultyTags() {
    // Array of class names representing difficulty tags
    const difficultyClasses = ["text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard"];

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
