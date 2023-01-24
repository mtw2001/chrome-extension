const blockedurls = document.getElementById("blockedurls");
const save = document.getElementById("save");
const toggle = document.getElementById("toggle")

save.addEventListener("click", () => {
    const blocked = blockedurls.value.split("\n").map(s => s.trim()).filter(Boolean);
    chrome.storage.local.set({blocked});
});

toggle.addEventListener("click", (event) => {
    const enabled = event.target.checked;
    chrome.storage.local.set({enabled});
})

window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["blocked", "enabled"]), function (local) {
        const {blocked, enabled} = local;
        if (Array.isArray(blocked)) {
            blockedurls.value = blocked.join("\n");
            toggle.checked = enabled;
        }
    }
})