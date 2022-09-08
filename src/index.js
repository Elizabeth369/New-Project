let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
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

function search(event) {
  event.preventDefault();
  let cityForm = document.querySelector("#city");
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityForm.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let city = document.querySelector("#inputCity");
city.addEventListener("submit", search);
function showTemperature(response) {
  let result = document.querySelector("h1");
  result.innerHTML = response.data.name;
  let temperature = response.data.main.temp;
  let all = document.querySelector("h2");
  all.innerHTML = `${Math.round(temperature)}°C`;
  let humidity = document.querySelector(".humid");
  let currentHumid = response.data.main.humidity;
  humidity.innerHTML = `${currentHumid} % : Humidity`;
  let wind = document.querySelector(".wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${currentWind} m/s : Wind`;

  let minMaxTemp = document.querySelector(".minMax");
  let currentMinMax = `${Math.round(
    response.data.main.temp_min
  )} - ${Math.round(response.data.main.temp_max)}`;
  minMaxTemp.innerHTML = `${currentMinMax} °C : Temperature`;
}

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
