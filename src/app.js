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

function displayForecast(){

let forecastElement = document.querySelector ("#forecast");
let forecastHTML = `<div class="row">`

forecastHTML = forecastHTML + `                
  <div class="row">
                    <div class="col-2">
                        <div class="weather-date">Thu</div>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAepJREFUaN7tmd2thCAQhSnBEijBEmjgJpZgCZZgCZZgCXZwLcFX3yiBDlhIhhvC5dcdFzeB5LzsTtjz4cwwZomUknyzSANoAA2gATQANICSdZ4nA/Wk0ioGUGY7pVVJKElLXGl6NIAySMGojGh9MsCRMG80Pw5AmRozzRvppzVoGNCk068mwFYI4JPArpMSgB0BwGj5doAVutnsdDNdYwwVAH5o8rTNqzoyGsKIAqAvKETjRkNGQxC5BR8EuMm8vJCO0cKPAXBs83DyXcF9YmvKBoDHfIf5/o2DESUAM7L5HU6eez4fraFwzEwvYQo9BLDfcPrM2dek02jd1vZnOfuyEMCKaH52OwqMGaF04vBdDsQaApgQT546Jy9g/1gtcHgSqUxYQgD0xrwvgR9gn5D6WBtdEC6s6e55KQbQWd3hijqECVakxoq33okzXj03pFpiNQCOT4zfSYCf35MprUpHaBMrhltzlKwOoAx1SkJJgnqPeR3DrRhmXYZY6q8CLJaxP3NOzOzEjOSDKwigT9sxtnvM01RMTYDdMUc9AG5M/wgAnQaOsdljfnBiFlJh/QPwFK4u0C5RuMKNqQngFu7wtMJNAYhUUebE1ATYYoULAFvNwk0BmFuVZty8lFRe7S+mBtAAGkADeFsvKpKWeAy6FowAAAAASUVORK5CYII=" alt="" width="42px" class="forecast-image">
                        <div class="weather-forecast-temperature">
                            <span class="weather-forecast-temperature-max">18°</span>
                            <span class="weather-forecast-temperature-min">12°</span>
                        </div>
                    </div>
                </div>`

}



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
displayForecast();



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