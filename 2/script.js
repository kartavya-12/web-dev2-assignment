const form=document.querySelector("#weather_form")
const API_KEY= "0133cc5316757ac730cc46ae342334e4"

form.addEventListener("submit", async function(e){
    e.preventDefault();
    console.log(city.value)
    const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}`)
    const weatherData= await response.json()
    console.log(weatherData)
    console.log("city",weatherData.name)
    console.log("temp",(weatherData.main.temp-273).toFixed(1),"c")
    console.log("weather",weatherData.weather[0].main)
    console.log("humidity",weatherData.main.humidity)
    console.log("wind",weatherData.wind.speed,"m/s")
})