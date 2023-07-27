function displayTemperature(response){
    console.log(response.data)
   let temperature = document.querySelector("#temperature");
   let city = document.querySelector("#city");
   let description = document.querySelector("#description")
   temperature.innerHTML= Math.round(response.data.main.temp);
   city.innerHTML = response.data.name
   description.innerHTML=response.data.weather[0].description;
}

let apiKey = "7d5e99a2cfae1163cb682076044b282d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);