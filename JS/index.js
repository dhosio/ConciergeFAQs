// Function to create the google map
function createGoogleMap() {

    // Center Co-ordinates
    var centerLat = -1.2757005803055386
    var centerLong = 36.86114348291353
    
    var theMapProp = {
        center:new google.maps.LatLng(centerLat, centerLong),
        zoom: 5,
      };

    // To get the google map element
    var googleMap = document.getElementById("googleMap")
    var conciergeMap = new google.maps.Map(googleMap, theMapProp);
      
    // Set a marker on concierge location
    var latitude = -1.2757005803055386
    var longitute = 36.86114348291353

    var nairobiMarker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitute),
          // To animate the marker
          animation:google.maps.Animation.BOUNCE
      });

      nairobiMarker.setMap(conciergeMap);

}