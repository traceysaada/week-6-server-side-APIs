$(document).ready(function () {
  var apiKey = "30ce5e2ebe1dfdf0be5f40518a98bd2a";
  $(".btn").on("click", function () {
    var searchedCity = $("#myInput").val();
    console.log(searchedCity);
    
    searchForCityWeather(searchedCity);
  });
  
  function searchForCityWeather(city) {
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      dataType: "json",
      success: function (dataReturned) {
        console.log("CityCurrentWeather", dataReturned);
        var previousSearches = JSON.parse(localStorage.getItem("searches")) || [];
        previousSearches.push(city);
        localStorage.setItem("searches", JSON.stringify(previousSearches))
        presentPreviousSearchesFromLocaLStorage();

//html for current weather
var temperature = [];

var weatherSiteUrl = "http://cors-anywhere.herokuapp.com/https://www.metaweather.com/";
var weatherAPIUrl  = weatherSiteUrl + "api/";
var cityLocation = weatherAPIUrl + "location/search/?query=";
var iconUrl = "https://www.metaweather.com/";


function dataReturned () {

$.getJSON(cityLocation + city, function(data) { 

    $.getJSON(weatherAPIUrl + 'location/' + data[0].woeid, function(data) { 
    $('.location').html(city + '<i class="fa fa-map-marker"></i>'); // Name of location
    $('.weather-state').html(data.consolidated_weather[0].weather_state_name);  //Weather state
        temperature[0] = Math.floor(data.consolidated_weather[0].the_temp);
    $('.temperature').html(temperature[0] + '<sup>&deg;</sup><span class="unit">c</span>'); // Temperature
        var weatherImg = iconUrl + 'static/img/weather/' + data.consolidated_weather[0].weather_state_abbr + '.svg';
                $('.weather-icon').html('<img src=' + weatherImg + '>');

    });
});
};

//$(selector + 'temp').text(data.main.temp + "°");  
 // $(selector + 'wind').text(data.wind.speed + "MPH");  
 // $(selector + 'humidity').text(data.main.humidity + "%");  
 // $(selector + 'pressure').text(data.main.pressure + "°");  
    
        searchForecast(city);
        
      },
    });
  }

  function searchForecast(city) {
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
      dataType: "json",
      success: function (dataReturned) {
        console.log("CityForecast", dataReturned);
      
        //html for the next 5 days weather
       
        
        
      },
    });
  }
  function searchForUV(lat, lon) {
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      dataType: "json",
      success: function (dataReturned) {
        console.log("UVData", dataReturned);

        //html for the uv index to be displayed



        //searchForUV(dataReturned.coord.lat, dataReturned.coord.lon);

      },
    });
  }

  function presentPreviousSearchesFromLocaLStorage() {
    var previousSearches = JSON.parse(localStorage.getItem("searches")) || [];
    if (previousSearches.length > 0) {
      for (var i = 0; i < previousSearches.length; i++) {
        var searched = $("<button>").addClass("searchedCity list-group-item").text(previousSearches[i]);
        $("#previousSearches").append(searched);
      }
        }
  }
  presentPreviousSearchesFromLocaLStorage();
});
