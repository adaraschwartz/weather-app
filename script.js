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
  )}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
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
