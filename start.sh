#!/bin/bash

PROJECT_DIR=~/aqa-playwright/
APP_IMAGE="aqa-playwright-image"
CONTAINER_NAME="aqa-playwright-container"

cleanup() {
  if [ "$(docker ps -q -f name="$1")" ]; then
    echo "🛑 Stopping existing container: $1"
    docker kill "$1"
  fi

  if [ "$(docker ps -a -q -f name="$1")" ]; then
    echo "🧹 Removing existing container: $1"
    docker rm -f "$1"
  fi

  if [ "$(docker images -q -f reference="$APP_IMAGE")" ]; then
    echo "🧹 Removing existing image: $APP_IMAGE"
    docker rmi -f "$APP_IMAGE"
  fi
}

echo "🛑 Cleaning up $CONTAINER_NAME"
cleanup $CONTAINER_NAME

echo "📁 Changing directory to project $PROJECT_DIR"
cd "$PROJECT_DIR"

echo "🛠️ Building Docker image: $APP_IMAGE"
docker build -t "$APP_IMAGE" .

echo "🚀 Running container: $CONTAINER_NAME"
docker run --name "$CONTAINER_NAME" "$APP_IMAGE"

echo "✅ Script execution completed"
