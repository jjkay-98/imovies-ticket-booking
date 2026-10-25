# iMovies — Movie ticket booking made simple

A responsive movie discovery and cinema booking experience built with React, Vite, Express, and MongoDB. Browse current releases, filter by genre, save favorites, pick a showtime and seats, and receive a booking confirmation with a unique ticket code.

## Features

- Responsive cinematic landing page, movie catalog, search, genre filters, favorites, and newsletter sign-up.
- Seat selection for up to eight seats, five showtimes, and a five-day booking calendar.
- Express REST API with validation, booking conflict checks, and MongoDB persistence.
- Demo catalog works without MongoDB. Booking confirmation is enabled when MongoDB is connected.
- Accessible dialog labels, keyboard-friendly controls, reduced-motion support, and mobile navigation.

## Run locally

1. Install Node.js 18 or newer and MongoDB Community Server (or use a MongoDB Atlas connection string).
2. In this folder, install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` if your database is not at the default local address.
4. Start both the API and web app with `npm run dev`.
5. Open `http://localhost:5173`.

The API listens on port 5000. `npm run build` creates the production frontend in `dist/`.

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | API and database status |
| GET | `/api/movies` | Movie catalog |
| GET | `/api/movies/:id` | One movie |
| GET | `/api/bookings/seats?movieId=...&date=...&showtime=...` | Seats already booked for a show |
| POST | `/api/bookings` | Validate and create a booking |

Booking requests include `movieId`, `date` (`YYYY-MM-DD`), `showtime`, `seats`, `name`, and `email`. Prices are demo USD pricing at $14 per seat. No payment is collected.

## GitHub

Create a repository named `imovies-ticket-booking`, then run:

```bash
git init
git add .
git commit -m "Build iMovies ticket booking app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/imovies-ticket-booking.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Paste the repository URL into the course submission field.

