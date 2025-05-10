import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "../../pages/VisitPlace.css"
import { useLocation } from "react-router-dom";


async function fetchVisitPlacesViaTripPlanner({ city }) { ///////// !!!!!!!
  const apiServiceUrl = `http://localhost:8000/retrieve`; /// add variable in env
  try {
      const response = await fetch(apiServiceUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "VisitPlaceService",
          payload: { city: city },
        }),
      });
  
      const data = await response.json();
      return {data};
  
    } catch (error) {
        console.error("Error via TripPlanner:", error);
        return null;
      }
  }

export default function VisitPlace({ city }) {
  const location = useLocation();
  const { from, to, date } = location.state || {}; // Default to empty object to prevent errors if state is undefined

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (city) {
      fetchVisitPlacesViaTripPlanner(city).then(setPlaces).catch(console.error);
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
