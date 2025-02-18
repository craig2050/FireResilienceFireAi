# FireAI Project

A full-stack application that leverages AI for wildfire prediction and analysis.

## Project Structure

```
fireai/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── database.py
│   ├── models/
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── public/
│   └── src/
└── scripts/
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Features

- FastAPI backend with AI model integration
- React TypeScript frontend
- SQLite database for data persistence
- REST API endpoints for AI predictions
- CORS enabled for local development

## Development

- Backend runs on: http://localhost:8000
- Frontend runs on: http://localhost:3000
- API documentation: http://localhost:8000/docs

## Testing

- Backend tests: `pytest` in the backend directory
- Frontend tests: `npm test` in the frontend directory
