let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

function startGame() {
    if (started == false) {
        started = true;
        console.log("game started");
        levelup();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }

    } else {

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {

    // game start hone se pehle click ignore hoga
    if (started == false) {
        return;
    }

    console.log(this);

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
