# Technology Stack

## Frontend:

- React
- Vite
- Material-UI
- TypeScript
- Jest

## Backend:

- Node.js
- Express.js
- MongoDB

# Getting Started

## Clone Repository

1. Clone the repository

```
git clone https://github.com/PuaYongHao/csv-search.git
```

## Backend Setup

1. Install backend dependencies

```
cd backend
npm install
```

2. Create a `.env` file in the `backend` directory and set the required environment variables

```
PORT=9999
DATABASE_URL=mongodb+srv://<db_username>:<db_password>@csv-search.mugt0.mongodb.net/
```

3. Compile TypeScript files

```
npm run build
```

4. Run backend server

```
npm start
```

## Frontend Setup

1. Install frontend dependencies

```
cd frontend
npm install
```

2. Create a `.env` file in the `frontend` directory and set the required environment variables

```
VITE_PORT=9900
VITE_BASE_URL=http://localhost:9999
```

3. Run frontend server

```
npm start
```

# Run Tests

1. To run tests for the backend

```
cd backend
npm test
```

2. To run tests for the frontend

```
cd frontend
npm test
```
