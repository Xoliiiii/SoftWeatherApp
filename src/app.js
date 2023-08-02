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
    console.log(response.data);
   let temperature = document.querySelector("#temperature");
   let city = document.querySelector("#city");
   let description = document.querySelector("#description");
   let date = document.querySelector("#date");
   let icon = document.querySelector("#icon");
   temperature.innerHTML= Math.round(response.data.temperature.current);
   city.innerHTML = response.data.city
   description.innerHTML=response.data.condition.description;
   date.innerHTML = formatDate(response.data.time* 1000);
   icon.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
}
let apiKey = "de0bco366bc60bae2409dfb13a7t7749";
let city = "Port Elizabeth"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);