# weather-dashboard

## Description
This is a weather application that takes a name of city and display the current and forecasted weather at the location. This application is built on jquery and dayjs libraries, along with openweathermap and geocoding api's to get the weather data. When user types in the city of interest, the dashboard will display the current weather which includes dates, weather icon, temperature, wind and humidity at the location. As well as 5 days forecast with the same information. The input then gets stored in localstorage and displayed on the dashboard for qol, this makes it easier for the user to quickly check the location again.

## Acceptance Criteria

* Create a weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user click on a city in the search history they are again presented with current and future conditions for that city

## Screenshots
![](./screenshots/wd-1.png 'weather dashboard')

## Deployed URL
URL: https://tinxtin.github.io/weather-dashboard/ 