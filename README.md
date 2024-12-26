# CSV Search - Full Stack Application

A full stack application to upload CSV file to a database and search/filter CSV data using a robust backend and a modern, user-friendly frontend.

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
- TypeScript
- Jest
- Supertest

## Getting Started

Follow the steps below to set up and run the application on your local machine.

### Prerequisites

Ensure the following tools are installed on your system.

1. Node.js and npm. Verify installation with:

   ```
   node -v
   npm -v
   ```

2. Git. Verify installation with:

   ```
   git --version
   ```

### Clone Repository

Clone the project using the following command:

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

3. Create a `.env` file in the `backend` directory and add the following variables:

   ```
   PORT=9999
   DATABASE_URL=mongodb+srv://<db_username>:<db_password>@csv-search.mugt0.mongodb.net/
   ```

   > Replace <db_username> and <db_password> with MongoDB credentials.

   #### Database Credentials

   This section provides the temporary MongoDB credential for accessing the database.

   - **Username**: temp_user
   - **Password**: Txmt4kr4042yucko
     > This account is valid until **2 January 2025**

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

3. Create a `.env` file in the `frontend` directory and add the following variables:

   ```
   VITE_PORT=9900
   VITE_BASE_URL=http://localhost:9999
   ```

4. Start the frontend server

   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:9900/`

## Application Features and Instructions

- Upload CSV Files:
  Click the `UPLOAD` button to select and upload a CSV file. The application processes CSV files in the following format:

  ```
  "postId","id","name","email","body"
  "1","1","name1","email1","body1"
  "1","2","name2","email2","body2"
  ```

  > Ensure that your csv file follow this structure and two sample CSV files are available

- Show/Hide Columns:

  - Click the `COLUMNS` button to toggle the visibility of specific columns

- Filter Data:

  - Click the `FILTERS` button to filter the CSV data

- Adjust Density:

  - Click the `DENSITY` button to switch between compact, standard, or comfortable views

- Export Data:

  - Click the `EXPORT` button to download the CSV data as a file or print it as a PDF

- Sort Columns:

  - Click the arrows next to column headers to sort the data in ascending/descending order

- Adjust Column Widths:

  - Drag column headers to resize the columns as needed

- Pagination:
  - Adjust the number of rows displayed per page using the dropdown in the footer
  - Use the pagination controls to navigate between pages

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
