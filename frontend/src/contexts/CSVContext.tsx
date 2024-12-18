import React from "react";

import { getCSVData } from "../services/domain/csv";
import { CSVDataBody } from "../types/csv";

interface CSVContextInterface {
    CSVFileData: CSVDataBody;
    refreshCSV: () => Promise<void>;
}
const CSVContext = React.createContext({} as CSVContextInterface);

type CSVContextProviderProps = {
    children?: React.ReactNode;
};
const CSVContextProvider = ({ children }: CSVContextProviderProps) => {
    // Hooks
    const [CSVFileData, setCSVFileData] = React.useState<CSVDataBody>({} as CSVDataBody);

    const refreshCSV = async () => {
        return await getCSVData(false).then((res) => {
            if (!res) return;
            setCSVFileData(res);
            return res;
        });
    };

    React.useEffect(() => {
        refreshCSV();
    }, []);

    return <CSVContext.Provider value={{ CSVFileData, refreshCSV }}>{children}</CSVContext.Provider>;
};

export { CSVContext, CSVContextProvider };
