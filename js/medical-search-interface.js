var Keys = require("./../.env").apiKeyModule;

var myKeys = new Keys();



$(function() {
  document.getElementById('script-holder').innerHTML += "<" + "scr" + "ipt>src='https://maps.googleapis.com/maps/api/js?key=" + myKeys.googleMapsKey + "' async defer><" + "/sc" + "ript>";
  
  console.log("in");
  $("#search-button").click(function() {
    console.log("clicky");
    var searchQuery = $("#search-query").val();
    var searchLocation = $("#search-location").val();
    console.log("query is " + searchQuery + "\n location is " + searchLocation);
  });

});
