var map;
var lastMarker=[];

function initialize() {
    var myLatlng = new google.maps.LatLng(45.777399, 4.855150);
    var mapOptions = {
        zoom: 16,
        center: myLatlng
    }
    
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
        
        var latInput = document.getElementById("latInput");
        var longInput = document.getElementById("longInput");
        
        latInput.value = event.latLng.lat();
        longInput.value = event.latLng.lng();
    });


}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    
    if (lastMarker.length != 0)
    {
        clearMarker();
        google.maps.event.addListener(marker, 'click', function(event) {
            alert('click');
        });
    }

    lastMarker = marker;
    
}

function clearMarker() {

    lastMarker.setMap(null);
    lastMarker = null;

}



google.maps.event.addDomListener(window, 'load', initialize);