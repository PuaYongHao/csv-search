import express from "express";

import bodyParser from "body-parser";
import cors from "cors";

import CSVRouter from "./routes/csv";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

// Load the /csv routes
app.use("/csv", CSVRouter);

// Global error handling
app.use((_req, res, _next) => {
    res.status(500).send("An unexpected error occurred.");
});

export default app;
