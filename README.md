# ISBN Book Lookup

A simple web app to lookup book information using ISBN numbers. Built with Django backend and Next.js frontend.

## Features

- Enter ISBN-10 or ISBN-13 numbers to find book details
- Shows title, authors, publisher, and cover image
- Clean, responsive design
- Example ISBNs for testing

## Tech Stack

- **Backend**: Django + Django REST Framework
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **API**: Open Library API

## Quick Start

1. **Backend Setup:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Or use the start script:**
   ```bash
   ./start-dev.sh
   ```

Visit `http://localhost:3000` to use the app.

## Example ISBNs

- `978-0-13-468599-1` - Clean Code
- `978-0-321-35668-0` - Effective Java  
- `978-1-449-37094-3` - Learning React

## API

- `GET /api/books/lookup/{isbn}/` - Lookup book by ISBN
