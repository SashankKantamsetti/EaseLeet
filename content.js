console.log("Hey this is content")
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is to remove the tags
    console.log("recieved till on message");
    if(message.message === "yes-main"){
        console.log("Working on main")
        removeDifficultyTagsOnMain();
    }
    if (message.message === "yes") {
        console.log("message received")
        removeDifficultyTags();

    }
    
});

// Function to remove the difficulty tags from the page
function removeDifficultyTags() {
    // Array of class names representing difficulty tags
    const difficultyClasses = ["text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard"];
    setTimeout(()=>{
        difficultyClasses.forEach(className => {
            // Select elements with the current difficulty class
            const elements = document.querySelectorAll("." + className);
            console.log(elements)
            // Remove each selected element
            elements.forEach(element => {
                element.remove();
            });
        });
    },1000)
    // Loop through each difficulty class
    
}

function removeDifficultyTagsOnMain(){
    console.log("yopu got function also")
    const difficultyClasses =["text-yellow","text-olive","text-pink"]
    // Loop through each difficulty class
    setTimeout(()=>(difficultyClasses.forEach(className => {
        // Select elements with the current difficulty class
        const elements = document.querySelectorAll("." + className);
        console.log(elements);
        // Remove each selected element
        elements.forEach(element => {
            element.remove();
        });
    })),1000)
}

