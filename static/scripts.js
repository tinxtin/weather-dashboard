var apiKey = "ad3a67673c70bf6e46cfdf36f8a1767d";

function saveLocation(result) {
    $('#history').append($('<button>').text(result).attr({id: 'history-btn', 'data-city': result}))
    
}

async function getCoord(city) {
    queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    return fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return coord = {
                city: data[0].name,
                lat: data[0].lat,
                lon: data[0].lon
            }
        })
}

async function currWeather(city) {
    $('#today').empty();
    getCoord(city)
    .then(function(coord) {
        queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
        fetch(queryURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var currTemp = data.main.temp;
                var currWind = data.wind.speed;
                var currHumid = data.main.humidity;
                var icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                var currDate = dayjs().format('D/M/YYYY');
                $('#today').append(
                    $('<h3>').text(`${coord.city}`).append($('<img>').attr('src', icon)),
                    $('<div>').text(currDate),
                    $('<div>').text(`Temp: ${currTemp} °C`),
                    $('<div>').text(`Wind: ${currWind} MPH`),
                    $('<div>').text(`Humidity: ${currHumid}%`));
            })
    });
}

async function forecastWeather(city) {
    $('#forecast').children('h4').empty();
    $('#forecast').prepend($('<h4>').text('5-Day Forecast:'))
    $('#forecast-list').empty();
    var nextDate = 1;
    getCoord(city)
    .then(function(coord) {
        queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
        fetch(queryURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                for(var i = 7; i < data.cnt; i += 8) {
                    var temp = data.list[i].main.temp;
                    var wind = data.list[i].wind.speed;
                    var humid = data.list[i].main.humidity;
                    var icon = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                    var dates = dayjs(dayjs(dayjs().format()).add(nextDate++, 'd').toString()).format('D/M/YYYY');

                    $('#forecast-list').append($('<div>').addClass('col').append(
                        $('<div>').text(`${dates}`).append($('<img>').attr('src', icon)),
                        $('<div>').text(`Temp: ${temp} °C`),
                        $('<div>').text(`Wind: ${wind} MPH`),
                        $('<div>').text(`Humidity: ${humid}%`)));
                }
            })
    });

}

$('#search-button').on('click', function(event) {
    event.preventDefault();
    
    var result = $('#search-input').val();
    if (result === '') {return};
    
    $('#search-input').val('');
    currWeather(result);
    forecastWeather(result);
    saveLocation(result);
})


$(document).on('click', '#history-btn', function() {
    console.log('test')
})

