const firebaseConfig = {
    apiKey: "AIzaSyC_u7W0pnKmAP_AiCnzv776D6cdzrSdoik",
    authDomain: "poke-em.firebaseapp.com",
    projectId: "poke-em",
    storageBucket: "poke-em.appspot.com",
    messagingSenderId: "646317027134",
    appId: "1:646317027134:web:b7687edeefa9195226c66f",
    measurementId: "G-8V2B0B7TP1"
};
firebase.initializeApp(firebaseConfig);
const urlArray = ["triller", "periscope", "vimeo", "valence", "untappd", "elpha", "yubo", "peanut", "houseparty", "caffeine", "steemit", "baidu tieba", "snaps", "likee", "tracks", "academia", "amikumu", "anobii", "asmallworld", "athlinks", "band", "bebee", "blind", "diaspora", "fark", "mewe", "facebook", "instagram", "twitter", "tumblr", "linkedin", "whatsapp", "snapchat", "pinterest", "reddit", "youtube", "mix", "tagged", "nextdoor", "deviantart", "quora", "meetup", "reverbnation", "flixster", "goodreads", "twitch", "caringbridge", "wattpad", "viadeo", "crunchyroll", "skyrock", "vk", "myheritage", "livejournal", "classmates", "soundcloud", "bubbly", "flickr", "we heart it", "influenster", "filmaffinity", "open diary", "yelp", "collegehumor", "gaia online", "mocospace", "couchsurfing", "funny or die", "italki", "etoro", "xing", "meetme", "ravelry", "care", "yy", "vero", "medium", "netflix", "prime video", "giphy", "giphy", "tribe", "tencent qq", "wechat", "qzone", "tiktok", "sina weibo", "kuaishou", "skype", "viber", "line", "line play", "the dots", "telegram", "foursquare swarm", "douban", "discord", "badoo", "myspace", "mixi", "ravelry", "cellufun", "xanga", "imgur", "ello", "wt social", "behance", "blogher", "dribbble", "letterboxd", "houzz", "stack overflow", "instructables", "cafemom", "dogster", "goodwall", "law link", "wayn", "supernatural connections", "octi", "clubhouse", "clouthub", "twitter spaces", "halloapp", "polywork", "poparazzi", "honk", "myanimelist", "barista exchange", "flip", "rumble", "stage ", "microsoft teams", "patreon", "spotify live", "substack"];
let total = 0;
let nameArr = new Array();
let timeArr = new Array();

function msToTime(ms) {
    var date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function getApps(topUrls) {    //display each app and used time
    var newDivs = "";
    for (var i = 0; i < topUrls.length; i++) {

        var url = topUrls[i];
        var rawUrl = url[0].replace(/.+\/\/|www.|\..+/g, '');
        var finUrl = rawUrl.charAt(0).toUpperCase() + rawUrl.slice(1);
        if (urlArray.indexOf(rawUrl) !== -1) {
            total += url[1];
            nameArr[i] = finUrl;
            timeArr[i] = msToTime(url[1]);
            const db = firebase.firestore();
            db.collection("data").doc("UsageData").collection("WebApps").doc(finUrl).set({
                time: timeArr[i]
            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

            newDivs += "<div id=\"listWrapper\">" + "<div id=\"nameApp\">" + finUrl + "</div>" + "<div id=\"timeUsed\" >" + msToTime(url[1]) + "</div>" + "</div>";
        }
    }

    if (total == 0)
        newDivs = "No social sites visited yet :)";

    return newDivs;
}

function totalTime() {       //total time used
    var timer = document.querySelectorAll("#totalTime")[0];
    timer.innerHTML = msToTime(total);
}

function settingSelector() {     //settings button
    document.querySelector('#settings').addEventListener('click', function () {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('./../html/timer.html'));
        }
    });
}



document.addEventListener("DOMContentLoaded", function () {
    var bg = chrome.extension.getBackgroundPage();
    var topUrls = bg.getTopUrls();
    document.getElementById("top_urls").innerHTML = getApps(topUrls);
    totalTime();
    settingSelector();
});
