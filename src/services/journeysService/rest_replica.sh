#!/bin/bash

set -e

echo "Stopping mongod processes on ports 27017, 27018, 27019..."
pkill -f "mongod.*port 27017" || echo "Port 27017 not running"
pkill -f "mongod.*port 27018" || echo "Port 27018 not running"
pkill -f "mongod.*port 27019" || echo "Port 27019 not running"

echo "Removing data directories (~/mongo/rs1, rs2, rs3)..."
rm -rf ../../../mongo/rs1 ../../../mongo/rs2 ../../../mongo/rs3

echo "MongoDB replica set fully cleaned up."
