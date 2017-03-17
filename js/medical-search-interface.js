var Key = require("./../.env").apiKey;
var Map = require("./../js/map.js").mapModule;
var Search = require("./../js/medical-search.js").searchModule;

var displayDoctor = function(doctorObject, displayFunction) {
  $(".doctor-container").append("<div class='doctor-box well col-md-6'><h2>" + doctorObject.getNameTitle() + "</h2><div id='#" + doctorObject.uId + "_specialties'><h4>Specialties</h4></div><div id='#" + doctorObject.uId + "_practices'><h4>Practices</h4></div></div>");
  for(var index = 0; index < doctorObject.specialties.length; index++) {
    console.log("appending " + doctorObject.specialties[index] + " to #" + doctorObject.uId + "_specialties" );
    $("#" + doctorObject.uId + "_specialties").append("<li>" + doctorObject.specialties[index] + "</li>")
  }
  for(var jdex = 0; jdex < doctorObject.practices.length; jdex++) {
    var phone1 = "None listed";
    if(doctorObject.practices[jdex][2][0]) {
      phone = doctorObject.practices[jdex][2][0];
    }
    $("#" + doctorObject.uId + "_practices").append("<li>Practice Name: " + doctorObject.practices[jdex][0] + "</li><li>Address: " + doctorObject.practices[jdex][1] + "</li><li>Main Phone: " + doctorObject.practices[jdex][2][0] + "</li>");
  }
}

$(function() {
  var newSearch = new Search();
  var newMap = new Map();
  var page = 1;

  $("#main-form").submit(function(event) {
    event.preventDefault();
    console.log("clicky");
    var searchQuery = $("#search-query").val();
    var searchLocation = $("#search-location").val();
    var cityDataArray = newMap.createCityDataArray(searchLocation);
    newSearch.findDoctors(searchQuery, cityDataArray, page, Key, displayDoctor);
    // newMap.getCoordinates(newMap.createCityDataArray(searchLocation));
  });

});
