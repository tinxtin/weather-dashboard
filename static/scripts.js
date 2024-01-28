var kelvin = 273.15;

async function getCoord(city, countryCode) {
    var apiKey = "ad3a67673c70bf6e46cfdf36f8a1767d";
    queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`;
    return fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return coord = {
                lat: data[0].lat,
                lon: data[0].lon
            }
        })
}

async function currWeather(location, country) {
    getCoord(location, country)
    .then(function(response) {
        var apiKey = "ad3a67673c70bf6e46cfdf36f8a1767d";
        queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&cnt=5&appid=${apiKey}`;
        fetch(queryURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
                var currTemp = (data.list[0].main.temp - kelvin).toFixed(2);
                var currWind = data.list[0].wind.speed;
                var currHumid = data.list[0].main.humidity;

                var icon = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
                
                $('#today').append(
                    $('<h3>').text(`${data.city.name}`).append($('<img>').attr('src', icon)),
                    $('<div>').text(`Temp: ${currTemp} °C`),
                    $('<div>').text(`Wind: ${currWind} MPH`),
                    $('<div>').text(`Humidity: ${currHumid}%`));
            })
    });
}

async function forecastWeather(location, country) {
    getCoord(location, country)
    .then(function(response) {
        var apiKey = "ad3a67673c70bf6e46cfdf36f8a1767d";
        queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&cnt=5&appid=${apiKey}`;
        fetch(queryURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
            })
    });

}
currWeather('Brighton', 'GB')
forecastWeather('Brighton', 'GB');



