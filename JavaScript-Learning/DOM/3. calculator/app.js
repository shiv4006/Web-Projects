let btns = document.querySelectorAll(".fa-solid");
for(let btn of btns) {
    btn.addEventListener("click", (e) => {
        let input = document.querySelector(".input-text");
        let output = document.querySelector(".output-text");
        
        if(btn.classList.contains("calculate")) {
            // calculate result and display
            try {
                const ans = eval(input.innerHTML);
                output.innerHTML = ans;
            } catch (e) {
                console.log("Invalid Expression");
            }
        }
        else if(btn.classList.contains("all-clear")) {
            // clear everything
            input.innerHTML = "";
            output.innerHTML = "";
        }
        else if(btn.classList.contains("erase")) {
            // erase last input
            let str = input.innerHTML;
            str = str.slice(0, str.length-1);
            input.innerHTML = str;

            output.innerHTML = "";
        }
        else {
            // add into input
            let str = input.innerHTML;
            
            if(btn.classList.contains("divide"))
                str += "/";
            else if(btn.classList.contains("multiply"))
                str += "*";
            else if(btn.classList.contains("minus"))
                str += "-";
            else if(btn.classList.contains("plus"))
                str += "+";
            else {
                let digit = btn.innerHTML;
                str += digit;
            }

            input.innerHTML = str;
            output.innerHTML = "";
        }
    });

}

document.addEventListener("keypress", (e) => {
    let input = document.querySelector(".input-text");
    let output = document.querySelector(".output-text");
    
    const code = e.keyCode || e.charCode;
    if(e.key == 'Backspace') {
        let str = input.innerHTML;
        str = str.slice(0, str.length-1);
        input.innerHTML = str;
    }
    const ch = e.key;
    const toAdd = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '.', '(', ')'];
    if(toAdd.includes(ch)) {
        let str = input.innerHTML;
        str += ch;
        input.innerHTML = str;
    }
    else if(code == 8 || code == 46) {
        console.log("erasee key pressed");
    }
    else if(e.key == 'Enter') {
        output.innerHTML = eval(input.innerHTML);
    }
});