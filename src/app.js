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

function formatDay(timestamp){
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[day];
}

function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecast.foreach(function (forecast,index)
    {
        if(index<6) {
            forecastHTML = forecastHTML +
            `
            <div class="col-2">
            <div class='weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png"
            alt="" width="42"/>
            <div class="weather-forecasttemperature">
            <span class="weather-forecast-temperature-max">${Math.round(forecastDay.data.temperature)}°</span>
            </div>
            </div>
            `;

        }
    });

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;

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
form.addEventListener("submit",handleSubmit);

search ("Port Elizabeth");
