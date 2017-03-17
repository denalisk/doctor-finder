Map = function() {
  this.center;
  this.map;
};

Map.prototype.createCityDataArray = function(locationString) {
  return [locationString, 47.6062, -122.3321];
}

Map.prototype.getCoordinates = function(cityDataArray) {
  // Here, city data array will be ["search location string", "lat", "long"]
  var current = this;
  var city = cityDataArray[0];
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': city}, function(results, status) {
    if (status == 'OK') {
      cityDataArray[1] = results[0].geometry.location.lat();
      cityDataArray[2] = results[0].geometry.location.lng();
      console.log('The result of your search is ' + cityDataArray);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
};

exports.mapModule = Map;
