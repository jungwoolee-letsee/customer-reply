// get post message
var goUrl = "../game";

var mandarinSnd = new Howl({
    src: ["./res/audio/mandarinSnd.mp3"], // 브금
    volume: 0.3,
    rate: .5,
    loop: true
  });

function getPostMessage(e) {
    if (e.data == 1) {
        setTimeout(function () {
            // window.location.replace(goUrl);
        }, 5000);
    }
    else if (e.data == "stopSnd") {
        console.log("ㅇㅇ132");
        mandarinSnd.stop();
    }
}