let turn = true;
let boxes = document.querySelectorAll(".item");
const clsses = ['one', 'two', 'three', 'four', 'five', 'six',
    'seven', 'eight', 'nine'];

let cnt = 0;
for(let box of boxes) {
    box.addEventListener("click", (e) => {
        if(cnt == 0) {
            let winner = document.querySelector(".container span");
            winner.innerHTML = "";
        }
        cnt++;

        for(let i=0; i<9; i++) {
            if(box.classList.contains(clsses[i])) {
                let boxNumber = document.querySelector(`.${clsses[i]}`);
                let text = boxNumber.innerHTML;
                if(!text.length) {
                    let h3 = document.querySelector("h3");
                    if(turn) {
                        boxNumber.innerHTML = 'X';
                        h3.innerHTML = "Turn: Player 2";
                    }
                    else {
                        boxNumber.innerHTML = 'O';
                        h3.innerHTML = "Turn: Player 1";
                    }
                    // console.log("hello");
                    
                    if(solved()) {
                        let winner = document.querySelector(".container span");
                        if(turn) {
                            winner.innerHTML = "🎉Player 1 Wins";
                            clear()
                        }
                        else {
                            winner.innerHTML = "🎉Player 2 Wins";
                            clear();
                        }
                    }
                    else if(cnt >= 9) {
                        let winner = document.querySelector(".container span");
                        winner.innerHTML = "😔Game Draw";
                        clear();
                    }
                    else
                        turn = !turn;
                }
            }
        }
    });
}

function clear() {
    for(let i=0; i<9; i++) {
        let boxNumber = document.querySelector(`.${clsses[i]}`);
        boxNumber.innerHTML = "";
    }
    
    cnt = 0;
    turn = true;
    let h3 = document.querySelector("h3");
    h3.innerHTML = "Turn: Player 1";
}

function solved() {
    const one = document.querySelector(".one").innerHTML;
    const two = document.querySelector(".two").innerHTML;
    const three = document.querySelector(".three").innerHTML;
    const four = document.querySelector(".four").innerHTML;
    const five = document.querySelector(".five").innerHTML;
    const six = document.querySelector(".six").innerHTML;
    const seven = document.querySelector(".seven").innerHTML;
    const eight = document.querySelector(".eight").innerHTML;
    const nine = document.querySelector(".nine").innerHTML;

    if(one.length && one == two && two == three)
        return true;
    if(four.length && four == five && five == six)
        return true;
    if(seven.length && seven == eight && eight == nine)
        return true;
    if(one.length && one == four && four == seven)
        return true;
    if(two.length && two == five && five == eight)
        return true;
    if(three.length && three == six && six == nine)
        return true;
    if(one.length && one == five && five == nine)
        return true;
    if(three.length && three == five && five == seven)
        return true;

    return false;
}