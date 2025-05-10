import os
import atexit
import requests
from dotenv import load_dotenv
from flask import jsonify
from flask import Flask, request
from cassandra.cluster import Cluster
from datetime import datetime

load_dotenv()

# CLUSTER_IP = os.getenv("CASSANDRA_CLUSTER_IP")
VITE_REACT_APP_GOOGLE_API = "AIzaSyCOmlpCB6Lm1tc4gAntK_BeZ21uOLpIaCc"
# VITE_REACT_APP_GOOGLE_API = os.getenv("VITE_REACT_APP_GOOGLE_API")
# COORDS_IP = os.getenv("VITE_REACT_APP_API_COORDS")
visit_place_service = Flask(__name__)

# cluster = Cluster([CLUSTER_IP])
# session = cluster.connect()


def get_place_details(place_id):
    """Get details for a place using Place Details API"""
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "fields": "rating,user_ratings_total,opening_hours",
        "key": VITE_REACT_APP_GOOGLE_API,
    }
    response = requests.get(url, params=params).json()

    if response["status"] == "OK":
        result = response["result"]
        hours = "Work hours not available"
        if "opening_hours" in result:
            weekday_text = result["opening_hours"].get("weekday_text", [])
            if weekday_text:
                today_index = datetime.now().weekday()  # Monday = 0
                hours = weekday_text[today_index]
        return {"hours": hours}
    else:
        return {"hours": "Work hours not available"}


@visit_place_service.route("/places-service", methods=["GET"])
def load_places():
    """Find nearby tourist attractions and get details"""
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    coords_response = requests.get(
        "http://localhost:8002/coords-service", params={"city": city}, timeout=5
    )
    if coords_response.status_code != 200:
        return jsonify({"error": "Failed to get coordinates"}), 500

    coords = coords_response.json()
    lat, lng = coords["latitude"], coords["longitude"]

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{lat},{lng}",
        "radius": 300,
        "type": "tourist_attraction",
        "key": VITE_REACT_APP_GOOGLE_API,
    }

    response = requests.get(url, params=params).json()

    if response["status"] != "OK":
        raise Exception(f"Nearby Search failed: {response['status']}")

    results = response.get("results", [])
    places_details = []

    for place in results:
        detail = get_place_details(place["place_id"])
        photo_url = "placeholder-image-url"
        if "photos" in place and place["photos"]:
            photo_ref = place["photos"][0]["photo_reference"]
            photo_url = (
                f"https://maps.googleapis.com/maps/api/place/photo"
                f"?maxwidth=400&photoreference={photo_ref}&key={VITE_REACT_APP_GOOGLE_API}"
            )

        rating = (
            f"Rating: {place.get('rating')} ({place.get('user_ratings_total', 0)} reviews)"
            if "rating" in place
            else "Rating not available"
        )

        places_details.append(
            {
                "id": place["place_id"],
                "name": place["name"],
                "address": place.get("vicinity", "Address not available"),
                "rating": rating,
                "hours": detail["hours"],
                "imageUrl": photo_url,
            }
        )

    return jsonify(places_details)


# def update_db(city_name, place_id, name, address, latitude, longitude):
#     """
#     Updating the Cassandra cluster.
#     """
#     session.execute(
#     f"""
#     INSERT INTO places_table (city_name, place_id, name, address, latitude, longitude)
#     VALUES ({city_name}, {place_id}, {name}, {address}, {latitude}, {longitude})
#     """
#     )


# def shutdown_cluster():
#     """
#     Shutting down Cassandra cluster.
#     """
#     print("Shutting down Cassandra cluster...")
#     cluster.shutdown()


# atexit.register(shutdown_cluster)

# if __name__ == '__main__':
#     visit_place_service.run(debug=True, port=8003)
