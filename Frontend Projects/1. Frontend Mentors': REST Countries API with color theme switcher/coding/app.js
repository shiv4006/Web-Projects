let url = "https://restcountries.com/v3.1/all";
let allCountriesData;

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
    document.querySelector(".search").classList.toggle("dark-search");
    document.querySelector(".search").classList.toggle("search-input-dark");
    document.querySelector(".filter-container").classList.toggle("dark-filter");


    let cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        // console.log(card.childNodes[3]);

        if(darkMode) {
            card.classList.add("dark-card");
            card.childNodes[3].classList.add("card-details-dard");
        }
        else {
            card.classList.remove("dark-card");
            card.childNodes[3].classList.remove("card-details-dard");
        }
    });
})

// Rendering data came from API to the screen...
function fillScreen(data) {
    let cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";
    data.forEach(element => {
        const name = element.name.common;
        const region = element.region;
        const population = element.population.toLocaleString('en-IN');
        const capital = element.capital?.[0];
        const flag = element.flags.svg;
        // console.log(name, population, capital);

        let newCountry = document.createElement("a");
        newCountry.classList.add("card");
        
        if(darkMode)
            newCountry.classList.add("dark-card");
        else
            newCountry.classList.remove("dark-mode");

        newCountry.href = `/rest-countries-api-with-color-theme-switcher-master/coding/country.html?name=${name}`;
        newCountry.innerHTML = `
                <img src="${flag}" alt="flag">
                <div class="card-details">
                    <h3>${name}</h3>
                    <p><b>Population: </b>${population}</p>
                    <p><b>Region: </b>${region}</p>
                    <p><b>Capital: </b>${capital}</p>
                </div>`;
        cardContainer.append(newCountry);
    });
    // console.log(data);
}

// getting data from API...
async function getApiData(value) {
    if(value == "") {
        let response = await fetch(url);
        let data = await response.json();
        allCountriesData = data;
        // console.log(data);
        fillScreen(data);
    }
    else {
        const regionURL = `https://restcountries.com/v3.1/region/${value}`;
        let response = await fetch(regionURL);
        let data = await response.json();
        allCountriesData = data;
        // console.log(data);
        fillScreen(data);
    }
}

// Applying filter method...
let filter = document.querySelector("#filter");
filter.addEventListener('change', (e) => {
    let filteredRegion = e.target.value;
    getApiData(filteredRegion);
});

// Applying search functionality...
let search = document.querySelector(".search-input");
search.addEventListener('input', (e) => {
    // console.log(e.target.value);
    
    let newData = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    // console.log(newData);
    fillScreen(newData);
})

// main method for API calling...
getApiData("");