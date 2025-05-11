#!/bin/bash

set -e

# === CONFIG ===
REPLICA_SET_NAME="rs0"
MONGO_BASE="../../../mongo"
PORTS=(27017 27018 27019)

# === Step 1: Create directories ===
echo "Creating data and log directories..."
for i in "${!PORTS[@]}"; do
  DB_PATH="$MONGO_BASE/rs$((i+1))"
  mkdir -p "$DB_PATH"
done

# === Step 2: Start mongod instances ===
# sudo rm /tmp/mongodb-27017.sock
echo "Starting mongod nodes..."
for i in "${!PORTS[@]}"; do
  PORT="${PORTS[$i]}"
  DB_PATH="$MONGO_BASE/rs$((i+1))"
  LOG_PATH="$DB_PATH/mongo.log"
  mongod --replSet "$REPLICA_SET_NAME" --port "$PORT" --dbpath "$DB_PATH" \
    --bind_ip localhost --fork --logpath "$LOG_PATH"
done

# === Step 3: Initiate replica set ===
echo "Initiating replica set..."
mongosh --port 27017 <<EOF
try {
  rs.initiate({
    _id: "$REPLICA_SET_NAME",
    members: [
      { _id: 0, host: "localhost:27017" },
      { _id: 1, host: "localhost:27018" },
      { _id: 2, host: "localhost:27019" }
    ]
  });
  print("Replica set initiated.");
} catch (e) {
  if (e.codeName === 'AlreadyInitialized') {
    print("Replica set already initialized.");
  } else {
    print("Error during replica set initiation:", e);
  }
}
EOF
