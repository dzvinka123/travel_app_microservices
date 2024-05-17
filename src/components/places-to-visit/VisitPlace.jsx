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
      loadPlaces(loadCity).then(setPlaces).catch(console.error);
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
                  <span>{city ? null : place.hours}</span>
                  <span className="rating-place">{city ? null : place.rating}</span>
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

const loadPlaces = async (city) => {
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  const coords = fetchCoords(city);
  const request = {
    location: { lat: (await coords).latitude, lng: (await coords).longitude },
    radius: "500",
    type: ["tourist_attraction"],
  };

  return new Promise((resolve, reject) => {
    service.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const placesDetails = await Promise.all(results.map(async place => {
          const detail = await getPlaceDetails(service, place.place_id);
          const photoUrl = place.photos && place.photos.length > 0 ? place.photos[0].getUrl() : 'placeholder-image-url';
          const rating = place.rating ? `Rating: ${place.rating} (${place.user_ratings_total} reviews)` : "Rating not available";

          return {
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: rating,
            hours: detail.hours,
            imageUrl: photoUrl
          };
        }));
        resolve(placesDetails);
      } else {
        reject(status);
      }
    });
  });
};

const getPlaceDetails = async (service, placeId) => {
  const request = {
    placeId: placeId,
    fields: ['rating', 'user_ratings_total', 'opening_hours']
  };

  return new Promise(resolve => {
    service.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let hours = "Work hours not available";
        if (result.opening_hours) {
          hours = result.opening_hours['weekday_text'][new Date().getDay() - 1]
        }
        resolve({ hours });
      } else {
        resolve({ hours: "Work hours not available" });
      }
    });
  });
};
