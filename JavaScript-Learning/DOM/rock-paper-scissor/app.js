let arr = ["rock", "paper", "scissor"];
let p1 = 0, p2 = 0;

function wins(player, computer) {
    if(player == "rock" && computer == "scissor")
        return true;
    if(player == "paper" && computer == "rock")
        return true;
    if(player == "scissor" && computer == "paper")
        return true;

    return false;
}

document.querySelector(".box").addEventListener("click", (e) => {
    const computer = Math.floor(Math.random()*3);
    const computerTurn = arr[computer];
    let playerTurn = "";

    for(clas of arr) {
        if(e.target.classList.contains(clas)) {
            playerTurn = clas;
            break;
        }

    }

    let para = document.querySelector(".moves");
    para.innerHTML = `Your Turn: ${playerTurn}, Computer Turn: ${computerTurn}`;

    let result = document.querySelector(".value");
    if(wins(playerTurn, computerTurn)) {
        p1++;
        console.log("p1 => ", p1);
        let span = document.querySelector(".play");
        span.innerText = `Player: ${p1}`;

        result.innerHTML = `🎉You won`;
    }
    else if(wins(computerTurn, playerTurn)) {
        p2++;
        console.log("p1 => ", p2);
        let span = document.querySelector(".comp");
        span.innerHTML = `Computer: ${p2}`;

        result.innerHTML = `😔Computer won`;
    }
    else {
        result.innerHTML = `🤣Game draw`;
    }
    // let span = document.querySelector(".comp");
    // span.innerHTML = `Computer: ${p2}`;
});