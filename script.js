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
    }
  })
}


})



/*not sure of code
  function searchIndexOf() {
    $.ajax({
      type: "GET",
      url:"http://api.openweathermap.org/data/2.5/forecast?q={city}" + searchValue + "&appid=30ce5e2ebe1dfdf0be5f40518a98bd2a" 
      }
  
  //get api id latitude & longitude
    function search(lat, lon) {
      $.ajax({
        type: "GET",
        url:"//http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}" + searchValue + "&appid=30ce5e2ebe1dfdf0be5f40518a98bd2a"   
      }*/
    
      
      
    