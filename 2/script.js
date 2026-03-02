let API_KEY = "ea0beec1a1a15e6771b7ecdc73f830ec";

        let form = document.querySelector('form')
        let city = document.querySelector("#search-city")
        let weather = document.querySelector('#fetched-data-box')
        let searchcity = document.querySelector('#search-cities-box')
        let darkBtn = document.getElementById("dark-toggle")
        let clearAllBtn = document.getElementById("clear-all");


        async function getWeatherInfo(city) {

            if (city.trim() === "") return;

            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );

            let data = await response.json();

            if (data.cod !== 200) {
                weather.innerHTML = "<p>City not found</p>";
                return;
            }

            let card = document.createElement('div');
            card.innerHTML = `
        <div><b>City :</b> ${data.name}, ${data.sys.country}</div>
        <div><b>Temp :</b> ${data.main.temp}°C</div>
        <div><b>Weather :</b> ${data.weather[0].main}</div>
        <div><b>Humidity :</b> ${data.main.humidity}%</div>
        <div><b>Wind :</b> ${data.wind.speed} m/s</div>
    `;

            weather.innerHTML = "";
            weather.append(card);

            let cities = JSON.parse(localStorage.getItem("cities")) || [];

            if (!cities.includes(city)) {
                cities.push(city);
                localStorage.setItem("cities", JSON.stringify(cities));
            }

            displayHistory();
        }

        function displayHistory() {
            let cities = JSON.parse(localStorage.getItem("cities")) || [];

            searchcity.innerHTML = "";

            cities.forEach((cityName, index) => {

                let item = document.createElement("div");
                item.classList.add("history-item");

                let cityText = document.createElement("span");
                cityText.textContent = cityName;

                cityText.addEventListener("click", () => {
                    getWeatherInfo(cityName);
                });

                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "✖";
                deleteBtn.classList.add("delete-btn");

                deleteBtn.addEventListener("click", () => {
                    cities.splice(index, 1);
                    localStorage.setItem("cities", JSON.stringify(cities));
                    displayHistory();
                });

                item.appendChild(cityText);
                item.appendChild(deleteBtn);

                searchcity.appendChild(item);
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            getWeatherInfo(city.value)
        })
        displayHistory();
        clearAllBtn.addEventListener("click", () => {

            localStorage.removeItem("cities");

            weather.innerHTML = "<p>No city selected.</p>";
            currentDisplayedCity = null;

            displayHistory();
        });

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            darkBtn.textContent = "Light Mode";
        }

        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                darkBtn.textContent = "Light Mode";
            } else {
                localStorage.setItem("theme", "light");
                darkBtn.textContent = "Dark Mode";
            }
        });