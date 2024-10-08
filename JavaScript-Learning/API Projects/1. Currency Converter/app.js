let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-10-05/v1/currencies/usd.json";

let input = document.querySelector(".input-text");
let btn = document.querySelector(".btn");
let selectAll = document.querySelectorAll("select");

let fromCurrency = document.querySelector("#from");
let toCurrency = document.querySelector("#to");

for(select of selectAll) { // traversing both select one by one
    for(let currency in countryList) { // filling every available countries to both selects
        let option = document.createElement("option");
        option.innerText = currency;
        option.setAttribute("value", currency);

        // selecting usd and inr for both select respectively
        if(select.name === "from" && currency === "USD")
            option.setAttribute("selected", "");
        else if(select.name === "to" && currency === "INR")
            option.setAttribute("selected", "");
        
        select.append(option);
    }
    
    select.addEventListener("change", (e) => { // handling click and select on each select
        updateFlag(e.target);
    });
}

const updateFlag =  (element) => { // updating flag of selected country
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    // console.log(currencyCode, countryCode);
    
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amount = document.querySelector("form .amount");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 0) {
        amountVal = 0;
        amount.value = "0";
    }
    
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate() - 1).toString();
    
    if(day < 10) day = "0" + day;
    if(month < 10) month = "0" + month;

    let newUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${year}-${month}-${day}/v1/currencies/${fromCurrency.value.toLowerCase()}.json`;
    // fetch(newUrl)
    // .then(Response => Response.json())
    // .then(data => console.log(data));    

    let response = await fetch(newUrl);
    let data = await response.json();
    
    // recieved data from api in object format so to extract exact info we to take value of that object
    let allRates = Object.values(data)[1]; // stores the rate for all currencies from fromcurrency
    // console.log(allRates);
    // console.log(allRates['inr']);
    // console.log(toCurrency.value, allRates[toCurrency.value.toLowerCase()]);
    
    let rate = allRates[toCurrency.value.toLowerCase()]; // rate will store rate for the current change fromcurrency to tocurrency
    let result = (amountVal * rate).toFixed(2);
    // console.log(amountVal, rate, result);

    let div = document.querySelector(".output-text");
    div.innerHTML = `<p><b>${amountVal}</b> ${fromCurrency.value} = <b>${result}</b> ${toCurrency.value}</p>`;
});

// async function initialValueOfUSDtoINR {
//     let response = await fetch(newUrl);
//     let data = await response.json();
//     let allRates = Object.values(data)[1];
//     // console.log(allRates);
//     // console.log(allRates['inr']);
//     // console.log(toCurrency.value, allRates[toCurrency.value.toLowerCase()]);
//     let rate = allRates[toCurrency.value.toLowerCase()];
//     let result = (amountVal * rate).toFixed(2);
//     // console.log(amountVal, rate, result);

//     let div = document.querySelector(".output-text");
//     div.innerHTML = `<p><b>${amountVal}</b> ${fromCurrency.value} = <b>${result}</b> ${toCurrency.value}</p>`;
// }

// initialValueOfUSDtoINR();