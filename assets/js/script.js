const citySearchEl = $('#citySearch');
const searchBtnEl = $('#searchBtn');
const previousCitiesEl = $('#previousCitySearches'); // Container for displaying previous city searches
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
            .attr('id', city)
            .text(city);
        previousCitiesEl.append(cityBtn);
    });
}

function geoLocationGet(searchInput) {
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q=';
    const url2 = '&limit=1&appid=14462ac933eb3455a10c1a0bd20bdd1e';
    const urlInput = url + searchInput + url2;

    fetch(urlInput)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

function forecastGet() {

}

function currentWeatherGet() {

}

searchBtnEl.on('click', function () {
    loadPreviousCitySearches();
    const searchInput = citySearchEl.val().trim();
    if (searchInput) {
        cityList.push(searchInput);
        savePreviousCitySearches();
        citySearchEl.val(''); // Clear the input field
        displayPreviousCitySearches(); // Update the displayed list
    }

    geoLocationGet(searchInput);
});

previousCitiesEl.on('click', function () {
})

function init() {
    loadPreviousCitySearches();
}

init();
