// function to get random color
function getColor() {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    let a = Math.random();

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//function to add new subject into the list
function addSubject(title, about) {
    let mainSection = document.querySelector(".main-section");
    const cnt = mainSection.childElementCount;

    let div = document.createElement("div");
    div.classList.add("card");

    let img = document.createElement("img");
    img.src = (cnt & 1) ? "./assets/undraw_Maintenance_re_59vn.png" : "./assets/undraw_Dev_productivity_re_fylf.png";
    div.appendChild(img);

    let h2 = document.createElement("h2");
    h2.innerHTML = title;
    div.appendChild(h2);

    let p = document.createElement("p");
    const addText = document.createTextNode(about);
    p.append(addText);
    div.appendChild(p);

    mainSection.append(div);
}

// setting random background color to each card
let cards = document.querySelectorAll(".card");
for(let card of cards)
    card.style.backgroundColor = getColor();

// handling form submit
let form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    
    let title = data.get("heading");
    let about = data.get("description");
    
    addSubject(title, about);
});