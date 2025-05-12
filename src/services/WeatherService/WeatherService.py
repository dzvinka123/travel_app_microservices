import os
import time
import httpx
import asyncio
import requests
import logging
from dotenv import load_dotenv
from flask import jsonify
from flask import Flask, request
from datetime import datetime, timedelta

weather_service = Flask(__name__)

load_dotenv()

COORDS_IP = os.getenv("VITE_REACT_APP_API_COORDS")

logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s"
)


@weather_service.route("/weather-service", methods=["GET"])
def get():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    coords_response = requests.get(
        "http://coords_service:8002" + "/coords-service",
        params={"city": city},
        timeout=5,
    )
    if coords_response.status_code != 200:
        return jsonify({"error": "Failed to get coordinates"}), 500

    coords = coords_response.json()
    latitude, longitude = coords["latitude"], coords["longitude"]
    logging.error("latitude, longitude in weather: ", latitude, longitude)

    days_range = request.args.get("days_range")
    temps, start_day = asyncio.run(fetch_temp(latitude, longitude))
    dates = asyncio.run(fetch_days(days_range, temps, start_day))

    return jsonify({"dates": dates})


async def fetch_temp(latitude, longitude):
    """
    Fetching temperature for given coordinates.
    """
    api_url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m&daily=weather_code&forecast_days=14"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(api_url)
            response.raise_for_status()
            data = response.json()

            hourly_temps = data["hourly"]["temperature_2m"]
            daily_codes = data["daily"]["weather_code"]

            days = []
            for i in range(14):
                day_temps = hourly_temps[i * 24 : (i + 1) * 24]
                avg_temp = round(sum(day_temps) / len(day_temps)) if day_temps else None
                days.append([avg_temp, daily_codes[i]])

            return (days, data["daily"]["time"][0])

    except (httpx.HTTPError, KeyError, IndexError) as e:
        print("Error fetching weather data:", e)
        return None


def format_date(date_str):
    """
    Formats the date string.
    """
    month, day, year = date_str.split("/")
    return f"{year}-{month.zfill(2)}-{day.zfill(2)}"


async def fetch_days(days_range: str, temperatures: list, start_day: str):
    """
    Fetching days to form final data.
    """
    if not days_range:
        return None

    try:
        start_date_str, end_date_str = days_range.split(" - ")

        start_date = datetime.strptime(format_date(start_date_str), "%Y-%m-%d")
        end_date = datetime.strptime(format_date(end_date_str), "%Y-%m-%d")
        current_date = datetime.strptime(start_day, "%Y-%m-%d")
        end_date

        dates = []
        count = 0

        while current_date <= end_date and count < len(temperatures):
            if start_date <= current_date <= end_date:
                date_str = current_date.strftime("%Y-%m-%d")
                dates.append(
                    {date_str: [temperatures[count][0], temperatures[count][1]]}
                )
            current_date += timedelta(days=1)
            count += 1

        return dates

    except Exception as e:
        print("Error in fetch_days:", e)
        return None
