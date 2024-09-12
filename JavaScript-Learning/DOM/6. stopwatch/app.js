const btn = document.querySelector("button");
let hour = document.querySelector(".hours");
let minute = document.querySelector(".minutes");
let second = document.querySelector(".seconds");
let milisecond = document.querySelector(".miliseconds");

let cnt = 0;
let timer;
function startTimer() {
    second.innerText = "00";
    minute.innerText = "00";
    hour.innerText = "00";
    timer = setInterval(() => {
        let ms = Number(milisecond.innerText);
        let s = Number(second.innerText);
        let m = Number(minute.innerText);
        let h = Number(hour.innerText);
        ms++
        
        if(ms > 60) {
            s++;
            ms = 0;
        }
        if(s > 60) {
            m++;
            s = 0;
        }
        if(m > 60) {
            h++;
            m = 0;
        }

        // console.log(ms, " ", s, " ", m, " ", h);
        milisecond.innerText = ms < 10 ? "0" + String(ms) : ms;
        second.innerText = s < 10 ? "0" + String(s) : s;
        minute.innerText = m < 10 ? "0" + String(m) : m;
        hour.innerText = h < 10 ? "0" + String(h) : h;
    }, 16.6);
}

function stopTimer() {
    clearInterval(timer);
}

btn.addEventListener("click", (e) => {
    cnt++;
    const s = btn.innerText;
    // console.log("btn was clicked", s, " ", cnt);

    if(s == "Start" && (cnt & 1)) {
        startTimer();
        btn.innerText = "Stop";
    }
    else if(s == "Stop" && !(cnt & 1)){
        stopTimer();
        btn.innerText = "Start";
    }
});