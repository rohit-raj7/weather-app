let currentTempCelsius = 22;

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function updateTemperatureDisplay(tempInCelsius) {
    const tempElement = document.querySelector(".temp");

    if (document.getElementById("toggleCelsius").classList.contains("active")) {
        tempElement.innerHTML = Math.round(tempInCelsius) + "°C";
    } else {
        tempElement.innerHTML = Math.round(celsiusToFahrenheit(tempInCelsius)) + "°F";
    }
}

document.getElementById("toggleCelsius").addEventListener("click", () => {
    document.getElementById("toggleCelsius").classList.add("active");
    document.getElementById("toggleFahrenheit").classList.remove("active");
    updateTemperatureDisplay(currentTempCelsius);
});

document.getElementById("toggleFahrenheit").addEventListener("click", () => {
    document.getElementById("toggleFahrenheit").classList.add("active");
    document.getElementById("toggleCelsius").classList.remove("active");
    updateTemperatureDisplay(currentTempCelsius);
});
