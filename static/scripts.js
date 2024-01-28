var kelvin = 273.15;

async function getCoord(city) {
    var apiKey = "ad3a67673c70bf6e46cfdf36f8a1767d";
    queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
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

async function currWeather(city) {
    getCoord(city)
    .then(function(response) {
        var apiKey = "ad3a67673c70bf6e46cfdf36f8a1767d";
        queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&appid=${apiKey}&units=metric`;
        fetch(queryURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
                var currTemp = data.main.temp;
                var currWind = data.wind.speed;
                var currHumid = data.main.humidity;
                var icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                
                $('#today').append(
                    $('<h3>').text(`${data.name}`).append($('<img>').attr('src', icon)),
                    $('<div>').text(`Temp: ${currTemp} °C`),
                    $('<div>').text(`Wind: ${currWind} MPH`),
                    $('<div>').text(`Humidity: ${currHumid}%`));
            })
    });
}

async function forecastWeather(city) {
    getCoord(city)
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

$('#search-button').on('click', function(event) {
    event.preventDefault();
    var result = $('#search-input').val();
    if (result === '') {return};
    $('#today').empty();
    $('#search-input').val('');
    currWeather(result)
})


