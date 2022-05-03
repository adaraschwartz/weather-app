// get date and time

function newDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];
  let currentTime = now.getHours();
  let currentMins = now.getMinutes();
  let fullDate = `${currentDay} ${currentTime}:${currentMins}`;
  return fullDate;
}
let now = new Date();
let timeDate = document.querySelector("#current-date");
timeDate.innerHTML = newDate(now);

// forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <br>
          <i class="fa-solid fa-cloud-bolt"></i>
          <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "b770895b4cca764b15317d1f52e38bc4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// search engine city temperature, wind speed, humidity, description

function showCityTemp(response) {
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector(".temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  celsTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", search);
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let units = "metric";
  let apiKey = "b770895b4cca764b15317d1f52e38bc4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

// current location button

function searchLocation(position) {
  let apiKey = "b770895b4cca764b15317d1f52e38bc4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

// faren to cels conversion

let celsTemperature = null;

function showFaren(event) {
  event.preventDefault();
  let farenTemp = (celsTemperature * 9) / 5 + 32;
  let celcTemp = document.querySelector(".temperature");
  celcTemp.innerHTML = Math.round(farenTemp);
}

function showCels(event) {
  event.preventDefault();
  let celcTemp = document.querySelector(".temperature");
  celcTemp.innerHTML = celsTemperature;
}

let farenLink = document.querySelector("#f-link");
farenLink.addEventListener("click", showFaren);

let celsLink = document.querySelector("#c-link");
celsLink.addEventListener("click", showCels);

// call forecast test
