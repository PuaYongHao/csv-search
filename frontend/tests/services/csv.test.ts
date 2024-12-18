import { beforeEach, describe, expect, it, vi } from "vitest";

import { getCSVData, postCSVData } from "../../src/services/domain/csv";

const mocks = vi.hoisted(() => ({
    get: vi.fn(),
    post: vi.fn(),
}));

vi.mock("axios", async (importOriginal) => {
    const actual = await importOriginal<typeof import("axios")>();

    return {
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                ...actual.default.create(),
                get: mocks.get,
                post: mocks.post,
            })),
        },
    };
});

vi.mock("notistack", () => ({
    enqueueSnackbar: vi.fn(),
    closeSnackbar: vi.fn(),
}));

const MOCK_CSV_DATA = { data: [{ postId: "1", id: "1", name: "mock_name", email: "mock_email", body: "mock_body" }] };
const MOCK_API_ENDPOINT = "csv";

describe("CSVService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should make GET request and return correct csv data", async () => {
        mocks.get.mockResolvedValueOnce({
            data: MOCK_CSV_DATA,
        });

        const result = await getCSVData();

        expect(mocks.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual(MOCK_CSV_DATA);
    });

    it("should make GET request and return null", async () => {
        mocks.get.mockResolvedValueOnce({
            data: null,
        });

        const result = await getCSVData();

        expect(mocks.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual({});
    });

    it("should handle GET request failure", async () => {
        mocks.get.mockRejectedValueOnce(new Error("Network Error"));

        await expect(getCSVData()).rejects.toThrow("Network Error");
        expect(mocks.get).toHaveBeenCalledTimes(1);
    });

    it("should make POST request with valid data", async () => {
        await postCSVData(MOCK_CSV_DATA);
        expect(mocks.post).toHaveBeenCalledTimes(1);
        expect(mocks.post).toHaveBeenCalledWith(MOCK_API_ENDPOINT, MOCK_CSV_DATA);
    });

    it("should make POST request with invalid data", async () => {
        const message = { message: "Invalid or empty CSV." };
        mocks.post.mockRejectedValueOnce(message);

        await expect(postCSVData({ data: [] })).rejects.toEqual(message);
        expect(mocks.post).toHaveBeenCalledTimes(1);
        expect(mocks.post).toHaveBeenCalledWith(MOCK_API_ENDPOINT, { data: [] });
    });

    it("should handle POST request failure", async () => {
        mocks.post.mockRejectedValueOnce(new Error("Network Error"));

        await expect(postCSVData(MOCK_CSV_DATA)).rejects.toThrow("Network Error");
        expect(mocks.post).toHaveBeenCalledTimes(1);
    });
});
