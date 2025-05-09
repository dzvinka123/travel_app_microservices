import os
import time
import httpx
import atexit
import requests
from dotenv import load_dotenv
from flask import jsonify
from flask import Flask, request
from cassandra.cluster import Cluster
from datetime import datetime, timedelta

app = Flask(__name__)

load_dotenv()

CLUSTER_IP = os.getenv("CASSANDRA_CLUSTER_IP")

cluster = Cluster([CLUSTER_IP])
session = cluster.connect()

@app.route("/weather-service", methods=["GET"])
def get():
    """
    Handling GET request from API Facade service.
    """
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    coords_response = requests.get(
        "http://localhost:5000/coords-service", params={"city": city}, timeout=5
    )
    if coords_response.status_code != 200:
        return jsonify({"error": "Failed to get coordinates"}), 500

    coords = coords_response.json()
    latitude, longitude = coords["latitude"], coords["longitude"]

    days_range = request.args.get("days_range")
    temps, start_day = fetch_temp(latitude, longitude)
    dates = fetch_days(days_range, temps, start_day)

    update_db(city, latitude, longitude)

    return jsonify(dates)


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


def update_db(city, latitude, longitude):
    """
    Updating the Cassandra cluster.
    """
    session.execute(
    f"""
    INSERT INTO weather_table (city, latitude, longitude, timestamp)
    VALUES ({city}, {latitude}, {longitude}, {time.time()})
    """
    )


def shutdown_cluster():
    """
    Shutting down Cassandra cluster.
    """
    print("Shutting down Cassandra cluster...")
    cluster.shutdown()

atexit.register(shutdown_cluster)
