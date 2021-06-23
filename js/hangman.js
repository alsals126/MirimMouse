/*------------- constants -------------*/
var words = [
    'MIRIM',
    'MEISTER',
    'HIGH SCHOOL',
    'SOFTWARE',
    'WEB SOLUTION',
    'DESIGN',
    'IT SHOW',
    'JEONG MIN',
    'MIN JUNG',
    'SHIN SU',
    'EMPLOYMENT',
    'SUCCESS'

];

/*------------- app's state -------------*/
var secretWord, wrongCount, guess;

/*------------- cached element references -------------*/
var $guess = $('#guess');
var $img = $('#hang-img');
var $message = $('#message');

/*------------- event listeners -------------*/
$('#letters').on('click', handleLetterClick);

$('#reset').on('click', initialize);

/*------------- functions -------------*/
initialize();

function initialize() {
    wrongCount = 0;
    secretWord = words[getRandomInt(words.length - 1)];

    guess = "";

    for (var i = 0; i < secretWord.length; i++) {
        var currentLetter = secretWord[i];
        if (currentLetter === " ") {
            guess += " "
        } else {
            guess += "_";
        }
    };

    $('button.letter-button').prop('disabled', false);
    render();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function render() {
    $guess.html(guess);
    $('#wrong').html(`WRONG GUESSES: ${wrongCount}`);
    $img.attr('src', '../img/HangmanGame/mouse' + wrongCount + '.gif')

    if (guess === secretWord) {
        $(".lastSEC").show();
        $message.html("축하합니다!!암호를 찾으셨어요^^");
        $message.fadeIn();
    } else if (wrongCount === 6) {
        $message.html("암호를 찾지 못하였네요..다시 하시겠어요?");
        $message.fadeIn();
    } else {
        $message.html("")
        $message.hide();
    }
}

function handleLetterClick(evt) {
    if (wrongCount === 6) return;

    var letter = evt.target.textContent;
    console.log(secretWord);
    if (secretWord.includes(letter)) {
        var pos = secretWord.indexOf(letter);
        while (pos >= 0) {
            guess = guess.split('');
            guess[pos] = letter;
            guess = guess.join('');
            pos = secretWord.indexOf(letter, pos + 1);
        }
    } else {
        if (evt.target.id !== "reset") {
            wrongCount++;
        }
    }

    $(evt.target).prop('disabled', true);
    $('#reset').prop('disabled', false);
    render();
}

$(function(){
    // ? 클릭시 모달
    $(".howtoUSE").click(function(){
        $(".modal").show();
    });
    //.modal안에 button을 클릭하면 .modal닫기
    $(".modal button").click(function(){
        $(".modal").hide();
    });

    //.modal밖에 클릭시 닫힘
    $(".modal").click(function (e) {
        if (e.target.className != "modal") {
            return false;
        } else {
            $(".modal").hide();
        }
    });
});

function home(){
    if(confirm('게임이 저장되지 않고 화장실로 돌아갑니다.\n그래도 계속하시겠습니까?') == true)
        location.replace('toilet1.html')
    else
        return;
}