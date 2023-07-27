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


function displayTemperature(response){
   let temperature = document.querySelector("#temperature");
   let city = document.querySelector("#city");
   let description = document.querySelector("#description");
   let date = document.querySelector("#date");
   temperature.innerHTML= Math.round(response.data.main.temp);
   city.innerHTML = response.data.name
   description.innerHTML=response.data.weather[0].description;
   date.innerHTML = formatDate(response.data.dt* 1000);
}
let apiKey = "7d5e99a2cfae1163cb682076044b282d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);