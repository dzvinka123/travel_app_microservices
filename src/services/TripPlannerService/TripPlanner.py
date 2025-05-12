import os
from flask import Flask, request, jsonify
import logging


from dotenv import load_dotenv
import requests
from flask_cors import CORS

logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s"
)
trip_planner = Flask(__name__)
CORS(trip_planner)

load_dotenv()
SERVICE_API_WEATHER = os.getenv("VITE_REACT_APP_API_WEATHER")
SERVICE_API_COORDS = os.getenv("VITE_REACT_APP_API_COORDS")
SERVICE_API_PLACES = os.getenv("VITE_REACT_APP_API_PLACES")


def get_to_Service(payload, serviceUrl):
    try:
        response = requests.get(serviceUrl, params=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logging.error(f"[TripPlanner] Service error: {e}")
        return {"error": str(e)}, 500


@trip_planner.route("/retrieve", methods=["POST"])
def retrieve_travel_data():
    request_data = request.get_json()
    service = request_data.get("service")
    payload = request_data.get("payload")

    if service == "MapService":
        result = get_to_Service(
            payload, "http://coords_service:8002" + "/coords-service"
        )
        return jsonify(result), 200

    elif service == "WeatherService":
        result = get_to_Service(
            payload, "http://weather_service:8001" + "/weather-service"
        )
        return jsonify(result), 200

    elif service == "VisitPlaceService":
        result = get_to_Service(
            payload, "http://places_service:8003" + "/places-service"
        )
        return jsonify(result), 200

    return jsonify({"error": "Unknown service"}), 400
