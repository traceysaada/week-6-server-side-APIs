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


        
        searchForecast(city);
        searchForUV(dataReturned.coord.lat, dataReturned.coord.lon);
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
