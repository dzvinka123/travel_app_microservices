import React, { useState, useEffect } from "react";
import Carousel from "./Place-Slideshow";

export default function PlacesWrapper({ input }) {
  const [images, setPhotos] = useState([]);
  const [place, setPlace] = useState(null);
  const [needsUpdate, setNeedsUpdate] = useState(true);

  useEffect(() => {
    setNeedsUpdate(true);
  }, [input]);

  useEffect(() => {
    if (!needsUpdate) return;

    setNeedsUpdate(false);
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      query: input,
      fields: ["place_id"],
    };

    service.findPlaceFromQuery(request, function (results, status) {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        results.length > 0
      ) {
        setPlace(results[0]);
      }
    });
  }, [needsUpdate, input]);

  useEffect(() => {
    if (!place) return;

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    const requestDetails = {
      placeId: place.place_id,
      fields: ["name", "photos"],
    };

    service.getDetails(requestDetails, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const photos = results.photos.map((photo) => photo.getUrl());
        setPhotos(photos.slice(0, 10));
      }
    });
  }, [place]);

  return <Carousel images={images} />;
}
