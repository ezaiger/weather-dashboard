// Global Variables
var cityInputEl = document.querySelector(".city-input");
var searchFormEl = document.querySelector(".form");
var searchButtonEl = document.querySelector(".search-btn");
var historyButtonEl = document.querySelector(".history.btn");
var cityResultEl = document.querySelector(".city-result");

// Current Forecast Variables
var tempForecastEl = document.querySelector(".temp");
var windForecastEl = document.querySelector(".wind");
var humidityForecastEl = document.querySelector(".humidity");
var uviForecastEl = document.querySelector(".uv-index")
var weatherResultsEl = document.querySelector(".weather-results");
var currentConditionsEl = document.querySelector(".current-conditions");
var weatherAPIKey = "faaae616638a9dcb6e179054b7709009";

// Function to populate entered city information
var weatherSearch = function (cityName) {
    var urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKey}&units=imperial`;
    // fetches current weather
    fetch(urlCurrentWeather)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            console.log(currentData)
            var urlOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&appid=${weatherAPIKey}&units=imperial`
            // fetches 7 day forecast
            fetch(urlOneCall)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fivedayData) {
                    console.log(fivedayData)
                    cityResultEl.innerHTML = currentData.name + moment(currentData.dt, 'X').format(" (MM/DD/YYYY) ") + `<img class="w-2"
                    src="http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" />`;
                    tempForecastEl.innerHTML = "Temp: " + fivedayData.current.temp;
                    windForecastEl.innerHTML = "Wind: " + fivedayData.current.wind_speed;
                    humidityForecastEl.innerHTML = "Humidity: " + fivedayData.current.humidity;
                    uviForecastEl.innerHTML = "UV Index: " + fivedayData.current.uvi;
                })
        })
};

// Function to search for a city
var citySearch = function () {
    // obtain input from user
    var cityName = cityInputEl.value;
    weatherSearch(cityName);
};
// event listener for the search button click
searchButtonEl.addEventListener("click", citySearch);

// Function to display history of searched cities
    // button generated showing searched city
    // newest search appears at top
    // searched city stored in local storage

// Function to display current weather conditions for that city
    // display weather conditions in .weather-results
    // format city, date and insert icon
    // retrieve top, wind, humidity and UV index from API

// Function to determine if UV index is favorable, moderate, or severe

// Function to display future weather conditions for that city (5 day forcast)
    // create a card for each day with date, icon, temp, wind and humidity

// Function to store weather conditions for searched cities

// Function to update local storage with previously searched cities

