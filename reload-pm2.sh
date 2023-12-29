#!/bin/bash

APP_NAME="admin-front-yeap-delivery"

pm2 start ecosystem.config.js || {
    echo "Starting failed, attempting to reload the application..."
    pm2 reload $APP_NAME || {
        echo "Failed to reload the application. Check the application status with 'pm2 status'."
        pm2 status
        exit 1
    }
}

echo "Application successfully started/reloaded."