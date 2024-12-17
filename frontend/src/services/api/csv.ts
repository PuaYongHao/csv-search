import axios from "axios";

import { baseHeaders } from "../../constants/api";
import { CSVDataBody } from "../../types/csv";

// TODO
const axios_api = axios.create({
    baseURL: "http://localhost:27000",
    headers: { ...baseHeaders },
});

export class CSVService {
    constructor() {}

    async getCSVData() {
        return await axios_api.get("csv");
    }
    async postCSVData(body: CSVDataBody) {
        return await axios_api.post("csv", body);
    }
}
