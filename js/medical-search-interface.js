var Key = require("./../.env").apiKey;
var Map = require("./../js/map.js").mapModule;
var Search = require("./../js/medical-search.js").searchModule;
var villains = [
  "Rowan North", "Vigo the Carpathian", "Gozer", "James Moriarty", "Stay Puft Marshmallow Man", "Zuul", "Ivo Shandor", "Psychomagnotheric Slime", "ghost", "ghosts", "ghostbusters", "ghostbuster"];

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
  $(".doctor-container").append("<div class='doctor-box well'><div class='row'><div class='col-md-6'><h2>" + doctorObject.getNameTitle() + "</h2><ul id='#" + doctorObject.uId + "_specialties'><h4>Specialties</h4>" + specialtyString + "</ul><ul id='#" + doctorObject.uId + "_practices'><h4>Practices</h4>" + practiceString + "</ul></div><div class='col-md-6'><img class='portrait' src='" + doctorObject.picture + "' alt='" + doctorObject.firstName + "'></div></div></div>");
}

$(function() {
  var newSearch = new Search();
  var newMap = new Map();
  var page = 1;
  var searchQuery = "";
  var searchLocation = "";
  var searchDataArray = [];

  $("#main-form").submit(function(event) {
    event.preventDefault();
    $(".doctor-container").empty();
    console.log("clicky");
    searchQuery = $("#search-query").val();
    searchLocation = $("#search-location").val();
    if(newSearch.checkContains(villains, searchQuery)) {
      $(".bonus-div").show();
    } else {
      searchDataArray = newSearch.createDataArray(searchLocation, searchQuery, page, Key);
      // newSearch.findDoctors(searchDataArray, displayDoctor);
      newMap.getCoordinates(searchDataArray, newSearch.findDoctors, displayDoctor);
      $("#load-more").show();
    }
  });

  $("#load-more").click(function() {
    searchDataArray[4] += 1;
    newMap.getCoordinates(searchDataArray, newSearch.findDoctors, displayDoctor);
  });

  $(".bonus-div").click(function() {
    $(this).hide();
  });

});
