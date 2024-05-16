import React, { useState, useEffect } from "react";
import "./createdTripUser.css";
import left from "../../img/left.svg"
import rigth from "../../img/rigth.svg"
import WeatherDay from "./WeatherDay";

import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


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
            longitude: data.results[0].longitude
        };
    } catch (error) {
        console.error("Error fetching city coordinates:", error);
        throw error;
    }
}

async function fetchTemp( latitude, longitude ) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=weather_code&forecast_days=14`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        const code = data.daily.weather_code;

        const days = Array.from({ length: 14 }, (_, i) =>
            [Math.round(data.hourly.temperature_2m.slice(i * 24, (i + 1) * 24).reduce((sum, temp) => sum + temp, 0) / 24), code[i]]
        );

        return ({
            temps: days,
            start_day: data.daily.time[0]
        });

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

async function fetchDays({ days_range, temperatures, start_day}) {
    if (days_range) {
        try {
            const [startDateStr, endDateStr] = days_range.split(" - ");

            const formatDate = (dateStr) => dateStr.includes('.')
                ? dateStr.split('.').reverse().join('-')
                : dateStr.split('/').reverse().join('-');

            const startDate = new Date(formatDate(startDateStr));
            const endDate = new Date(formatDate(endDateStr));
            const start = new Date(start_day)

            const dates = [];
            let count = 0;
            const currentDate = start;

            while (currentDate <= endDate) {
                if (currentDate >= startDate && currentDate <= endDate) {
                    
                    dates.push({ [currentDate.toISOString().split('T')[0]]: [temperatures[count][0], temperatures[count][1] ]});
                }
                currentDate.setDate(currentDate.getDate() + 1);
                count += 1;
            }

            return (
                {
                    temps: dates, 
                }
            );

        } catch (error) {
            console.error(error.message);
        }
    }
}

export default function Weather({ days_range, city }) {
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { latitude, longitude } = await fetchCoords(city);
                const { temps, start_day } = await fetchTemp(latitude, longitude);
                const data = await fetchDays({ days_range, temperatures: temps, start_day: start_day });
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
                <h2> Weather </h2>
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