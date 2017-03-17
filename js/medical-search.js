var MedicalSearch = function() {
  this.doctors = [];
};
var dId = 1;

var Doctor = function(docData) {
  this.uId = dId;
  this.firstName = docData.profile.first_name;
  this.lastName = docData.profile.last_name;
  this.middleName = docData.profile.middle_name;
  this.picture = docData.profile.image_url;
  this.gender = docData.profile.gender;
  this.mainTitle = docData.profile.title;
  this.specialties = [];
  this.practices = []
  // practices looks like [["name", address_object, [phone1, phone2]]]

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

MedicalSearch.prototype.findDoctors = function(searchQuery, cityDataArray, page, doctorApiKey, displayFunction) {
  var current = this;
  var lat = cityDataArray[1];
  var long = cityDataArray[2];
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
