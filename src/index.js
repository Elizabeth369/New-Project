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
let tomorrow = document.querySelector("#tomorrow");
let currentTomorrow = days[now.getDay() + 1];
if (currentTomorrow === undefined) {
  currentTomorrow = days[now.getDay() - 6];
}
tomorrow.innerHTML = currentTomorrow;
let tomorrow2 = document.querySelector("#tomorrow2");
let currentTomorrow2 = days[now.getDay() + 2];
if (currentTomorrow2 === undefined) {
  currentTomorrow2 = days[now.getDay() - 5];
}
tomorrow2.innerHTML = currentTomorrow2;
let tomorrow3 = document.querySelector("#tomorrow3");
let currentTomorrow3 = days[now.getDay() + 3];
if (currentTomorrow3 === undefined) {
  currentTomorrow3 = days[now.getDay() - 4];
}
tomorrow3.innerHTML = currentTomorrow3;
let tomorrow4 = document.querySelector("#tomorrow4");
let currentTomorrow4 = days[now.getDay() + 4];
if (currentTomorrow4 === undefined) {
  currentTomorrow4 = days[now.getDay() - 3];
}
tomorrow4.innerHTML = currentTomorrow4;

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

// Function get Api response and change weather value
function searchbyDefolt(name) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

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

// Celcius to fahrenheit

function displayFarhenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempCels");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  //add active class
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempCels");
  //add active class
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
searchbyDefolt("Lisbon");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFarhenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
