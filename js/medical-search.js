var MedicalSearch = function() {
  this.doctors = [];
};

MedicalSearch.prototype.findDoctors = function(searchQuery, cityDataArray, doctorApiKey) {
  var lat = cityDataArray[1];
  var long = cityDataArray[2];
  $.get("https://api.betterdoctor.com/2016-03-01/doctors?query=" + searchQuery + "&location=" + lat + "%2C" + long + "%2C100&user_location=" + lat + "%2C" + long + "&skip=0&limit=25&user_key=" + doctorApiKey)
  .then(function(result) {
    console.log(result);
  })
  .fail(function(error) {
    console.log("There was an error with the doctor API request");
  });
}

exports.searchModule = MedicalSearch;
