import dotenv from "dotenv";

import mongoose from "mongoose";

import app from "./app";

dotenv.config();

// Set the network port
const port = process.env.PORT;
const database_url = process.env.DATABASE_URL ?? "";

mongoose
    .connect(database_url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
