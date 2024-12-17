import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";
import { DialogStateEnum } from "../../enums/dialog";
import { DialogContext } from "../../contexts/DialogContext";
import UploadFilesDialog from "../../components/UploadFilesDialog";
import DataGridComponent from "../../components/DataGrid";
import {
  CSVTableFieldsHeader,
  defaultVisibleCSVTableFields,
  paginationModel,
} from "../../constants/table";
import { CSVTableFieldsEnum } from "../../enums/table";
import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";

const CSVSearchTableContent = () => {
  // Contexts
  const { dialogState, handleCloseDialog, handleOpenDialog } =
    React.useContext(DialogContext);

  const handleClickUpload = React.useCallback(() => {
    handleOpenDialog(DialogStateEnum.uploadFile);
  }, [handleOpenDialog]);

  // TODO
  const handleClickUploadCSV = React.useCallback(async (files?: FileList) => {
    if (!files || !files.length) return;
    console.log(files);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        field: CSVTableFieldsEnum.postId,
        headerName: CSVTableFieldsHeader.postId,
        flex: 0.1,
      },
      {
        field: CSVTableFieldsEnum.id,
        headerName: CSVTableFieldsHeader.id,
        flex: 0.1,
      },
      {
        field: CSVTableFieldsEnum.name,
        headerName: CSVTableFieldsHeader.name,
        flex: 0.2,
      },
      {
        field: CSVTableFieldsEnum.email,
        headerName: CSVTableFieldsHeader.email,
        flex: 0.2,
      },
      {
        field: CSVTableFieldsEnum.body,
        headerName: CSVTableFieldsHeader.body,
        flex: 0.4,
      },
    ],
    []
  );

  const generateRows = (numRows: number) => {
    const defaultData = {
      [CSVTableFieldsEnum.name]: "id labore ex et quam laborum",
      [CSVTableFieldsEnum.email]: "Eliseo@gardner.biz",
      [CSVTableFieldsEnum.body]:
        "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    };

    const rows = [];
    for (let i = 1; i <= numRows; i++) {
      rows.push({
        [CSVTableFieldsEnum.postId]: String(i),
        [CSVTableFieldsEnum.id]: String(i),
        ...defaultData,
      });
    }
    return rows;
  };

  const rows = generateRows(50);

  const columnVisibilityModel = React.useMemo(
    () =>
      Object.keys(rows?.[0] || {}).reduce(
        (model, field) => ({
          ...model,
          [field]: defaultVisibleCSVTableFields?.includes(field),
        }),
        {} as { [key: string]: boolean }
      ),
    [rows]
  );

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbar />
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={handleClickUpload}
        >
          Upload
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <DataGridComponent
        columns={columns}
        rows={rows}
        initialState={{
          columns: { columnVisibilityModel },
          pagination: { paginationModel },
        }}
        slots={{ toolbar: CustomToolbar }}
      />
      <UploadFilesDialog
        accept=".csv"
        dialogState={dialogState}
        handleCloseDialog={handleCloseDialog}
        handleUpload={handleClickUploadCSV}
        multiple={false}
        snackbarMessage="Uploading CSV..."
        title="Upload CSV File"
      />
    </>
  );
};

export default CSVSearchTableContent;