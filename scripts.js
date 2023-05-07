const apikey = "439d6d3864f3c29c811d6520d3cb8311";

const weatherDataEl = document.getElementById('weather-app');

const cityInputEl = document.getElementById('city-input');

const formEl = document.querySelector('form');

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        
        if(!response.ok){
            throw new error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [`Feel Like: ${Math.round(data.main.feels_like)}`, `Humidity: ${Math.round(data.main.humidity)}`, `Wind Speed: ${Math.round(data.wind.speed)}`]

        weatherDataEl.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></img>`;

        weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`;

        weatherDataEl.querySelector('.description').textContent = `${description}`;

        weatherDataEl.querySelector('.details').innerHTML = details.map((detail) => 
            `<div>${detail}</div>`);
    } catch (error) {
        
    }
}