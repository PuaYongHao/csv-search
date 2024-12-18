import { Box } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef, GridSlotsComponent, GridValidRowModel } from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

import { DEFAULT_PAGE_SIZE_OPTIONS } from "../../constants/table";

import "./style.css";

type DataGridComponentProps = Partial<DataGridProps> & {
    columns: GridColDef<GridValidRowModel>[];
    rows: GridValidRowModel[];
    initialState?: GridInitialStateCommunity;
    slots?: Partial<GridSlotsComponent>;
};

const DataGridComponent = ({ columns, rows, initialState, slots }: DataGridComponentProps) => {
    return (
        <Box className="data_grid_box">
            <DataGrid
                columns={columns}
                rows={rows}
                getRowId={(row: GridValidRowModel) => row.id}
                className="data_grid"
                pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
                disableRowSelectionOnClick
                initialState={initialState}
                slots={slots}
            />
        </Box>
    );
};

export default DataGridComponent;
