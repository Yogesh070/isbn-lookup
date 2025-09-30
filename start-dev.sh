#!/bin/bash

# Start both Django backend and Next.js frontend

echo "Starting ISBN Lookup servers..."

# Start Django backend
echo "Starting Django backend..."
cd backend
source venv/bin/activate
python manage.py runserver &
DJANGO_PID=$!

# Wait for Django to start
sleep 3

# Start Next.js frontend
echo "Starting Next.js frontend..."
cd ../frontend
npm run dev &
NEXTJS_PID=$!

echo ""
echo "Servers started!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop"

# Cleanup on exit
cleanup() {
    echo "Stopping servers..."
    kill $DJANGO_PID 2>/dev/null
    kill $NEXTJS_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM
wait
