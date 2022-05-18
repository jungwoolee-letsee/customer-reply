var goUrl = "../game";
postUri = "https://doit5.com";
if (isDev()) {
    postUri = "https://dev.doit5.com";
}

function isDev() {
    if (location.host == "dev.doit5.com" || location.host == "localhost:8888" ) {
        return true;
    }
    return false;
}

var chk = 0;
function success() {
    if (chk == 0) {
        chk = 1;
        // location.href = goUrl;
        parentPost();
    }
}

var effect_cnt = 0;
function start_effect() {
    createMandarin = setInterval(function () {
        if (effect_cnt == 0) {
            success_effect();
        }
    }, 150);
    
    var cnt = 1;
    setTimeout(function () {
        effect_cnt = 1;
        clearInterval(createMandarin);
        stopSound();
    }, 4000);

    success();
}


function success_effect() {
    var randomNum = Math.random() * 3;
    var randomNumFloor = Math.floor(randomNum) + 1;

    var randomX = Math.random() * 75;
    var randomXFloor = Math.floor(randomX);

    var mandarin = `<img class="mandarin" src="./res/imgs/mandarin_0${randomNumFloor}.png" style="left: ${randomXFloor}%;">`;
    $(".mandarin-form").append(mandarin);
    $(".mandarin").animate({ 'bottom': 0 }, 700);
}

// send post message
window.addEventListener('message', getPostMessage, false);
function getPostMessage(e) {
    if (e.data == 1) {
        start_effect();        
    }
}

function parentPost() {
    var data = 1;
    window.parent.postMessage(data, postUri);
}

function stopSound() {
    var data = "stopSnd";
    window.parent.postMessage(data, postUri);
}