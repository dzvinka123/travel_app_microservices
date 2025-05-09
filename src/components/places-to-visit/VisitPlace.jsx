import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "../../pages/VisitPlace.css"
import { useLocation } from "react-router-dom";

async function fetchCoords(city) {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch city coordinates");
    }
    const data = await response.json();

    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    throw error;
  }
}

export default function VisitPlace({ city }) {
  const location = useLocation();
  const { from, to, date } = location.state || {}; // Default to empty object to prevent errors if state is undefined

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadCity = city || to;
    if (loadCity) {
      loadPlaces(loadCity).then(setPlaces).catch(console.error); // change here to request to GppglePlacesService
    }
  }, [city, to]);

  const slidesPerView = city ? 1 : 4;

  return (
    <div className="test1">
      {places.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          slidesPerView={slidesPerView}
          spaceBetween={30}
          navigation={{
            nextEl: ".sbnext",
            prevEl: ".sbprev",
          }}
        >
          {places.map((place) => (
            <SwiperSlide key={place.id}>
              <div className="place-card">
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="place-card-image"
                />
                <div className="place-card-info">
                  <h3>{place.name}</h3>
                  <span>{place.address}</span>
                  <span>{place.hours}</span>
                  <span className="rating-place">{place.rating}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Loading places...</p>
      )}
    </div>
  );
}
