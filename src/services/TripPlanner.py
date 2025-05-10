import os
from flask import Flask, request, jsonify
import logging


from dotenv import load_dotenv
import requests
from flask_cors import CORS


logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
trip_planner = Flask(__name__)
CORS(trip_planner)

load_dotenv("/Users/dzvina/Desktop/travel_app_microservices/.env")
# SERVICE_API_WEATHER = os.getenv('VITE_REACT_APP_API_WEATHER')
# SERVICE_API_COORDS = os.getenv('VITE_REACT_APP_API_COORDS')
# SERVICE_API_PLACES = os.getenv('VITE_REACT_APP_API_PLACES')

# SERVICE_API_WEATHER = "http://localhost:8001"
# SERVICE_API_COORDS = "http://localhost:8002"

# SERVICE_API_PLACES = "http://localhost:8003"

def get_to_Service(payload, serviceUrl):
    try:
        response = requests.get(serviceUrl, params=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logging.error(f"[TripPlanner] Service error: {e}")
        return {'error': str(e)}, 500



@trip_planner.route('/retrieve', methods=['POST'])
def retrieve_travel_data():
    request_data = request.get_json()
    service = request_data.get('service')
    payload = request_data.get('payload')

    if service == 'MapService':
        result = get_to_Service(payload, "http://localhost:8002/coords-service")
        return jsonify(result), 200
    
    elif service == 'WeatherService':
        result = get_to_Service(payload, "http://localhost:8001/weather-service")
        return jsonify(result), 200

    elif service == 'VisitPlaceService':
        result = get_to_Service(payload, "http://localhost:8003/places-service")
        return jsonify(result), 200

    return jsonify({'error': 'Unknown service'}), 400



# if __name__ == '__main__':
#     logging.info("[Trip-planner Service] Starting on port 8000...")
#     trip_planner.run(debug=True, port=8000)

