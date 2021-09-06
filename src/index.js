//change to celcius//

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("C");
  fahrenheitLink.classList.add("F");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  


}

function convertToCelsius(event) {
  event.preventDefault();

  celsiusLink.classList.add("C");
  fahrenheitLink.classList.remove("F");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//search function//
function showTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let h2 = document.querySelector("h2");
  h2.innerHTML = ` <br/><br/>${city} <br/>
  -.-.--- --`;
  let iconElement = document.querySelector("#iconElement");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  let iconNextToPicture = document.querySelector("#iconNextToPicture");
  iconNextToPicture.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconNextToPicture.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;


  document.querySelector("#weather-Description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-Speed").innerHTML = (
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  getForecast(response.data.coord);

}

let units = "metric";
let city = "Cape Town";
let apiKey = "476fc8273a4982024fc651e75dacfe77";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

function showCity(event) {
  event.preventDefault();
  let apiKey = "476fc8273a4982024fc651e75dacfe77";
  let cityInput = document.querySelector("#city-Input");
  let city = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let searchButton = document.querySelector("#location-form");
searchButton.addEventListener("click", showCity);

//current location//

function showWeather(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(document.querySelector("#temperature"));
  temperature.innerHTML = `${temperature}`;
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "476fc8273a4982024fc651e75dacfe77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=10&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//date function//

let now = new Date();

let h3 = document.querySelector("h3");
let date = now.getDate();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h3.innerHTML = `${day}, ${month} ${date}`;

let h4 = document.querySelector("h4.time");
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

h4.innerHTML = ` ${hours} : ${minutes}`;

//five day forecast//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="70"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}





function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "476fc8273a4982024fc651e75dacfe77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
