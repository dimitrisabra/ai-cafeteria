# AI Cafeteria

Smart cafeteria web app with:
- A React frontend for browsing meals and interacting with an AI-style chat assistant
- A Flask backend for recommendations, chat filtering, menu APIs, and contact email sending

## Tech Stack

- Frontend: React, React Router, React Bootstrap, Axios
- Backend: Flask, Flask-CORS, python-dotenv

## Features

- Browse main menu, beverages, snacks, and desserts
- Daily meal view
- Meal recommendations by preferences (`vegetarian`, `healthy`, `spicy`)
- Chat assistant with category, dietary, and price filters
- Contact form that sends email via Gmail SMTP
- Dark mode toggle
- Local rating persistence using `localStorage`

## Project Structure

```text
.
|-- backend
|   |-- app.py
|   |-- requirements.txt
|   `-- .env
|-- frontend
|   |-- package.json
|   `-- src
`-- README.md
```

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+

## Setup

### 1. Backend (Flask)

From `backend/`:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create or update `backend/.env`:

```env
CONTACT_SENDER_EMAIL=your_email@gmail.com
CONTACT_RECIPIENT_EMAIL=your_email@gmail.com
CONTACT_APP_PASSWORD=your_gmail_app_password
```

Run backend:

```powershell
python app.py
```

Backend runs on `http://localhost:5000`.

### 2. Frontend (React)

From `frontend/`:

```powershell
npm install
npm start
```

Frontend runs on `http://localhost:3000`.

By default, React proxy forwards API calls to `http://localhost:5000` (configured in `frontend/package.json`).

Optional: if you want chat calls to use a custom backend URL, set:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

## API Endpoints

Base URL: `http://localhost:5000`

- `GET /menu`
  - Returns main meals list.
- `POST /recommend`
  - Body:
    ```json
    { "vegetarian": 1, "healthy": 0, "spicy": 1 }
    ```
  - Returns top 3 recommended meals.
- `POST /chat`
  - Body:
    ```json
    { "message": "healthy meals under 10", "clientDay": 16 }
    ```
  - Returns:
    - `reply`: assistant text
    - `items`: matched items
    - `total`: item count
- `POST /contact`
  - Body:
    ```json
    { "name": "John", "message": "Hello!" }
    ```
  - Sends an email using configured Gmail credentials.

## Notes

- `CONTACT_APP_PASSWORD` should be a Gmail App Password (not your normal Gmail password).
- Chat message max length on backend is `300` characters.
- Contact message max length is `2000` characters.

## Scripts

Frontend (`frontend/package.json`):

- `npm start` - run development server
- `npm run build` - production build
- `npm test` - run tests

Backend:

- `python app.py` - run Flask app

## License

Add your preferred license (MIT, Apache-2.0, etc.) before publishing.
