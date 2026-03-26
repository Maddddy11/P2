#!/bin/sh

# Create the MongoDB data directory
mkdir -p /data/db

# Start MongoDB in the background
echo "Starting MongoDB..."
mongod --dbpath /data/db --bind_ip 127.0.0.1 --logpath /var/log/mongodb.log --fork

# Wait for MongoDB to start
echo "Waiting for MongoDB..."
until mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 1
done
console.log("MongoDB is up!")

# Start the Node.js application
echo "Starting ProTech Server..."
node server/index.js
