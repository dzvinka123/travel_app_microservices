import React, { useState, useEffect } from 'react';
import Carousel from "./Place-Slideshow"

export default function PlacesWrapper({ input }) {
    const [images, setPhotos] = useState([]);
    const [place, setPlace] = useState(null);
    const [needsUpdate, setNeedsUpdate] = useState(true);

    useEffect(() => {
        var service = new google.maps.places.PlacesService(document.createElement('div'));
        if (needsUpdate) {
            setNeedsUpdate(false);

            var request = {
                // query: {input},
                query: 'Yaremche', // change this according to the destination
                fields: ['place_id'],
            };

            service.findPlaceFromQuery(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                    setPlace(results[0]);
                }
            });
        }

        if (typeof (place?.place_id) !== 'undefined') {
            var requestDetails = {
                placeId: place.place_id,
                fields: ['name', 'photos'],
            };

            service.getDetails(requestDetails, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    const photos = results.photos.map(photo => photo.getUrl());
                    setPhotos(photos.slice(0, 10));
                }
            });
        }
    }, [needsUpdate, place]);

    return (<Carousel images={images} />)
}

