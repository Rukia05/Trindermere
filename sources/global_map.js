var map;
var listeLocations = []; 

function initialize() {
    var myLatlng = new google.maps.LatLng(45.777399, 4.855150);
    var mapOptions = {
        zoom: 16,
        center: myLatlng
    }
    
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
    listeLocations.push(event.latLng);
    alert(event.latLng);
    alert(listeLocations);
    });
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

google.maps.event.addDomListener(window, 'load', initialize);