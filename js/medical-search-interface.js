var Key = require("./../.env").apiKey;
var Map = require("./../js/map.js").mapModule;
var Search = require("./../js/medical-search.js").searchModule;

var displayDoctor = function(doctorObject, displayFunction) {
  var specialtyString = "";
  var practiceString = "";

  for(var index = 0; index < doctorObject.specialties.length; index++) {
    var newString = "<li>" + doctorObject.specialties[index] + "</li>";
    specialtyString += newString;
  }
  for(var jdex = 0; jdex < doctorObject.practices.length; jdex++) {
    var phone1 = "None listed";
    if(doctorObject.practices[jdex][2][0]) {
      phone1 = doctorObject.practices[jdex][2][0];
    }
    var newString = "<ul><h4>Practice Name: " + doctorObject.practices[jdex][0] + "</h4><li>Address: " + doctorObject.practices[jdex][1].street + "; " + doctorObject.practices[jdex][1].city + ", " + doctorObject.practices[jdex][1].state + "</li><li>Main Phone: " + phone1 + "</li></ul>";
    practiceString += newString;
  }
  $(".doctor-container").append("<div class='doctor-box well'><h2>" + doctorObject.getNameTitle() + "</h2><ul id='#" + doctorObject.uId + "_specialties'><h4>Specialties</h4>" + specialtyString + "</ul><ul id='#" + doctorObject.uId + "_practices'><h4>Practices</h4>" + practiceString + "</ul></div>");
}

$(function() {
  var newSearch = new Search();
  var newMap = new Map();
  var page = 1;

  $("#main-form").submit(function(event) {
    event.preventDefault();
    $(".doctor-container").empty();
    console.log("clicky");
    var searchQuery = $("#search-query").val();
    var searchLocation = $("#search-location").val();
    var searchDataArray = newSearch.createDataArray(searchLocation, searchQuery, page, Key);
    newSearch.findDoctors(searchDataArray, displayDoctor);
    // newMap.getCoordinates(newMap.createCityDataArray(searchLocation));
  });

});
