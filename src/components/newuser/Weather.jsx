import React, { useState, useEffect } from "react";
import left from "../../img/left.svg"
import rigth from "../../img/rigth.svg"
import WeatherDay from "./WeatherDay";

import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const API_TRIP_PLANNER = import.meta.env.VITE_REACT_APP_API_TRIP_PLANNER;



async function fetchWeatherViaTripPlanner({ city, days_range }) {
  try {
      const response = await fetch(API_TRIP_PLANNER + "/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "WeatherService",
          payload: { city: city, days_range: days_range },
        }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error via TripPlanner:", error);
      return null;
    }
  }

export default function Weather({ days_range, city }) {
const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
    if (days_range && city) {
        fetchWeatherViaTripPlanner({ city, days_range })
            .then((data) => {
            if (data) {
                setTemperatureData({ temps: data.dates });
            } else {
                setTemperatureData({ temps: [] });
            }
            })
            .catch((error) => {
            console.error("Error fetching weather data:", error);
            setTemperatureData({ temps: [] });
            });
        }
    }, [days_range, city]);


    return (
        <div className="weather-div">
            <div className="weather-nav">
                <h2 className="weather-header"> Weather </h2>
                <div className="slider-buttons">
                    <button className="slider-button left"><img src={left} /></button>
                    <button className="slider-button right"><img src={rigth} /></button>
                </div>
            </div>

            <div className="weather-day-div">
                <Swiper
                    className="weather-day-div"
                    modules={[Navigation]}
                    slidesPerView={3}
                    navigation={{
                        nextEl: ".right",
                        prevEl: ".left"
                    }}
                >
                    {Array.isArray(temperatureData.temps) && temperatureData.temps.length > 0 ? (
                            temperatureData.temps.map((temp, index) => {
                            const [date, temperature] = Object.entries(temp)[0];
                            const [year, month, day] = date.split("-");
                            const newDate = `${day}.${month}`;
                            return (
                                <SwiperSlide key={index}>
                                <WeatherDay key={index} day={newDate} temp={temperature[0]} icon={temperature[1]} />
                                </SwiperSlide>
                            );
                            })
                        ) : (
                            <p>No weather data available.</p>
                        )}
                        </Swiper>
                    </div>


            <a href="https://open-meteo.com/">OpenMeteo.com</a>
        </div>
    );
}

