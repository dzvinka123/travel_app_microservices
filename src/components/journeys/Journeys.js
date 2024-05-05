
function initMap() {
    var latlng = {lat: -34.397, lng: 150.644}; // should be according to the journey destination
    var map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 8
    });
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: '../../img/map_location_marker.png',
    });

    var infoWindow = new google.maps.InfoWindow({
        // change address according to the destination
        content: '<div style="color: #141414;"><strong>Australia, Sydney</div></strong><div style="color: rgba(20, 20, 20, 0.74);">Sample Address</div>'
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}