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
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      dataType: "json",
      success: function (dataReturned) {
        console.log("CityCurrentWeather", dataReturned);
        var previousSearches = JSON.parse(localStorage.getItem("searches")) || [];
        previousSearches.push(city);
        localStorage.setItem("searches", JSON.stringify(previousSearches))
        $('#previousSearches').empty();
        presentPreviousSearchesFromLocaLStorage();
        $('.currentWeather').empty();
        var citySearchedFor = dataReturned.name;
        console.log(citySearchedFor)
        $(".currentWeather").append($("<h3>").text(citySearchedFor));
        var windSpeed = dataReturned.wind.speed;
        $(".currentWeather").append($("<h3>").text(windSpeed));
       


        searchForecast(city);
        
      },
    });
  }

  function searchForecast(city) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
      dataType: "json",
      success: function (dataReturned) {
        console.log("CityForecast", dataReturned);
      
        //html for the next 5 days weather
          
        
      },
    });
  }
  function searchUV(lat, lon) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      dataType: "json",
      success: function (dataReturned) {
        console.log("UVData", dataReturned);

        //html for the uv index to be displayed

      searchForUV(dataReturned.coord.lat, dataReturned.coord.lon);

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
