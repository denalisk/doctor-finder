Map = function() {
  this.center;
  this.map;
};

Map.prototype.getCoordinates = function(searchDataArray, searchFunction, displayFunction) {
  // Here, city data array will be ["search location string", "lat", "long"]
  var current = this;
  var city = searchDataArray[0];
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': city}, function(results, status) {
    if (status == 'OK') {
      searchDataArray[1] = results[0].geometry.location.lat();
      searchDataArray[2] = results[0].geometry.location.lng();
      searchFunction(searchDatarray, displayFunction);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

exports.mapModule = Map;
