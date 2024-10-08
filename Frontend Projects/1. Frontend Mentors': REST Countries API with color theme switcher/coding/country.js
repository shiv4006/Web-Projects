const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('name');

let darkMode = false;
let modebtn = document.querySelector(".navbar p");

modebtn.addEventListener('click', (e) => {
    if(modebtn.innerText == "Dark Mode") {
        modebtn.innerHTML = `<i class="fa-regular fa-sun"></i>Light Mode`;
        darkMode = true;
    } else {
        modebtn.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
        darkMode = false;
    }

    document.querySelector(".navbar").classList.toggle("dark-nav");
    document.querySelector("body").classList.toggle("dark");
    document.querySelector("button").classList.toggle("dark-button");
    let borderCountries = document.querySelectorAll(".borders a");
    
    borderCountries.forEach(country => {
        country.classList.toggle("dark-border-cntry");
    });
})



url = `https://restcountries.com/v3.1/name/${myParam}?fullText=true`;
// console.log(url);

function fillData(data) {
    // console.log(data);

    let flag = document.querySelector(".flag");
    flag.src = `${data.flags.svg}`;
    
    let name = document.querySelector(".name");
    name.innerHTML = data.name.common;

    let nativeName = document.querySelector(".native-name");
    nativeName.innerHTML = `<b>Native Name: </b>${data.name.official.length > 25 ? data.name.official.substring(0, 25) + "..." : data.name.official}`;

    let population = document.querySelector(".population");
    population.innerHTML = `<b>Population: </b>${data.population.toLocaleString('en-IN')}`;

    let region = document.querySelector(".region");
    region.innerHTML = `<b>Region: </b>${data.region}`;
    
    let subRegion = document.querySelector(".subregion");
    subRegion.innerHTML = `<b>Sub Region: </b>${data.subregion}`;

    let capital = document.querySelector(".capital");
    capital.innerHTML = `<b>Capital: </b>${data.capital?.[0]}`;

    let topLevelDomain = document.querySelector(".tld");
    topLevelDomain.innerHTML = `<b>Top Level Domain: </b>${data.tld}`;
    
    let languages = document.querySelector(".languages");
    languages.innerHTML = `<b>Languages: </b>${Object.values(data.languages).join(", ")}`;

    let currency = document.querySelector(".currencies");
    if(data.currencies) {
        currency.innerHTML = `<b>Currency: </b>${Object.values(data.currencies).map((currency => currency.name)).join(", ")}`;
    } else {
        currency.innerHTML = "";
    }

    let borderCountries = document.querySelector(".borders");
    if(data.borders) {
        let borderCodes = Object.values(data.borders);
        borderCodes.forEach(borderCode => {
            // const newUrl = `https://restcountries.com/v3.1/alpha/${borderCode}`;
            fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                .then((res) => res.json())
                .then(([borderCountry]) => {
                    // console.log(borderCountry.name.common);
                    let a = document.createElement("a");
                    a.href = `/rest-countries-api-with-color-theme-switcher-master/coding/country.html?name=${borderCountry.name.common}`;
                    a.innerText = borderCountry.name.common;

                    // console.log(a);
                    borderCountries.append(a);
                })
        });
    }
        
}

async function getDataFromApi() {
    let response = await fetch(url);
    let data = await response.json();

    // console.log(data[0].name.official);
    fillData(data[0]);
}

getDataFromApi();