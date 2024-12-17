import React from "react";

import { getCSVData } from "../services/domain/csv";
import { CSVData } from "../types/csv";

interface CSVContextInterface {
    CSVFileData: CSVData;
}
const CSVContext = React.createContext({} as CSVContextInterface);

type CSVContextProviderProps = {
    children?: React.ReactNode;
};
const CSVContextProvider = ({ children }: CSVContextProviderProps) => {
    // Hooks
    const [CSVFileData, setCSVFileData] = React.useState<CSVData>({} as CSVData);

    const refreshCSV = async () => {
        return await getCSVData(true).then((res) => {
            if (!res) return;
            setCSVFileData(res);
            return res;
        });
    };

    React.useEffect(() => {
        refreshCSV();
    }, []);

    return <CSVContext.Provider value={{ CSVFileData }}>{children}</CSVContext.Provider>;
};

export { CSVContext, CSVContextProvider };
