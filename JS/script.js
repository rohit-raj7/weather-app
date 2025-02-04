

const apiKey = "5ded7d423fffa56dc4c8185b797fd105";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather_icon');
const cardImg = document.querySelector('.card');

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        showError("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherByCoordinates(lat, lon);
}

function error() {
    showError("Unable to retrieve your location.");
}

async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        
        if (response.status === 404) {
            showError("Location not found.");
            return;
        }
        
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("An error occurred. Please try again later.");
    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);
        
        if (response.status === 404) {
            showError("Invalid city name");
            return;
        }
        
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("An error occurred. Please try again later.");
    }
}

function updateWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".conditaion").innerHTML = data.weather[0].main;
    document.querySelector(".country").innerHTML = data.sys.country;
  
    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
        cardImg.style.backgroundImage = 'url("https://media.tenor.com/tQWmGFB9_SYAAAAM/moving-clouds-world-meteorological-day.gif")';
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
        cardImg.style.backgroundImage = 'url("https://cdn.pixabay.com/animation/2023/06/25/21/55/21-55-38-961_256.gif")';
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
        // cardImg.style.backgroundImage = 'url("https://i.pinimg.com/originals/9c/ee/a5/9ceea5cc05195c4dd13cdafe00e37230.gif")';
        cardImg.style.backgroundImage = 'url("images/bg1.gif")';
        
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
        cardImg.style.backgroundImage = 'url("https://i.pinimg.com/originals/9a/4c/c0/9a4cc0a6c19ba855e100db82e57ed769.gif")';
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
        cardImg.style.backgroundImage = 'url("https://i.pinimg.com/originals/9c/ee/a5/9ceea5cc05195c4dd13cdafe00e37230.gif")';
    }

    document.querySelector(".error").style.display = "none";  
    document.querySelector(".weather").style.display = "block";  
}

function showError(message) {
    const errorMessage = document.querySelector(".error p");
    errorMessage.textContent = message;

    const error = document.querySelector(".error");
    error.style.display = "block";

    setTimeout(() => {
        error.style.display = "none"; 
        window.location.reload();  
    }, 2000);
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        showError("Please enter a city name");
    }
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            showError("Please enter a city name");
        }
    }
});

window.onload = getUserLocation;


const detailsBox = document.getElementById('.details');
detailsBox.style.backgroundImage = "url('images/bg.jpg')";
detailsBox.style.backgroundSize = "cover"; 
detailsBox.style.backgroundPosition = "center";