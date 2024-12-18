import React from "react";

import { enqueueSnackbar } from "notistack";
import Papa from "papaparse";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";

import DataGridComponent from "../../components/DataGrid";
import UploadFilesDialog from "../../components/UploadFilesDialog";
import { CSVTableFieldsHeader, defaultVisibleCSVTableFields, paginationModel } from "../../constants/table";
import { CSVContext } from "../../contexts/CSVContext";
import { DialogContext } from "../../contexts/DialogContext";
import { DialogStateEnum } from "../../enums/dialog";
import { CSVTableFieldsEnum } from "../../enums/table";
import { postCSVData } from "../../services/domain/csv";
import { isPapaParseResult } from "../../utils/csvUtils";

const CSVSearchTableContent = () => {
    // Contexts
    const { dialogState, handleCloseDialog, handleOpenDialog } = React.useContext(DialogContext);
    const { CSVFileData, refreshCSV } = React.useContext(CSVContext);

    // Hooked variables
    const rows = React.useMemo(
        () =>
            CSVFileData?.data?.map((c) => {
                return { ...c };
            }),
        [CSVFileData?.data],
    );
    const columns = React.useMemo(
        () => [
            {
                field: CSVTableFieldsEnum.postId,
                headerName: CSVTableFieldsHeader.postId,
                flex: 0.05,
            },
            {
                field: CSVTableFieldsEnum.id,
                headerName: CSVTableFieldsHeader.id,
                flex: 0.05,
            },
            {
                field: CSVTableFieldsEnum.name,
                headerName: CSVTableFieldsHeader.name,
                flex: 0.25,
            },
            {
                field: CSVTableFieldsEnum.email,
                headerName: CSVTableFieldsHeader.email,
                flex: 0.15,
            },
            {
                field: CSVTableFieldsEnum.body,
                headerName: CSVTableFieldsHeader.body,
                flex: 0.5,
            },
        ],
        [],
    );
    const columnVisibilityModel = React.useMemo(
        () =>
            Object.keys(rows?.[0] || {}).reduce(
                (model, field) => ({
                    ...model,
                    [field]: defaultVisibleCSVTableFields?.includes(field),
                }),
                {} as { [key: string]: boolean },
            ),
        [rows],
    );

    const handleClickUpload = React.useCallback(() => {
        handleOpenDialog(DialogStateEnum.uploadFile);
    }, [handleOpenDialog]);

    const handleClickUploadCSV = React.useCallback(
        async (files?: FileList) => {
            if (!files || !files.length) return;
            const file = files[0];
            // Parse the CSV file
            Papa.parse(file, {
                header: true, // Treat the first row as headers
                complete: async (result: unknown) => {
                    if (isPapaParseResult(result)) {
                        // Filter out rows which has empty value
                        const filteredData = result.data?.filter((row) =>
                            Object.values(row).every((value) => value !== ""),
                        );
                        const jsonData = { data: filteredData };
                        await postCSVData(jsonData);
                        await refreshCSV();
                    }
                },
                error: (_error: unknown) => {
                    enqueueSnackbar("Error parsing CSV file.", { variant: "error" });
                },
            });
        },
        [refreshCSV],
    );

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbar />
                <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={handleClickUpload}>
                    Upload
                </Button>
            </GridToolbarContainer>
        );
    };

    return (
        <>
            <DataGridComponent
                columns={columns}
                rows={rows ?? []}
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
