
var APIKey = '03e23eb4d6e32c18d7d49a0a00b07536';

function currentWeather(weatherURL) {
    fetch(weatherURL)
        .then(function (response){
            if (response.ok){
                return response.json();
            } else {
                throw response.json();
            }}
        ).then(function (data) {
            
            var currentStats = $('#currentList');
            currentStats.empty();
            
            var currentDate = dayjs();
            var formattedDate = currentDate.format('DD/MM/YYYY');
            var currentTitle= $('#currentCity');
            var currentTemp = $('<li>').text("Temperature: " + data.main.temp + "\u00B0C");
            var currentWind = $('<li>').text("Wind: " + data.wind.speed + " Km/H");
            var currentHumid = $('<li>').text("Humidity: " + data.main.humidity + "\u0025");
            var currentIcon = $('#currentIcon');
            currentIcon.attr("src", "https://openweathermap.org/img/w/"+ data.weather[0].icon + ".png")
            currentTitle.text("Current weather in " + data.name + " (" + formattedDate + ")");
            currentStats.append(currentTemp, currentWind, currentHumid);
        })
};


function forecastWeather(forecastURL) {
    fetch(forecastURL)
    .then(function (response){
        if (response.ok){
            return response.json();
        } else {
            throw response.json();
        }})
        .then(function (data) {

            var forecastStats = $('#forecastStats');

            $('#forecastStats').empty();
            for (var i = 0; i < 5; i++){
                var day = (6+((i*8)+1))
                    var forecastCard = $('<div>')

                    forecastCard.addClass("col-3 border border-2 border-primary m-3 ")
                    var forecastIcon = $('<img>').attr("src", "https://openweathermap.org/img/w/"+ data.list[day].weather[0].icon + ".png")
                    var forecastUL = $('<ul>').addClass("  col-5");
                    var forecastTemp = $('<li>').text("Temp: " + data.list[day].main.temp + "\u00B0C");
                    var forecastWind = $('<li>').text("Wind: " + data.list[day].wind.speed + " KMPH");
                    var forecastHumid = $('<li>').text("Humidity: " + data.list[day].main.humidity + "\u0025");
                    var date = dayjs.unix(data.list[day].dt).format('DD/MM');
                    var forecastDate = $('<li>').text("Date: " + date);

                    forecastUL.append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumid);
                    forecastCard.append(forecastUL);
                    forecastStats.append(forecastCard);
                }
        })
};








    $('.btn-submit').on("click", function (event) {
        var history = []
        event.preventDefault();
        city = $("#search-input").val();
        history.push(city);
            for (i = 0; i < history.length; i++){
                var historyButton = $('<button>').addClass('btn-history btn bg-primary text-light m-1');
                historyButton.text(history[i]);
                historyList.append(historyButton);
            }
            getCity(city);
        })
     
    
    var historyList= $("#history");

    $(history).on("click", ".btn-history", function(event){
        event.preventDefault();
        var searchTerm = $(this).text();
        city = searchTerm;
        getCity(city);
    })

    function getCity(city) { 
        var locationURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city  + '&limit=5&appid=' + APIKey;
        fetch(locationURL)
        .then(function (response){
            if (response.ok){
                return response.json();
    
            } else {
                throw response.json();
            }
        }).then(function (data) {
                var lat = data[0].lat
                var lon = data[0].lon;
                var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=metric";
                var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=45&appid=" + APIKey + "&units=metric";
                currentWeather(weatherURL);
                forecastWeather(forecastURL);
                 })
        }