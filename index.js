// !today
let todayName = document.getElementById("todayName");
let todayMonth = document.getElementById("todayMonth");
let cityName = document.getElementById("cityName");
let todayDegre = document.getElementById("todayDegre");
let todayImg = document.getElementById("todayImg");
let statusToday = document.getElementById("statusToday");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let copass = document.getElementById("copass");

// !tomorrow
let tomorrowName = document.getElementById("tomorrowName");
let tomorrowImg = document.getElementById("tomorrowImg");
let tomorrowDegreUpper = document.getElementById("tomorrowDegreUpper");
let tomorrowDegreLower = document.getElementById("tomorrowDegreLower");
let statusTomorrow = document.getElementById("statusTomorrow");

// !after tomorrow
let afterTomorrowName = document.getElementById("afterTomorrowName");
let afterTomorrowImg = document.getElementById("afterTomorrowImg");
let afterTomorrowDegreUpper = document.getElementById(
  "afterTomorrowDegreUpper"
);
let afterTomorrowDegreLower = document.getElementById(
  "afterTomorrowDegreLower"
);
let statusAfterTomorrow = document.getElementById("statusAfterTomorrow");

// !input
let locationInput = document.getElementById("locationInput");
// !***********************************************
let myLocation = navigator.geolocation.getCurrentPosition(async position => {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let myLocation = `${latitude},${longitude}`;
  await getWeather(myLocation);
});

async function getWeather(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=462fc01089564011bb9230156241912`
  );
  let data = await response.json();
  console.log(data);

  displayTodayWeather(data);
  displayTomorrowWeather(data);
  displayAfterTomorrowWeather(data);
}

function displayTodayWeather(data) {
  let todayDate = new Date(data.current.last_updated);
  todayName.innerHTML = todayDate.toLocaleString("en-US", { weekday: "long" });
  todayMonth.innerHTML = `${todayDate.getMonth() +
    1} ${todayDate.toLocaleString("en-US", { month: "long" })}`;
  cityName.innerHTML = data.location.name;
  todayDegre.innerHTML = `${data.current.temp_c}&deg;C`;
  todayImg.setAttribute("src", `${data.current.condition.icon}`);
  statusToday.innerHTML = data.current.condition.text;
  humidity.innerHTML = `${data.current.humidity}%`;
  wind.innerHTML = `${data.current.wind_kph}Km/h`;
  copass.innerHTML = data.current.wind_dir;
}

function displayTomorrowWeather(data) {
  let tomorrowDate = new Date(data.forecast.forecastday[1].date);
  tomorrowName.innerHTML = tomorrowDate.toLocaleString("en-US", {
    weekday: "long"
  });
  tomorrowImg.setAttribute(
    "src",
    `${data.forecast.forecastday[1].day.condition.icon}`
  );
  tomorrowDegreUpper.innerHTML = `${data.forecast.forecastday[1].day
    .maxtemp_c}&deg;C`;
  tomorrowDegreLower.innerHTML = `${data.forecast.forecastday[1].day
    .mintemp_c}&deg;C`;
  statusTomorrow.innerHTML = data.forecast.forecastday[1].day.condition.text;
}

function displayAfterTomorrowWeather(data) {
  let afterTomorrowDate = new Date(data.forecast.forecastday[2].date);
  afterTomorrowName.innerHTML = afterTomorrowDate.toLocaleString("en-US", {
    weekday: "long"
  });
  afterTomorrowImg.setAttribute(
    "src",
    `${data.forecast.forecastday[2].day.condition.icon}`
  );
  afterTomorrowDegreUpper.innerHTML = `${data.forecast.forecastday[2].day
    .maxtemp_c}&deg;C`;
  afterTomorrowDegreLower.innerHTML = `${data.forecast.forecastday[2].day
    .mintemp_c}&deg;C`;
  statusAfterTomorrow.innerHTML =
    data.forecast.forecastday[2].day.condition.text;
}

locationInput.addEventListener("input", async e => {
  let myCity = e.target.value;
  await getWeather(myCity);
});
