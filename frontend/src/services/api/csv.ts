import axios from "axios";

import { baseHeaders } from "../../constants/api";
import { CSVDataBody } from "../../types/csv";

const axios_api = axios.create({
    baseURL: "http://localhost:3001",
    headers: { ...baseHeaders },
});

// TODO
export class CSVService {
    constructor() {}

    async getCSVData() {
        return await axios_api.get("csv");
    }
    async postCSVData(body: CSVDataBody) {
        return await axios_api.post("csv", body);
    }
    async deleteCSVData(data: DeleteProjectRegisterScenarioBody) {
        return await axios_api.delete("csv", { data });
    }
}
