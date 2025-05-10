import { useRef, useEffect, useState } from "react";
import map_location_marker from "../../img/map_location_marker.png";
import "./widgetstyles.css";

// Load environment variables from .env file
require('dotenv').config();

const API_TRIP_PLANNER = process.env.REACT_APP_API_TRIP_PLANNER;


async function fetchCoordsViaTripPlanner(city) { /////////// !!!!!!!!!!!!!!!!!!!!
  const apiServiceUrl = API_TRIP_PLANNER;
  try {
    const response = await fetch(apiServiceUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: "MapService",
        payload: { name: city },
      }),
    });

    const data = await response.json();
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };

  } catch (error) {
      console.error("Error via TripPlanner:", error);
      return null;
    }
  }
  

export default function Map({ destination }) {
  const ref = useRef();
  const [coords, setCoords] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (destination) {
      fetchCoordsViaTripPlanner(destination)
        .then((coords) => {
          setCoords(coords);
        })
        .catch(console.error);
    }
  }, [destination]);

  useEffect(() => {
    if (coords && ref.current) {
      if (!map) {
        const googleMap = new window.google.maps.Map(ref.current, {
          center: { lat: coords.latitude, lng: coords.longitude },
          zoom: 8,
          mapId: "wowMap",
        });
        setMap(googleMap);
      } else {
        map.setCenter({ lat: coords.latitude, lng: coords.longitude });
      }
    }
  }, [coords]);

  useEffect(() => {
    if (map && coords) {
      if (!marker) {
        const markerImg = {
          url: map_location_marker,
          scaledSize: new google.maps.Size(50, 50),
        };

        const newMarker = new google.maps.Marker({
          map: map,
          position: { lat: coords.latitude, lng: coords.longitude },
          icon: markerImg,
        });

        newMarker.addListener("click", () => {
          const infoWindow = new google.maps.InfoWindow({
            content: "<div>Some info about the location</div>", // Customize as needed
          });
          infoWindow.open(map, newMarker);
        });

        setMarker(newMarker);
      } else {
        marker.setPosition({ lat: coords.latitude, lng: coords.longitude });
      }
    }
  }, [map, coords]);

  return (
    <div ref={ref} id="map" style={{ width: "100%", height: "100%" }}></div>
  );
}
