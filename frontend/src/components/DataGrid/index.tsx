import { Box } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";
import "./style.css";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "../../constants/table";

type DataGridComponentProps = Partial<DataGridProps> & {
  columns: GridColDef<GridValidRowModel>[];
  rows: GridValidRowModel[];
};

const DataGridComponent = ({
  columns,
  rows,
  ...props
}: DataGridComponentProps) => {
  return (
    <Box className="data_grid_box">
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row: GridValidRowModel) => row.id}
        className="data_grid"
        pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
        autosizeOnMount
        disableRowSelectionOnClick
        {...props}
      />
    </Box>
  );
};

export default DataGridComponent;
