import express from "express";

import CSVModel from "../models/csv";

const router = express.Router();

// Get
router.get("/", async (_req: any, res: any) => {
    try {
        const csvData = await CSVModel.findOne();
        res.status(200).json(csvData);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

// Post
router.post("/", async (req: any, res: any) => {
    const newCSVData = req?.body?.data;

    if (!Array.isArray(newCSVData) || newCSVData.length === 0)
        return res.status(404).json({ message: "Invalid or empty CSV." });

    try {
        const newCSV = await CSVModel.findOneAndUpdate({}, { data: newCSVData }, { new: true, upsert: true });
        res.status(201).json(newCSV);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
