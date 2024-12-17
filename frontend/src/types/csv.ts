import { CSVTableFieldsEnum } from "../enums/table";

export type CSVData = {
    [CSVTableFieldsEnum.postId]: string;
    [CSVTableFieldsEnum.id]: string;
    [CSVTableFieldsEnum.name]: string;
    [CSVTableFieldsEnum.email]: string;
    [CSVTableFieldsEnum.body]: string;
};

export type CSVDataBody = {
    data: CSVData[];
};
