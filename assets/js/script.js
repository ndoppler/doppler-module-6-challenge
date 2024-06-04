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

searchBtnEl.on('click', function () {
    loadPreviousCitySearches();
    const searchInput = citySearchEl.val().trim();
    if (searchInput) {
        cityList.push(searchInput);
        savePreviousCitySearches();
        citySearchEl.val(''); // Clear the input field
        displayPreviousCitySearches(); // Update the displayed list
    }
});

previousCitiesEl.on('click', function() {
    console.log("yaya")
})

function init() {
    loadPreviousCitySearches();
}

init();
