import React, { useState, useEffect } from 'react';
import Carousel from "./Place-Slideshow"

export default function PlacesWrapper({ input }) {
    const [images, setPhotos] = useState([]);
    const [place, setPlace] = useState(null);
    const [needsUpdate, setNeedsUpdate] = useState(true);


    // TODO: add error handling id, fetching photos, etc
    // TODO: add support for accepting input
    useEffect(() => {
        var map = new window.google.maps.Map(document.createElement('div'), {
            zoom: 8,
            mapId: 'wowMap1'
        });
        var service = new google.maps.places.PlacesService(map);
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

    // useEffect(() => {
    //     async function getPhotos(place) {
    //         try {

    //             const placeId = await getPlaceId(place);
    //             if (!placeId) {
    //                 throw new Error('Place ID not found');
    //             }

    //             const fetchedPhotos = await fetchPhotos(getPhotoRef(placeId));
    //             setPhotos(fetchedPhotos);
    //         } catch (error) {
    //             console.error('Error fetching photos:', error);
    //         }
    //     }
    //     getPhotos('Yaremche'); // replace with destination
    // }, []);

    // async function getPlaceId(location) {
    //     const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&key=${apiKey}`);
    //     const data = await response.json();
    //     if (data.candidates && data.candidates.length > 0) {
    //         return data.candidates[0].place_id;
    //     }
    //     return null;
    // }

    // async function getPhotoRef(placeId) {
    //     const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
    //     const data = await response.json();
    //     if (data.result && data.result.length > 0) {
    //         return data.result.photos.map(photo => photo.photo_reference).slice(0, 10);
    //     }
    //     return null;
    // }

    // async function fetchPhotoFromAPI(placeId) {
    //     const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?photoreference=${placeId}&maxwidth=600&key=${apiKey}`);
    //     const data = await response.json();
    //     if (data.status === 'OK' && data.results && data.results.length > 0) {
    //         return data.results.map(result => result.url);
    //     }
    //     return null;
    // }

    // async function fetchPhotos(photoRefs) {
    //     return photoRefs.map(element => {
    //         fetchPhotoFromAPI(element);
    //     });
    // }

    return (<Carousel images={images} />)
}


