import httpx
from flask import jsonify
from flask import Flask, request
from datetime import datetime, timedelta

app = Flask(__name__)


@app.route("/coords-service", methods=["GET"])
async def fetch_coords():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    api_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(api_url)
            response.raise_for_status()
            data = response.json()

            coords = {
                "latitude": data["results"][0]["latitude"],
                "longitude": data["results"][0]["longitude"],
            }

            return jsonify(coords)

    except (httpx.HTTPError, KeyError, IndexError) as e:
        print("Error fetching city coordinates:", e)
        return jsonify({"error": str(e)}), 500
