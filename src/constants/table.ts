import { CSVTableFieldsEnum } from "../enums/table";

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
export const paginationModel = { pageSize: 20 };

export const CSVTableFieldsHeader = {
  [CSVTableFieldsEnum.postId]: "Post ID",
  [CSVTableFieldsEnum.id]: "ID",
  [CSVTableFieldsEnum.name]: "Name",
  [CSVTableFieldsEnum.email]: "Email",
  [CSVTableFieldsEnum.body]: "Body",
};

export const defaultVisibleCSVTableFields = [
  `${CSVTableFieldsEnum.postId}`,
  `${CSVTableFieldsEnum.id}`,
  `${CSVTableFieldsEnum.name}`,
  `${CSVTableFieldsEnum.email}`,
  `${CSVTableFieldsEnum.body}`,
];
