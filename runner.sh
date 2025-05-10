#!/bin/bash

# Start Flask servers on the specified ports
echo "Starting Flask servers..."

# Trip Planner server
FLASK_APP=src/services/TripPlanner.py FLASK_RUN_PORT=8000 FLASK_ENV=development flask run &

# Weather server
FLASK_APP=src/services/WeatherService.py FLASK_RUN_PORT=8001 FLASK_ENV=development flask run &

# Coords server
FLASK_APP=src/services/CoordsService.py FLASK_RUN_PORT=8002 FLASK_ENV=development flask run &

# Places server
FLASK_APP=src/services/GooglePlacesService.py FLASK_RUN_PORT=8003 FLASK_ENV=development flask run &

# Wait for all servers to start
wait

echo "All servers are running on ports 8000, 8001, 8002, and 8003."
