import request from "supertest";

import app from "../app";
import CSVModel from "../models/csv";

// Mock the CSVModel
jest.mock("../models/csv");

const validCSVEntry = { postId: "1", id: "1", name: "mock_name", email: "mock_email", body: "mock_body" };

describe("GET /csv", () => {
    describe("when there is data in database", () => {
        beforeAll(() => {
            (CSVModel.findOne as jest.Mock).mockResolvedValue({
                data: [{ ...validCSVEntry }],
            });
        });

        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/csv");
            expect(response.statusCode).toBe(200);
        });
        test("should specify json in the content type header", async () => {
            const response = await request(app).get("/csv");
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        });
        test("should return the correct CSV data", async () => {
            const response = await request(app).get("/csv");
            expect(response.body).toEqual({
                data: [{ ...validCSVEntry }],
            });
        });
    });

    describe("when database is empty", () => {
        beforeAll(() => {
            (CSVModel.findOne as jest.Mock).mockResolvedValue(null);
        });

        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/csv");
            expect(response.statusCode).toBe(200);
        });
        test("should specify json in the content type header", async () => {
            const response = await request(app).get("/csv");
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        });
        test("should return a null body", async () => {
            const response = await request(app).get("/csv");
            expect(response.body).toBe(null);
        });
    });

    describe("when there is database error", () => {
        beforeAll(() => {
            (CSVModel.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));
        });

        test("should respond with a 500 status code", async () => {
            const response = await request(app).get("/csv");
            expect(response.statusCode).toBe(500);
        });
        test("should return error message", async () => {
            const response = await request(app).get("/csv");
            expect(response.body.message).toBe("Database error");
        });
    });
});

describe("POST /csv", () => {
    describe("when valid data is sent", () => {
        beforeAll(() => {
            (CSVModel.findOneAndUpdate as jest.Mock).mockResolvedValue({
                data: [{ ...validCSVEntry }],
            });
        });

        test("should respond with a 201 status code", async () => {
            const response = await request(app)
                .post("/csv")
                .send({ data: [{ ...validCSVEntry }] });
            expect(response.statusCode).toBe(201);
        });
        test("should specify json in the content type header", async () => {
            const response = await request(app)
                .post("/csv")
                .send({ data: [{ ...validCSVEntry }] });
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        });
        test("should return saved CSV data", async () => {
            const response = await request(app)
                .post("/csv")
                .send({ data: [{ ...validCSVEntry }] });
            expect(response.body).toEqual({ data: [{ ...validCSVEntry }] });
        });
    });

    describe("when invalid data is sent", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).post("/csv").send({ data: [] });
            expect(response.statusCode).toBe(404);
        });
        test("should return error message", async () => {
            const response = await request(app).post("/csv").send({});
            expect(response.body.message).toBe("Invalid or empty CSV.");
        });
    });

    describe("when there is database error", () => {
        beforeAll(() => {
            (CSVModel.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("Database error"));
        });

        test("should respond with a 500 status code", async () => {
            const response = await request(app)
                .post("/csv")
                .send({ data: [{ ...validCSVEntry }] });
            expect(response.statusCode).toBe(500);
        });
        test("should return error message", async () => {
            const response = await request(app)
                .post("/csv")
                .send({ data: [{ ...validCSVEntry }] });
            expect(response.body.message).toBe("Database error");
        });
    });
});
