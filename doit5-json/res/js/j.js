/* AR */
// letsee.init(); // letsee 엔진 초기화
// letsee.ready(() => { // letsee 엔진 초기화 후 실행하는 콜백 함수 등록 
//     letsee.start() // 카메라 stream 얻어옴
// });
// letsee.onTrackStart(e => {
//     if (!_diceBtn) {
        // diceEff();
        // termBtn(); // 텀을 두고 나타나는 버튼

//     }
// })

var user_key = "";
window.addEventListener('message', getPostMessage, false);
function getPostMessage(e) {
    if (e.data) {
        console.log(e.data);
        var data = JSON.parse(e.data);
        if (data.type == "start") {
            if (!_diceBtn) {
                user_key = data.user_key;
                // diceEff();
                termBtn(); // 텀을 두고 나타나는 버튼
            }
        }
    }
}

/* howler snd */
var sndDice = new Howl({
    src: ['./res/snd/dice.mp3'],
    volume: 1
});
var sndBtn = new Howl({
    src: ['./res/snd/pop3.mp3'],
    volume: 1
});


/***************** init ****************/
var _diceBtn = false; // 주사위굴리기버튼 클릭여부
var _diceStop = false; // 팝업창 떴는지 여부

var _link = {
    0: 'deeplink1'
}

function diceEff() {
    $('#diceFX').addClass('diceFX');
}
function termBtn() {
    // setTimeout(function() {
        $('#diceBtn').removeClass('_none');
    // }, 600);
}

// 버튼클릭하면 주사위 굴러감
$('#diceBtn').on('click', function() {
    _diceBtn = true;
    sndBtn.play()
    sndDice.play()

    moveDice()
})
function moveDice() {
    $('#diceBtn').addClass('_none'); // 버튼없애기
    $("#diceImg").attr("src", "./res/img/dummy.png"); // 주사위 이미지없애기

    // backimg주사위굴리기
    var r = random(1, 3)
    $("#diceImg").addClass(`secDice${r}`); 

    // 애니메이션멈추는것 테스트
    // setTimeout(function() {
    //     resultSuc(0);
    // }, 4000)
    serverEvent();
}



/********************************** 통신 *************************************/


// 서버통신
// const user_key = {user_key : get_query().user_key};
// console.log(get_query());

function serverEvent() {
    $.ajax({
        url : "../a08419a1-2f6b-cc5e-a67e-bd264b25dc83/prizeResult.php",
        type : 'POST',
        data : {
            user_key: user_key,
        },
        success:function(obj){
            // if(data.error == 0){testSer
                var data = JSON.parse(obj);

                // 주사위 멈추기
                $('#diceImg').css({"animation-iteration-count": "3"}); // 주사위멈추기

                // 주사위결과
                setTimeout(function() {
                    stopDice(data);
                }, 2700)

            // }
            // else if(data.error == 95){
            //     alert("현재 접속이 원할하지 않습니다.\n잠시후 다시 시도해 주세요.");
            // }else if(data.error== 90){
            //     alert("시스템 점검 중입니다.\n잠시후에 이용해 주세요.");
            // }
        },
        fall:function(data){
            alert("현재 접속이 원할하지 않습니다.\n잠시후 다시 시도해 주세요.");
        }
    });
}

// 주사위결과
function stopDice (data) {
    
    // 주사위결과
    var b = data.prize.brand;
    if (b == 'BR') { // 분홍_베라
        $("#diceImg").attr("src", "./res/img/dice_p2.png");
    } else if (b == 'DD') { // 주황_던킨
        $("#diceImg").attr("src", "./res/img/dice_dd2.png");
    } else { // 파랑_모두의마블
        $("#diceImg").attr("src", "./res/img/dice600.png");
    }

    // 굴러가는 주사위 background img 없애기
    $("#diceImg").css("background-image", 'url("")');

    // 주사위 멈추고 결과팝업
    setTimeout(function() {
        parentPost(data);
    }, 3000)
}

function parentPost(data) {
    var _isDev = false;
    if (window.location.host == 'dev.doit5.com') _isDev = true;

    var postUri = "https://doit5.com";
    if (_isDev) {
        postUri = "https://dev.doit5.com";
    }

    window.parent.postMessage(data, postUri);
}





/********************************** 함수 *************************************/
// 랜덤 난수 함수
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}