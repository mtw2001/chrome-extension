// Credit to Pavel Bucka for the large portion of this code, available at:
// https://dev.to/penge/learn-the-most-useful-chrome-apis-by-creating-block-site-chrome-extension-2de8

console.log("background running");
  
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    console.log("new page detected")
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith("http")) {
      return;
    }

    const hostname = new URL(url).hostname;
  
    chrome.storage.local.get(["urllist", "toggle"], function (local) {
        const urllist = local.urllist;
        const toggle = local.toggle;
        if (Array.isArray(urllist) && toggle && urllist.find(domain => hostname.includes(domain))) {
            chrome.tabs.remove(tabId);
        }
    });
});