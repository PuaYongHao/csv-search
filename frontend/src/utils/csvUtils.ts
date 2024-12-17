import { CSVData } from "../types/csv";

export const isPapaParseResult = (result: unknown): result is { data: CSVData[] } => {
    return typeof result === "object" && result !== null && "data" in result;
};
