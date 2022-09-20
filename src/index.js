let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentDay = document.querySelector("#data");
currentDay.innerHTML = day;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
let hours = now.getHours();
let currentHours = document.querySelector("#hour");
currentHours.innerHTML = hours;
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let currentMinute = document.querySelector("#minute");
currentMinute.innerHTML = minutes;

//Current location function
function search(event) {
  event.preventDefault();
  let cityForm = document.querySelector("#city");
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityForm.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
// Form value
let city = document.querySelector("#inputCity");
city.addEventListener("submit", search);

// Function get Api response and change weather value by defolt
function searchbyDefolt(name) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// Add day at the botton of app

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
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
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Forecast API

function getForecast(coordinates) {
  let apiKey = `5da7b2dc058f07286fea39c4cee516a3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

//Current weather function

function showTemperature(response) {
  //Change city
  let result = document.querySelector("#cityText");
  result.innerHTML = response.data.name;
  //Change temp
  celsiusTemperature = response.data.main.temp;
  let all = document.querySelector("#tempCels");
  all.innerHTML = `${Math.round(celsiusTemperature)}`;
  //Change humidity
  let humidity = document.querySelector(".humid");
  let currentHumid = response.data.main.humidity;
  humidity.innerHTML = `${currentHumid} % : Humidity`;
  //Change wind
  let wind = document.querySelector(".wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${currentWind} m/s : Wind`;
  //Change mim-max temp
  let minMaxTemp = document.querySelector(".minMax");
  let currentMinMax = `${Math.round(
    response.data.main.temp_min
  )} - ${Math.round(response.data.main.temp_max)}`;
  minMaxTemp.innerHTML = `${currentMinMax} °C : Temperature`;
  //Change top icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
// Current location button
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".btn2");
button.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;
searchbyDefolt("Lisbon");
