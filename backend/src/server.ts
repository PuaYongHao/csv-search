import express from "express";
import CSVRouter from "./routes/csv";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();

// Set the network port
const port = process.env.PORT;
const database_url = process.env.DATABASE_URL ?? "";

mongoose
  .connect(database_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

// Load the /csv routes
app.use("/csv", CSVRouter);

// Global error handling
app.use((_req, res, _next) => {
  res.status(500).send("An unexpected error occurred.");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
