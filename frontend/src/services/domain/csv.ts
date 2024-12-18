import { enqueueSnackbar } from "notistack";

import { CSVDataBody } from "../../types/csv";
import { CSVService } from "../api/csv";

export const getCSVData = async (hideSnackbar = true) => {
    const CSVApi = new CSVService();
    return await CSVApi.getCSVData()
        .then((res) => {
            if (!hideSnackbar) enqueueSnackbar("CSV data is retrieved successfully.", { variant: "success" });
            return res?.data || {};
        })
        .catch((reason: unknown) => {
            enqueueSnackbar("An error was encountered while retrieving the CSV data. Please try again.", {
                variant: "error",
            });
            return Promise.reject(reason);
        });
};

export const postCSVData = async (
    body: CSVDataBody, //
    hideSnackbar = false,
) => {
    const CSVApi = new CSVService();

    return await CSVApi.postCSVData(body)
        .then(() => {
            if (!hideSnackbar) enqueueSnackbar("CSV data is added successfully.", { variant: "success" });
        })
        .catch((reason: unknown) => {
            enqueueSnackbar("An error was encountered while adding the CSV data. Please try again.", {
                variant: "error",
            });
            return Promise.reject(reason);
        });
};
