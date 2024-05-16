import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import arrowl from '../../img/arrowl.svg';
import arrowr from '../../img/arrowr.svg';
import JourneyManager from './Journey-Manager';
import "./Journeys.css" // Adjust the import path as necessary

export default function JourneysPending() {
  return (
    <section className="journeys-active">
      <div className='journeys-header-container'>
        <h2 className="journeys-header">Pending Journeys</h2>
        <div className="slider-buttons">
          <button className="slider-button-journeys left"><img src={arrowl} alt="left" /></button>
          <button className="slider-button-journeys right"><img src={arrowr} alt="right" /></button>
        </div>
      </div>
      <Swiper
        className="journeys-list"
        modules={[Navigation]}
        slidesPerView={3}
        navigation={{
          nextEl: ".right",
          prevEl: ".left"
        }}
      >
        <SwiperSlide><JourneyManager /></SwiperSlide>
      </Swiper>
    </section>
  );
}
