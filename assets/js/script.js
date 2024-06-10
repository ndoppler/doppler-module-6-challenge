const citySearchEl = $('#citySearch');
const searchBtnEl = $('#searchBtn');
const previousCitiesEl = $('#previousCitySearches'); // Container for displaying previous city searches
const apiKey = '14462ac933eb3455a10c1a0bd20bdd1e';
const dailyWeatherEl = $('#dailyWeatherSection');
const forecastDay1 = $('#forecast-1');
const forecastDay2 = $('#forecast-2');
const forecastDay3 = $('#forecast-3');
const forecastDay4 = $('#forecast-4');
const forecastDay5 = $('#forecast-5');
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
            .text(city.name)
            .click(function () {
                localStorage.setItem('prevCity', JSON.stringify($(this).text()))
            })
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
            dailyWeatherEl.empty()
            const weatherImageBase = 'https://openweathermap.org/img/wn/'
            const weatherImageModifier = data.weather[0].icon
            const weatherImageSuffix = '.png'
            weatherImage = weatherImageBase + weatherImageModifier + weatherImageSuffix;

            const dailyWeather = $('<h1>')
                .text(`${data.name} (${dayjs(data.dt * 1000).format("MM/DD/YYYY")})`)
                .addClass('w-25 m-3');
            const dailyImage = $('<img>')
                .attr({
                    'src': weatherImage,
                    'id': 'weatherIcon'
                })
                .addClass('mw-5 mh-5');
            const divider = $('<div>')
                .addClass('w-100');
            const dailyTemp = $('<h3>')
                .text(`Temp: ${data.main.temp}°F`);
            const dailyWind = $('<h3>')
                .text(`Wind: ${data.wind.speed} MPH`);
            const dailyHumidity = $('<h3>')
                .text(`Humidity: ${data.main.humidity} %`);

            dailyWeatherEl.append(dailyWeather);
            dailyWeatherEl.append(dailyImage);
            dailyWeatherEl.append(divider);
            dailyWeatherEl.append(dailyTemp);
            dailyWeatherEl.append(dailyWind);
            dailyWeatherEl.append(dailyHumidity);


        })
        .then(function (data) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    forecastDay1.empty()
                    forecastDay2.empty()
                    forecastDay3.empty()
                    forecastDay4.empty()
                    forecastDay5.empty()

                    const weatherImageBase = 'https://openweathermap.org/img/wn/'
                    const weatherImageSuffix = '.png'

                    const day1Date = $('<h3>')
                        .text(`(${dayjs(data.list[0].dt * 1000).format("MM/DD/YYYY")})`)
                        .addClass('text-light text-center')
                    const day2Date = $('<h3>')
                        .text(`(${dayjs(data.list[8].dt * 1000).format("MM/DD/YYYY")})`)
                        .addClass('text-light text-center')
                    const day3Date = $('<h3>')
                        .text(`(${dayjs(data.list[16].dt * 1000).format("MM/DD/YYYY")})`)
                        .addClass('text-light text-center')
                    const day4Date = $('<h3>')
                        .text(`(${dayjs(data.list[24].dt * 1000).format("MM/DD/YYYY")})`)
                        .addClass('text-light text-center')
                    const day5Date = $('<h3>')
                        .text(`(${dayjs(data.list[32].dt * 1000).format("MM/DD/YYYY")})`)
                        .addClass('text-light text-center')

                    const day1Image = $('<img>')
                        .attr({
                            'src': `${weatherImageBase}${data.list[0].weather[0].icon}${weatherImageSuffix}`,
                            'id': 'weatherIconSmall'
                        })
                    const day2Image = $('<img>')
                        .attr({
                            'src': `${weatherImageBase}${data.list[8].weather[0].icon}${weatherImageSuffix}`,
                            'id': 'weatherIconSmall'
                        })
                    const day3Image = $('<img>')
                        .attr({
                            'src': `${weatherImageBase}${data.list[16].weather[0].icon}${weatherImageSuffix}`,
                            'id': 'weatherIconSmall'
                        })
                    const day4Image = $('<img>')
                        .attr({
                            'src': `${weatherImageBase}${data.list[24].weather[0].icon}${weatherImageSuffix}`,
                            'id': 'weatherIconSmall'
                        })
                    const day5Image = $('<img>')
                        .attr({
                            'src': `${weatherImageBase}${data.list[32].weather[0].icon}${weatherImageSuffix}`,
                            'id': 'weatherIconSmall'
                        })

                    const day1Temp = $('<h4>')
                        .text(`Temp: ${data.list[0].main.temp}°F`)
                        .addClass('text-light text-center');
                    const day2Temp = $('<h4>')
                        .text(`Temp: ${data.list[8].main.temp}°F`)
                        .addClass('text-light text-center');
                    const day3Temp = $('<h4>')
                        .text(`Temp: ${data.list[16].main.temp}°F`)
                        .addClass('text-light text-center');
                    const day4Temp = $('<h4>')
                        .text(`Temp: ${data.list[24].main.temp}°F`)
                        .addClass('text-light text-center');
                    const day5Temp = $('<h4>')
                        .text(`Temp: ${data.list[32].main.temp}°F`)
                        .addClass('text-light text-center');

                    const day1Wind = $('<h4>')
                        .text(`Wind: ${data.list[0].wind.speed} MPH`)
                        .addClass('text-light text-center');
                    const day2Wind = $('<h4>')
                        .text(`Wind: ${data.list[8].wind.speed} MPH`)
                        .addClass('text-light text-center');
                    const day3Wind = $('<h4>')
                        .text(`Wind: ${data.list[16].wind.speed} MPH`)
                        .addClass('text-light text-center');
                    const day4Wind = $('<h4>')
                        .text(`Wind: ${data.list[24].wind.speed} MPH`)
                        .addClass('text-light text-center');
                    const day5Wind = $('<h4>')
                        .text(`Wind: ${data.list[32].wind.speed} MPH`)
                        .addClass('text-light text-center');

                    const day1Humidity = $('<h4>')
                        .text(`Humidity: ${data.list[0].main.humidity} %`)
                        .addClass('text-light text-center');
                    const day2Humidity = $('<h4>')
                        .text(`Humidity: ${data.list[8].main.humidity} %`)
                        .addClass('text-light text-center');
                    const day3Humidity = $('<h4>')
                        .text(`Humidity: ${data.list[16].main.humidity} %`)
                        .addClass('text-light text-center');
                    const day4Humidity = $('<h4>')
                        .text(`Humidity: ${data.list[24].main.humidity} %`)
                        .addClass('text-light text-center');
                    const day5Humidity = $('<h4>')
                        .text(`Humidity: ${data.list[32].main.humidity} %`)
                        .addClass('text-light text-center');

                    const divider = $('<div>')
                        .addClass('w-100')

                    function dividerAdd() {
                        forecastDay1.append(divider)
                        forecastDay2.append(divider)
                        forecastDay3.append(divider)
                        forecastDay4.append(divider)
                        forecastDay5.append(divider)
                    }

                    forecastDay1.append(day1Date)
                    forecastDay2.append(day2Date)
                    forecastDay3.append(day3Date)
                    forecastDay4.append(day4Date)
                    forecastDay5.append(day5Date)
                    dividerAdd()
                    forecastDay1.append(day1Image)
                    forecastDay2.append(day2Image)
                    forecastDay3.append(day3Image)
                    forecastDay4.append(day4Image)
                    forecastDay5.append(day5Image)
                    dividerAdd()
                    forecastDay1.append(day1Temp)
                    forecastDay2.append(day2Temp)
                    forecastDay3.append(day3Temp)
                    forecastDay4.append(day4Temp)
                    forecastDay5.append(day5Temp)
                    dividerAdd()
                    forecastDay1.append(day1Wind)
                    forecastDay2.append(day2Wind)
                    forecastDay3.append(day3Wind)
                    forecastDay4.append(day4Wind)
                    forecastDay5.append(day5Wind)
                    dividerAdd()
                    forecastDay1.append(day1Humidity)
                    forecastDay2.append(day2Humidity)
                    forecastDay3.append(day3Humidity)
                    forecastDay4.append(day4Humidity)
                    forecastDay5.append(day5Humidity)
                })
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
    loadPreviousCitySearches();
    const searchInput = JSON.parse(localStorage.getItem('prevCity'))
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

})

function init() {
    loadPreviousCitySearches();
}

init();


