function formatDate(timestamp){
    //Calculate the date
let date = new Date (timestamp);
let hours = date.getHours();
if (hours<10){
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes<10){
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

// function formatDay(timestamp){
    // let date = new Date(timestamp*1000);
    // let day = date.getDay();
    // let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    // return days[day];
// }

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Wed", "Thu", "Fri" , "Sat","Sun"];

  let forecastHTML = ""; // Create an empty string to accumulate the HTML for all days

  days.forEach(function(day) {
    // Update the forecastHTML with the HTML for each day's forecast
    forecastHTML += 
      `<div class="col-2">
        <div class="weather-date">${day}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png" alt="" width="42px" class="forecast-image">
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max"><strong>18°</strong></span>
          <span class="weather-forecast-temperature-min">12°</span>
        </div>
      </div>`
    ;
  });

  forecastElement.innerHTML = forecastHTML;
}

displayForecast();


function getForecast (coordinates){
let apiKey = "de0bco366bc60bae2409dfb13a7t7749";
let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response){


   let temperature = document.querySelector("#temperature");
   let city = document.querySelector("#city");
   let description = document.querySelector("#description");
   let date = document.querySelector("#date");
   let icon = document.querySelector("#icon");

   temperature.innerHTML= Math.round(response.data.temperature.current);
   city.innerHTML = response.data.city;
   description.innerHTML=response.data.condition.description;
   date.innerHTML = formatDate(response.data.time* 1000);
   icon.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`); 
   getForecast(response.data.coordinates);
   
}

function search(city){
    let apiKey = "de0bco366bc60bae2409dfb13a7t7749";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityName = document.querySelector("#city-name");
    let cityInput= document.querySelector("#city");
    cityInput.innerHTML = `${cityName.value}`;
    search(cityName.value);
}

let form = document.querySelector ("#search-form");
form.addEventListener("click",handleSubmit);

search ("Port Elizabeth");



//Adding geolocation feature 


// JavaScript code to change the date and time according to user's input city

// Function to get user's location based on input city
function getLocationByCity() {
  const city = document.getElementById("cityInput").value;
  if (city.trim() === "") {
    console.log("Please enter a valid city.");
    return;
  }

  const geocodingApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey};`
  const apiKey = "97e50472be43e73c48ca69e84a2d842e";

  // Make API request to get the latitude and longitude of the city
  fetch(`${geocodingApiUrl}?address=${city}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Get the first result from the returned data
      const result = data.results[0];
      if (result) {
        const latitude = result.geometry.location.lat;
        const longitude = result.geometry.location.lng;

        // Pass the latitude and longitude to the existing function to display date and time
        showDateTime(latitude, longitude);
      } else {
        console.log("Could not retrieve location coordinates for the specified city.");
      }
    })
    .catch(error => console.log("Error: " + error));
}

// Function to display date and time based on latitude and longitude
function showDateTime(latitude, longitude) {
  // Get current date and time based on user's location
  const date = new Date();
  date.setTimezoneOffset(getTimezoneOffset(latitude, longitude));
  console.log("Current date and time: " + date);
}

// Function to get the timezone offset based on latitude and longitude
function getTimezoneOffset(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const timestamp = Math.floor(Date.now() / 1000);

  // Make API request to get the timezone data
  fetch(`${apiUrl}?location=${latitude},${longitude}&timestamp=${timestamp}&key=97e50472be43e73c48ca69e84a2d842e`)
    .then(response => response.json())
    .then(data => {
      // Get the timezone offset in minutes
      const timezoneOffset = data.rawOffset / 60;
      return timezoneOffset;
    })
    .catch(error => console.log("Error: " + error));
}