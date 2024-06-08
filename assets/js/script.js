const citySearchEl = $('#citySearch');
const searchBtnEl = $('#searchBtn');
const previousCitiesEl = $('#previousCitySearches'); // Container for displaying previous city searches
const apiKey = '14462ac933eb3455a10c1a0bd20bdd1e';
const dailyWeatherEl = $('#dailyWeatherSection');
let cityList = [];


function loadPreviousCitySearches() {
    cityList = JSON.parse(localStorage.getItem('cityList')) || [];
    displayPreviousCitySearches();
}

function savePreviousCitySearches() {
    localStorage.setItem('cityList', JSON.stringify(cityList));
}

function displayPreviousCitySearches() {
    previousCitiesEl.empty();
    cityList.forEach(city => {
        const cityBtn = $('<button>')
            .addClass('btn city-btn bg-info text-light my-2 w-100')
            .attr('id', city.name)
            .text(city.name);
        previousCitiesEl.append(cityBtn);
    });
}

function geoLocationGet(searchInput) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=`;
    const url2 = `&limit=1&appid=${apiKey}`;
    const urlInput = url + searchInput + url2;

    return fetch(urlInput)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const cityLat = data[0].lat
            const cityLon = data[0].lon


            localStorage.setItem('cityLat', JSON.stringify(cityLat))
            localStorage.setItem('cityLon', JSON.stringify(cityLon))

            return data
        });
}

function currentWeatherGet(latitude, longitude, apiKey) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const weatherImageBase = 'https://openweathermap.org/img/wn/'
            const weatherImageModifier = data.weather[0].icon
            const weatherImageSuffix = '.png'
            weatherImage = weatherImageBase+weatherImageModifier+weatherImageSuffix

            console.log(weatherImage)

            const dailyWeather = $('<h1>')
                .text(`${data.name} (${dayjs(data.dt * 1000).format("MM/DD/YYYY")})`)
                .addClass('w-25 m-3');
            dailyWeatherEl.append(dailyWeather);

            const dailyImage = $('<img>')
                .attr({
                    'src': weatherImage,
                    'id': 'weatherIcon'
                })
                .addClass('mw-5 mh-5')
            dailyWeatherEl.append(dailyImage)

            const divider = $('<div>')
                .addClass('w-100')
            dailyWeatherEl.append(divider)

            const dailyTemp = $('<h3>')
                .text(`Temp: ${data.main.temp}°F`)
            dailyWeatherEl.append(dailyTemp)

            const dailyWind = $('<h3>')
                .text(`Wind: ${data.main.wind} MPH`)
            dailyWeatherEl.append(dailyWind)

            const dailyHumidity = $('<h3>')
                .text(`Humidity: ${data.main.humidity} %`)
            dailyWeatherEl.append(dailyHumidity)
        })
}

searchBtnEl.on('click', function () {
    loadPreviousCitySearches();
    const searchInput = citySearchEl.val().trim();
    if (searchInput) {
        geoLocationGet(searchInput).then(function (data) {

            const cityLat = JSON.parse(localStorage.getItem('cityLat'))
            const cityLon = JSON.parse(localStorage.getItem('cityLon'))

            cityDetails = {
                'name': searchInput,
                'lat': cityLat,
                'lon': cityLon,
            }
            cityList.push(cityDetails);
            cityDetails = ''
            savePreviousCitySearches();
            citySearchEl.val(''); // Clear the input field
            displayPreviousCitySearches(); // Update the displayed list
        })
            .then(function (data) {
                const lat = JSON.parse(localStorage.getItem('cityLat'))
                const lon = JSON.parse(localStorage.getItem('cityLon'))
                currentWeatherGet(lat, lon, apiKey)
            })
    }
});

previousCitiesEl.on('click', function () {
    currentWeatherGet();
})

function init() {
    loadPreviousCitySearches();
}

init();


