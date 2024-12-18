# CSV Search - Full Stack Application

A full stack application to upload CSV file to database and search/filter CSV data using a robust backend and a modern, user-friendly frontend.

## Technology Stack

### Frontend:

- React
- Vite
- Material-UI
- TypeScript
- Vitest

### Backend:

- Node.js
- Express.js
- MongoDB
- Jest
- Supertest

## Getting Started

Follow these steps to set up and run the application on your local machine.

### Prerequisites

Ensure the following tools are installed on your system.

1. Node.js. Verify installation with:

```
node -v
npm -v
```

2. Git. Verify installation with:

```
git --version
```

### Clone Repository

1. Clone the project

```
git clone https://github.com/PuaYongHao/csv-search.git
```

### Backend Setup

1. Navigate to the `backend` directory

```
cd backend
```

2. Install dependencies

```
npm install
```

3. Create a `.env` file in the `backend` directory and add the following:

```
PORT=9999
DATABASE_URL=mongodb+srv://<db_username>:<db_password>@csv-search.mugt0.mongodb.net/
```

> Replace <db_username> and <db_password> with MongoDB credentials with database access.

4. Compile TypeScript files

```
npm run build
```

5. Start the backend server

```
npm start
```

> The server will run on `http://localhost:9999`

### Frontend Setup

1. Navigate to the `frontend` directory

```
cd frontend
```

2. Install dependencies

```
npm install
```

3. Create a `.env` file in the `frontend` directory and add the following:

```
VITE_PORT=9900
VITE_BASE_URL=http://localhost:9999
```

4. Start the frontend server

```
npm start
```

5. Open your browser and navigate to `http://localhost:9900/`

## CSV Format

The application processes CSV files in the following format:

```
"postId","id","name","email","body"
"1","1","name1","email1","body1"
"1","2","name2","email2","body2"
```

> Make sure your csv files adhere to this structure

## Run Tests

### Backend Tests

1. Navigate to the `backend` directory

```
cd backend
```

2. Run the tests

```
npm test
```

### Frontend Tests

1. Navigate to the `frontend` directory

```
cd frontend
```

2. To run tests for the frontend

```
npm test
```
