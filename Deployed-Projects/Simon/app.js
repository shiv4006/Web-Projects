let buttons = ["red", "blue", "yellow", "green"];
let generatedSequence = [];
let inputSequence = [];
let gameStarted = false;
let level = 0;

let h3 = document.querySelector(".main h3");
document.addEventListener("keydown", (e) => {
    if(!gameStarted) {
        gameStarted = true;
        playGame();
    }
});

function randomFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function playGame() {
    level++;
    h3.innerHTML = `Level ${level}`;

    inputSequence = [];
    let randomIndex = Math.floor(Math.random()*4);
    let randomColor = buttons[randomIndex];
    generatedSequence.push(randomColor);

    let randomButton = document.querySelector(`.${randomColor}`);
    randomFlash(randomButton);
}

function inputFlash(btn) {
    btn.classList.add("usrFlash");
    setTimeout(() => {
        btn.classList.remove("usrFlash");
    }, 250);
}

function checkSequence(ind) {
    if(generatedSequence[ind] == inputSequence[ind]) {
        if(generatedSequence.length == inputSequence.length) {
            setTimeout(playGame, 500);
        }
    }
    else {
        if(level < 5) {
            h3.innerHTML = `<strong>Game Over</strong>😔 Your score was <strong>${level}</strong>. <br>Press a key to start again.`;
        }
        else if(level < 10) {
            h3.innerHTML = `<strong>Game Over</strong>😊 Your score was <strong>${level}</strong>. <br>Press a key to start again.`;
        }
        else {
            h3.innerHTML = `<strong>Game Over</strong>😎 Your score was <strong>${level}</strong>. <br>Press a key to start again.`;
        }
        reset();
    }
}

function btnPress() {
    let btn = this;
    inputFlash(btn);

    let btnColor = btn.getAttribute("id");
    inputSequence.push(btnColor);

    checkSequence(inputSequence.length-1);
}

let btns = document.querySelectorAll(".btn");
for(btn of btns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    level = 0;
    gameStarted = false;
    generatedSequence = [];
}