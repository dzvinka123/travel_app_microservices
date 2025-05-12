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

# load_dotenv("/Users/mariia/Desktop/travel_app_microservices/.env")
# SERVICE_API_WEATHER = str(os.getenv("VITE_REACT_APP_API_WEATHER"))
# SERVICE_API_COORDS = str(os.getenv("VITE_REACT_APP_API_COORDS"))
# SERVICE_API_PLACES = str(os.getenv("VITE_REACT_APP_API_PLACES"))

SERVICE_API_WEATHER = "http://localhost:8001"
SERVICE_API_COORDS = "http://localhost:8002"
SERVICE_API_PLACES = "http://localhost:8003"
# VITE_REACT_APP_API_TRIP_PLANNER=http://localhost:8000
# VITE_REACT_APP_API_COORDS=http://localhost:8002
# VITE_REACT_APP_API_PLACES=http://localhost:8003
# VITE_REACT_APP_GOOGLE_API=AIzaSyCOmlpCB6Lm1tc4gAntK_BeZ21uOLpIaCc
# VITE_CASSANDRA_KEYSPACE=APIkeyspace
# VITE_CASSANDRA_IP=cassandra


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
