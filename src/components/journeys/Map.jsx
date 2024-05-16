import { useRef, useEffect, useState } from "react";
import map_location_marker from '../../img/map_location_marker.png';
import "./widgetstyles.css"

const latlng = { lat: -34.397, lng: 150.644 }; // change according to destination
export default function Map() {
    const ref = useRef();
    const [map, setMap] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        setMap(new window.google.maps.Map(ref.current, {
            center: latlng,
            zoom: 8,
            mapId: 'wowMap'
        }))
        setMapLoaded(true);
    }, []);

    useEffect(() => {
        if (mapLoaded && !marker) {
            const markerImg = document.createElement("img");
            markerImg.src = map_location_marker;

            setMarker(new google.maps.marker.AdvancedMarkerElement({
                map: map,
                position: latlng,
                content: markerImg
            }))

            if (marker) {
                marker.addListener("click", () => {
                    infoWindow.open({
                        anchor: marker,
                        map,
                    });
                });
            }
        }
    }, [mapLoaded, marker]);

    return (
        <div ref={ref} id="map"></div>
    )
}