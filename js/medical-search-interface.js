var Key = require("./../.env").apiKey;
var Map = require("./../js/map.js").mapModule;
var Search = require("./../js/medical-search.js").searchModule;

$(function() {
  var newSearch = new Search();
  var newMap = new Map();

  $("#main-form").submit(function(event) {
    event.preventDefault();
    console.log("clicky");
    var searchQuery = $("#search-query").val();
    var searchLocation = $("#search-location").val();
    var cityDataArray = newMap.createCityDataArray(searchLocation);
    newSearch.findDoctors(searchQuery, cityDataArray, Key);
    // newMap.getCoordinates(newMap.createCityDataArray(searchLocation));
  });

});
