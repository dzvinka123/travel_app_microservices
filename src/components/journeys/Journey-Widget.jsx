import "./widgetstyles.css"

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

export default function JourneyWidget({ onClose }) {
    const googleKey = process.env.REACT_APP_GOOGLE_API;
    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="container">
                    <script src={`https://maps.googleapis.com/maps/api/js?key=${googleKey}&loading=async&callback=initMap`}></script>
                    <div className="first-row-container">
                        <div className="block"></div>
                        <div className="block"></div>
                        <div className="smallblock-container">
                            <div className="small-block"></div>
                            <div className="small-block"></div>
                        </div>
                    </div>
                    <div className="second-row-container">
                        <div className="block to-do-block"></div>
                        <div className="big-block">
                            <div id="map"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
