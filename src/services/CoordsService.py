import requests
from flask import jsonify
from flask import Flask, request

coords_service = Flask(__name__)


@coords_service.route("/coords-service", methods=["GET"])
def fetch_coords():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    api_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}"

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        coords = {
            "latitude": data["results"][0]["latitude"],
            "longitude": data["results"][0]["longitude"],
        }

        return jsonify(coords)

    except (requests.HTTPError, KeyError, IndexError) as e:
        print("Error fetching city coordinates:", e)
        return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     coords_service.run(debug=True, port=8002)
