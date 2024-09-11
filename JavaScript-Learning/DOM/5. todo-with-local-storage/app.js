let db = [];
let inputText = document.querySelector(".input-text");
let lists = document.querySelector(".lists");

function addIntoStorage(s) {
    return localStorage.setItem("todo", JSON.stringify(s));
}
function getFromStorage() {
    return JSON.parse(localStorage.getItem("todo")) || [];
}

function addIntoList() {
    let s = inputText.value;
    s = s.trim();

    db = getFromStorage();

    if(s.length && !db.includes(s)) {
        db.push(s);
        let liEle = document.createElement("li");
        liEle.innerHTML = s;
    
        lists.append(liEle);
        addIntoStorage(db);
        inputText.value = "";
    }
}

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    addIntoList();
})

function deleteData (e) {
    // console.log(e.target.innerText);

    let newDB = db.filter((curr) => curr !== e.target.textContent);
    addIntoStorage(newDB);
    db = newDB;

    lists.removeChild(e.target);
}

document.querySelector(".lists").addEventListener("click", (e) => {
    deleteData(e);
});

const showData = () => {
    db = getFromStorage();

    for(data of db) {
        const liEle = document.createElement("li");
        liEle.innerHTML = data;
        lists.append(liEle);
    }
}

showData();