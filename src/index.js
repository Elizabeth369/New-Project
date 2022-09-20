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

//Change icon from default to custom

function displayImage(icon) {
  let iconPath = "";
  if (icon === `01d`) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/610/original/icons8-sun-64.png?1663691589";
  } else if (icon === `02d`) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/611/original/icons8-partly-cloudy-day-64.png?1663691844";
  } else if (
    icon === `03d` ||
    icon === `04d` ||
    icon === `03n` ||
    icon === `04n`
  ) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/614/original/icons8-cloud-64.png?1663692057";
  } else if (
    icon === `09d` ||
    icon === `09n` ||
    icon === `10d` ||
    icon === `10n`
  ) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/615/original/icons8-rain-64.png?1663692161";
  } else if (icon === `11d` || icon === `11n`) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/616/original/icons8-storm-64.png?1663692225";
  } else if (icon === `13d` || icon === `13n`) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/617/original/icons8-snow-64.png?1663692259";
  } else if (icon === `50d` || icon === `50n`) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/618/original/icons8-fog-64_%281%29.png?1663692331";
  } else if (icon === `01n`) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/613/original/icons8-new-moon-64.png?1663691991";
  } else if (icon === `02n`) {
    iconPath =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/619/original/icons8-night-64_%281%29.png?1663692412";
  }

  return iconPath;
}

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
       <img src="${displayImage(forecastDay.weather[0].icon)}"
            alt="forecastDay.weather[0].description)
             id="icon"/>
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
    `${displayImage(response.data.weather[0].icon)}`
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
searchbyDefolt("Odesa");
