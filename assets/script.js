// Global Variables
var cityInputEl = document.querySelector(".city-input");
var searchFormEl = document.querySelector(".form");
var searchButtonEl = document.querySelector(".search-btn");
var cityResultEl = document.querySelector(".city-result");
var fiveDayEl = document.querySelector("#fiveDay");
var searchedCityEl = document.querySelector("#searchedCity");
var uvIndexEl = document.querySelector("#uv-condition");

// Current Forecast Variables
var tempForecastEl = document.querySelector(".temp");
var windForecastEl = document.querySelector(".wind");
var humidityForecastEl = document.querySelector(".humidity");
var uviForecastEl = document.querySelector(".uv-index");
var weatherResultsEl = document.querySelector(".weather-results");
var currentConditionsEl = document.querySelector(".current-conditions");
var weatherAPIKey = "faaae616638a9dcb6e179054b7709009";
var cityList = [];

// Function to populate entered city information
var weatherSearch = function (cityName) {
  var urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKey}&units=imperial`;
  // fetches current weather
  fetch(urlCurrentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      console.log(currentData);
      var urlOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&appid=${weatherAPIKey}&units=imperial`;
      // fetches 7 day forecast
      fetch(urlOneCall)
        .then(function (response) {
          return response.json();
        })
        .then(function (fivedayData) {
          console.log(fivedayData);
          // add entered city into local storage
          cityList.push(currentData.name);
          localStorage.setItem("cityList", JSON.stringify(cityList));
          populateCity();
          // populates current city weather info
          cityResultEl.innerHTML =
            currentData.name +
            moment(currentData.dt, "X").format(" (MM/DD/YYYY) ") +
            `<img class="w-2"
                    src="http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" />`;
          tempForecastEl.innerHTML = "Temp: " + fivedayData.current.temp + "°F";
          windForecastEl.innerHTML = "Wind: " + fivedayData.current.wind_speed;
          humidityForecastEl.innerHTML =
            "Humidity: " + fivedayData.current.humidity;
          var uv = fivedayData.current.uvi;
          uvIndexEl.innerHTML = fivedayData.current.uvi;

          if (uv < 3) {
            uvIndexEl.classList.add("green");
          } else if (uv < 5) {
            uvIndexEl.classList.add("orange");
          } else {
            uvIndexEl.classList.add("red");
          }

          // populates current city 5 day forecast weather
          fiveDayEl.innerHTML = "";
          var card = "";
          for (let i = 1; i < 6; i++) {
            console.log(fivedayData.daily[i].weather[0].icon);
            card =
              card +
              `<div class="col-sm-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${moment(
                fivedayData.daily[i].dt,
                "X"
              ).format("MM/DD/YYYY")}</h5>
                            <img class="w-50" src="http://openweathermap.org/img/wn/${fivedayData.daily[i].weather[0].icon
              }@2x.png" />
                            <p class="card-text">Temp: ${fivedayData.daily[i].temp.day
              }°F</p>
                            <p class="card-text">Wind: ${fivedayData.daily[i].wind_speed
              }</p>
                            <p class="card-text">Humidity: ${fivedayData.daily[i].humidity
              }</p>
                        </div>
                    </div>
                </div>`;
          }
          fiveDayEl.innerHTML = card;
        });
    });
};

// Function to create history button for previously searched city
var populateCity = function () {
  var cityData = JSON.parse(localStorage.getItem("cityList"));
  if (cityData) {
    cityList = cityData;
    searchedCityEl.innerHTML = "";
    for (i = 0; i < cityList.length; i++) {
      searchedCityEl.innerHTML += `<li class="list-group-item border-0"><button class="btn history-btn w-100"
        type="button">${cityList[i]}</button></li>`;
    }
  }
  var historyButtonEl = document.querySelectorAll(".history-btn");
  for (i = 0; i < historyButtonEl.length; i++) {
    historyButtonEl[i].addEventListener("click", showCity);
  }
};
populateCity();

// Function to repeat search on previously searched city
var showCity = function () {
  weatherSearch(this.textContent);
};

// Function to search for a city
var citySearch = function () {
  // obtain input from user
  var cityName = cityInputEl.value;
  weatherSearch(cityName);
};

// event listener for the search button click
searchButtonEl.addEventListener("click", citySearch);
