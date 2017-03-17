var MedicalSearch = function() {
  this.doctors = [];
};
var dId = 1;

var Doctor = function(docData) {
  this.uId = dId;
  this.firstName = docData.profile.first_name;
  this.lastName = docData.profile.last_name;
  this.middleName = "";
  this.picture = docData.profile.image_url;
  this.gender = docData.profile.gender;
  this.mainTitle = docData.profile.title;
  this.specialties = [];
  this.practices = []
  // practices looks like [["name", address_object, [phone1, phone2]]]

  if(docData.profile.middle_name) {
    this.middleName = docData.profile.middle_name;
  }

  for(var specialtyI = 0; specialtyI < docData.specialties.length; specialtyI++) {
    this.specialties.push(docData.specialties[specialtyI].name);
  }
  for(var practiceI = 0; practiceI < docData.practices.length; practiceI++) {
    var practice = [docData.practices[practiceI].name,      docData.practices[practiceI].visit_address, []];
    for(var phoneI = 0; phoneI < docData.practices[practiceI].phones.length; phoneI++) {
      if(!(checkContains(practice[2], docData.practices[practiceI].phones[phoneI].number))) {
        practice[2].push(docData.practices[practiceI].phones[phoneI].number);
      }
    }
    this.practices.push(practice);
  }
  dId++;
}

Doctor.prototype.getNameTitle =  function() {
  return (this.firstName + " " + this.middleName + " " + this.lastName + ", " + this.mainTitle);
}

var checkContains = function(checkArray, checkItem) {
  for(var index = 0; index < checkArray.length; index++) {
    if(checkItem === checkArray[index]) {
      return true;
    }
  }
}

MedicalSearch.prototype.createDataArray = function(locationString, searchQuery, page, doctorApiKey) {
  return [locationString, 47.6062, -122.3321, searchQuery, page, doctorApiKey];
}

MedicalSearch.prototype.findDoctors = function(searchDataArray displayFunction) {
  var current = this;
  var searchQuery = searchDataArray[0];
  var lat = searchDataArray[1];
  var long = searchDataArray[2];
  var searchQuery = searchDataArray[3];
  var page = searchDataArray[4];
  var doctorApiKey = searchDataArray[5];
  $.get("https://api.betterdoctor.com/2016-03-01/doctors?query=" + searchQuery + "&location=" + lat + "%2C" + long + "%2C100&user_location=" + lat + "%2C" + long + "&skip=" + (page * 25) + "&limit=5&user_key=" + doctorApiKey)
  .then(function(result) {
    console.log(result);
    for(var index = 0; index < result.data.length; index++) {
      var newDoctor = new Doctor(result.data[index]);
      current.doctors.push(newDoctor);
      displayFunction(newDoctor);
    }
    console.log(current.doctors);
  })
  .fail(function(error) {
    console.log("There was an error with the doctor API request");
  });
}

exports.searchModule = MedicalSearch;
