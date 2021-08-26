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
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

  document.querySelector("#high-Temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-Temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#weather-Description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-Speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  
    
}

let units = "metric";
let city = "♡";
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


//quotes//

function showQuote(event) {
  console.log(event);
  let quote = document.querySelector("quote");
  let quote.innerHTML = `https://andruxnet-random-famous-quotes.p.rapidapi.com/`;

}
