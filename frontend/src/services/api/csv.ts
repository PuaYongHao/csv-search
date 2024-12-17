import axios from "axios";

import { baseHeaders, baseURL } from "../../constants/api";
import { CSVDataBody } from "../../types/csv";

const axios_api = axios.create({
    baseURL,
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
