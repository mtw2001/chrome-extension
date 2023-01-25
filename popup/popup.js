const toggle = document.getElementById("toggle");
const urllist = document.getElementById("urllist");
const save = document.getElementById("save");

window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("toggle", (result) => { 
        console.log("Retrieved value is " + result.toggle);
        toggle.checked = result.toggle;
    });
    chrome.storage.local.get("urllist", (result) => { 
        console.log("Retrieved URL list contains: " + result.urllist);
        if (result.urllist != undefined) {
            urllist.value = result.urllist.join("\n");
        }
    });
});

toggle.addEventListener("click", (event) => {
    chrome.storage.local.set({"toggle": toggle.checked});
    console.log("Value of toggle has been set to " + toggle.checked);
});

save.addEventListener("click", (event) => {
    const blocklist = urllist.value.split("\n");
    chrome.storage.local.set({"urllist": blocklist});
    console.log("URL list saved and contains: " + blocklist);
});
