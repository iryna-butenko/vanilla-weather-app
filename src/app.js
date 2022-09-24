function formateDate(timestapm) {
  let now = new Date(timestapm);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  let date = now.getDate();
  return `${day} ${hours}:${minutes}
<br> ${month} ${date}`;
}
// Temperature function
function getForecast(coordinates) {
  let apiKey = "050c0dd6525ba7db3f3eb9c0a7cc5c29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let date = document.querySelector("#date");
  date.innerHTML = formateDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  temperatureC = response.data.main.temp;

  getForecast(response.data.coord);
}
// Search function
function search(city) {
  let apiKey = "050c0dd6525ba7db3f3eb9c0a7cc5c29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  search(citySearch.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Forecast
function formateDateForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class=row>`;

  forecastElement.forEach(function (forecastElementDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastElementDay.weather[0].icon
                }@2x.png"
                alt=""
                width="65"
              />
              <div class="forecast-temp">
                <span class="forecast-temp-max">${Math.round(
                  forecastElementDay.temp.max
                )}° </span>
                <span class="forecast-temp-min">${Math.round(
                  forecastElementDay.temp.min
                )}</span>
              </div>
              <div class="forecast-date">${formateDateForecast(
                forecastElementDay.dt
              )}</div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
search("Kyiv");
