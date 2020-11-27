$(document).ready(function() {

  var apiKey = "30ce5e2ebe1dfdf0be5f40518a98bd2a";
$(".btn").on("click", function(){
 var searchedCity = $("#myInput").val(); 
console.log(searchedCity)
 searchForCityWeather(searchedCity);
})

function searchForCityWeather(city){
  $.ajax({
    type: "GET",
    url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    dataType: "json",
    success: function(dataReturned){
      console.log("CityCurrentWeather", dataReturned);


      searchForecast(city); 
      searchForUV(dataReturned.coord.lat, dataReturned.coord.lon);
    }
  })
}

function searchForecast(city) {
  $.ajax({
    type: "GET",
    url:`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
    dataType: "json",
    success: function(dataReturned){
      console.log("CityForecast", dataReturned);
    }
    })
  }
  function searchForUV(lat, lon) {
    $.ajax({
      type: "GET",
      url:`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      dataType: "json",
      success: function(dataReturned){
        console.log("UVData", dataReturned)
      } 
    })

  }     
      
})