// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
const iconelement = document.querySelector(".weather-icon");
const tempelement = document.querySelector(".temperature-value p");
const descelement = document.querySelector(".temperature-description p");
const locationelement = document.querySelector(".location p");
const notificationelement = document.querySelector(".weather-icon");


const weather = {};

weather.temperature = {
    unit: "celcius"
}

const kelvin = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";


if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showerror);

} else {
    notificationelement.style.display = "block";
    notificationelement.innerHTML = "<p>Browser doesn't support Geolocation</p>"
}

function setPosition(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    getweather(latitude, longitude);
}

function showerror(error) {
    notificationelement.style.display = "block";
    notificationelement.innerHTML = '<p> ${error.message} </p>';
}

function getweather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })
        .then(function() {
            displayweather();
        });
}


function displayweather() {
    iconelement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempelement.innerHTML = `${weather.temperature.value}*<span>c</span>`;
    descelement.innerHTML = weather.description;
    locationelement.innerHTML = `${weather.city},${weather.country}`;
}

function ctof(temperature) {
    return (temperature * 9 / 5) + 32;

}


tempelement.addEventListener("click", function() {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit == "celcius") {
        let fahrenheit = ctof(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempelement.innerHTML = `${fahrenheit}*<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {

        tempelement.innerHTML = `${weather.temperature.value}*<span>C</span>`;
        weather.temperature.unit = "celcius"
    }
});