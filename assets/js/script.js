const citySearchEl = $('#citySearch')
const SearchBtnEl = $('#searchBtn')
let cityList = []

function loadPreviousCitySearches() {
    JSON.parse(localStorage.getItem('cityList')) || [];
    return cityList
}

function savePreviousCitySearches() {
    localStorage.setItem('cityList', JSON.stringify(cityList));
}

SearchBtnEl.on('click', function() {
    loadPreviousCitySearches();
    searchInput = citySearchEl.val().trim();
    if(searchInput) {
    cityList.push(searchInput);
    savePreviousCitySearches();
    }
})

function init() {
loadPreviousCitySearches()
}

init()