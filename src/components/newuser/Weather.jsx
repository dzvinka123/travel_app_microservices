import React, { useState, useEffect } from "react";
import left from "../../img/left.svg"
import rigth from "../../img/rigth.svg"
import WeatherDay from "./WeatherDay";

import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function Weather({ days_range, city }) {
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const { latitude, longitude } = await fetchCoords(city);
                // const { temps, start_day } = await fetchTemp(latitude, longitude);
                // const data = await fetchDays({ days_range, temperatures: temps, start_day: start_day });
                setTemperatureData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setTemperatureData([]);
            }
        };
        fetchData();
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
                            const newDate = date.split("-").reverse()[0] + "." + date.split("-").reverse()[1] + ".";
                            return (
                                <SwiperSlide key={index}><WeatherDay key={index} day={newDate} temp={temperature[0]} icon={temperature[1]} />  </SwiperSlide >
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
