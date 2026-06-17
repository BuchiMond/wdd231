// SELECT HTML ELEMENTS IN THE DOCUMENT
const myTown = document.querySelector('#town');
const myDecription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

// CREATE REQUIED VARIABLES FOR THE URL
const myKey = "7d19d093732040755f761c431ad0df6e"
const myLat = "49.75116276384878"
const myLong = "6.6343393299776015"

//CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

// TRY TO GRAB THE CURRENT WEATHER DATA

async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// DISPLAY THE JSON DATA ONTO MY WEB PAGE
function displayResults(data) {
    console.log('hello')
    myTown.innerHTML = data.name
    myDecription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('SRC', iconsrc)
    myGraphic.setAttribute('alt', data.weather[0].description)
}

// START THE PROCESS
apiFetch();