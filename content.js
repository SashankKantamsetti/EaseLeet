console.log("Hey this is content")
var canShow = true;
var count = 1
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
            removeDifficultyTagsOuter(message.info);
        });
    }
    /*if (message.message === "yes") {
        console.log("message received")
        removeDifficultyTags();
    }*/
});


// Function to remove the difficulty tags from the page
/*function removeDifficultyTags(canShow) {
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
}*/
async function removeDifficultyTagsOuter(link) {
    // Array of class names representing difficulty tags
    if (canShow !== undefined && canShow === false) {
        var res = await fetch(`http://localhost:8080/?link=${link}`)
        var data = await res.json()
        console.log(data);
        var res2 = await fetch('http://localhost:8080/count')
        var data2 = await res2.json()
        const difficultyClasses = ["text-yellow", "text-olive", "text-pink", "text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard"]
        // Loop through each difficulty class
        //
        setTimeout(() => (difficultyClasses.forEach(className => {
            // Select elements with the current difficulty class
            const elements = document.querySelectorAll("." + className);
            console.log(elements);
            // Remove each selected element
            elements.forEach(element => {
                element.innerHTML = 'Hidden';
                element.style.color = 'black';
            });
        })), 1000)

        //
        setTimeout(() => {
            var acceptance = document.querySelectorAll(".flex.items-center.mx-2")
            for (var i = 3; i < acceptance.length; i += 6) {
                acceptance[i].innerHTML = "100%";
            }
            for (var i = 5; i < acceptance.length; i += 6) {

                if (data2[acceptance[i - 4].innerText.substring(acceptance[i - 4].innerText.indexOf('.') + 2)]) {
                    const a = document.createElement('div');
                    a.innerText = data2[acceptance[i - 4].innerText.substring(acceptance[i - 4].innerText.indexOf('.') + 2)]
                    a.style.width = data2[acceptance[i - 4].innerText.substring(acceptance[i - 4].innerText.indexOf('.') + 2)] * 2.5 + 'px'
                    if (a.innerText > 60) a.style.backgroundColor = 'red'
                    else if (a.innerText > 30 && a.innerText <= 60) a.style.backgroundColor = 'orange'
                    else a.style.backgroundColor = 'green'
                    a.style.height = 10 + 'px'
                    a.style.borderRadius = 10 + 'px'
                    a.style.color = 'white'
                    a.style.fontSize = 12 + 'px'
                    a.style.display = 'flex'
                    a.style.justifyContent = 'center'
                    a.style.alignItems = 'center'
                    acceptance[i].innerHTML = ''
                    acceptance[i].appendChild(a)

                }

                else acceptance[i].innerText = 'Not Found'
            }
        }, 1000)

        //
        setTimeout(() => {
            document.querySelector(".flex.flex-wrap.items-center").innerHTML = "Acceptance , Submission , Acceptance Rate : HIDDEN"
        }, 1000)

        //
        setTimeout(() => {
            if (data.length && count) {
                console.log('adding')
                data.forEach(element => {
                    var a = document.createElement('div')
                    a.innerHTML = element
                    a.className = 'relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80'
                    console.log(document.querySelectorAll(".flex.gap-1"))
                    document.querySelectorAll(".flex.gap-1")[7].appendChild(a)
                })
                count -= 1

            }
        }, 2000)
    }
}
