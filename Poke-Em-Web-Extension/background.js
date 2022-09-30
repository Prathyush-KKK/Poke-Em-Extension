var urls = {};
var currentUrl = null;
var currentTabId = null;
var currentFocus = true;
var currentDay = null;
var startTime = null;
var MAX_TOP_URLS = 50;

function resetWindowData() {
    "use strict";
    urls = {};
    currentUrl = null;
    currentTabId = null;
    startTime = null;
}

function resetDay(d) {
    "use strict";
    var today = d.getDay();

    if (currentDay !== null && currentDay !== today) {
        resetWindowData();
    }
    currentDay = today;
}

function getCanonicalUrl(url) {
    "use strict";
    var parse = document.createElement("a");
    parse.href = url;
    return parse.hostname;
}

function updateCurrentTime() {
    "use strict";
    var d = new Date();

    resetDay(d);
    if (currentUrl === null) {
        return;
    }

    var now = d.getTime();
    var delta_time = now - startTime;

    if (currentUrl in urls) {
        urls[currentUrl] += delta_time;
    } else {
        urls[currentUrl] = delta_time;
    }

    startTime = now;
}

function updateUrls(url) {
    "use strict";
    if (url.indexOf("chrome://") !== -1) {
        return;
    }

    url = getCanonicalUrl(url);
    if (currentUrl === url) {
        return;
    }

    if (currentUrl === null) {
        var d = new Date();
        var now = d.getTime();
        startTime = now;
    } else {
        updateCurrentTime();
    }
    currentUrl = url;
}

function tabUpdated(tabId, changeInfo, tab) {
    "use strict";
    if (tabId === currentTabId && tab.url !== null) {
        updateUrls(tab.url);
    }
}

function tabActivated(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        currentTabId = activeInfo.tabId;
        updateUrls(tab.url);
    });
}

function checkBrowserFocus() {
    chrome.windows.getCurrent(function (browser) {
        if (!browser.focused && currentFocus) {
            updateCurrentTime();
            currentFocus = false;
        } else if (browser.focused && !currentFocus) {
            currentFocus = true;
            if (startTime !== null) {
                var d = new Date();
                var now = d.getTime();
                startTime = now;
            }
        }
    });
}

chrome.tabs.onActivated.addListener(tabActivated);
chrome.tabs.onUpdated.addListener(tabUpdated);
window.setInterval(checkBrowserFocus, 1000);

function sortUrls() {
    "use strict";
    if (urls === null) {
        return [];
    }

    // Create items array
    var items = Object.keys(urls).map(function (key) {
        return [key, urls[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
        return second[1] - first[1];
    });

    return items;
}



function getTopUrls() {
    "use strict";
    updateCurrentTime();
    var topUrls = sortUrls();
    return topUrls.slice(0, Math.min(MAX_TOP_URLS, topUrls.length));
}

