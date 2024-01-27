
function getCoord(city, state, countryCode) {
    var apiKey = 'ad3a67673c70bf6e46cfdf36f8a1767d';
    queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${countryCode}&limit=1&appid=${apiKey}`

    return fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            return coord = {
                lat: data[0].lat,
                lon: data[0].lon
            }
        })
}

function currWeatherAPI(location, country) {
    getCoord(location, country)
    .then(function(response) {
        console.log(response)
        var apiKey = 'ad3a67673c70bf6e46cfdf36f8a1767d';
        queryURL = `api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&appid=${apiKey}`;
        console.log(queryURL)
        fetch(queryURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
               console.log(data)
            })
    });

}

currWeatherAPI('Brighton','england', 'GB');



