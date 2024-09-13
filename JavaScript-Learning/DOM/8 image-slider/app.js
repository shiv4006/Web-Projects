let images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const n = 12;
let pos = 0;

let container = document.querySelector(".container");
container.addEventListener("click", (e) => {
    let target = e.target;
    if(target.classList.contains("fa-less-than")) {
        pos = (n + (pos-1) % n) % n;
    }
    else if(target.classList.contains("fa-greater-than")) {
        pos = (pos + 1) % n;
    }
    else {
        // console.log(target.classList);
        target.classList.toggle("img-click");
    }

    const img = document.querySelector("img");
    img.src = `./assets/img${images[pos]}.jpg`;
});