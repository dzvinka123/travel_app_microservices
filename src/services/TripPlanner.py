from flask import Flask, request, jsonify
import logging

import requests

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
trip_planner = Flask(__name__)


def post_to_Service(payload, serviceUrl):
    try:
        response = requests.get(serviceUrl, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logging.error(f"[TripPlanner] MapService error: {e}")
        return {'error': str(e)}, 500



@trip_planner.route('/retrieve', methods=['GET'])
def retrieve_travel_data():
    request_data = request.get_json()
    service = request_data.get('service')
    payload = request_data.get('payload')

    if service == 'MapService':
        result = post_to_Service(payload, "http://localhost:8000/retrieve") # change url
        return jsonify({result}), 200
    
    elif service == 'WeatherService':
        result = post_to_Service(payload, "http://localhost:8000/retrieve")  # change url
        return jsonify({result}), 200

    elif service == 'VisitPlaceService':
        result = post_to_Service(payload, "http://localhost:8000/retrieve")  # change url
        return jsonify({result}), 200

    return jsonify({'error': 'Unknown service'}), 400



if __name__ == '__main__':
    logging.info("[Trip-planner Service] Starting on port 8000...")
    trip_planner.run(debug=True, port=8000)

