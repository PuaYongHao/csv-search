import React from "react";

import { afterEach, describe, expect, it } from "vitest";

import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";

import DataGrid from "../../src/components/DataGrid";
import { paginationModel } from "../../src/constants/table";

const columns = [
    {
        field: "column1",
        headerName: "Column 1",
    },
];
const rows = [
    { id: 1, column1: "Row 1 Column 1" },
    { id: 2, column1: "Row 2 Column 1" },
];

const initialState = {
    pagination: { paginationModel },
};

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbar />
        </GridToolbarContainer>
    );
};

afterEach(cleanup);

describe("DataGrid", () => {
    it("should render all column headers", () => {
        render(<DataGrid columns={columns} rows={[]} />);

        columns.forEach((column) => {
            expect(screen.getByText(column.headerName)).toBeInTheDocument();
        });
    });

    it("should render a list of rows", () => {
        render(<DataGrid columns={columns} rows={rows} />);

        const allRows = screen.getAllByRole("row");
        expect(allRows).toHaveLength(rows.length + 1); // number of rows + header row

        rows.forEach((row) => {
            expect(screen.getByText(row.column1)).toBeInTheDocument();
        });
    });

    it("should render no row when there is rows array is empty", () => {
        render(<DataGrid columns={columns} rows={[]} />);

        const allRows = screen.getAllByRole("row");
        expect(allRows).toHaveLength(1); // number of rows + header row

        expect(screen.getByText("No rows")).toBeInTheDocument();
    });

    it("should render correct page size when initial state is provided", () => {
        render(<DataGrid columns={columns} rows={[]} initialState={initialState} />);
        const pageSizeComboBox = screen.getByRole("combobox");
        expect(pageSizeComboBox).toBeInTheDocument();
        expect(pageSizeComboBox).toHaveTextContent("20");
    });

    it("should render default page size when initial state is not provided", () => {
        render(<DataGrid columns={columns} rows={[]} />);
        const pageSizeComboBox = screen.getByRole("combobox");
        expect(pageSizeComboBox).toBeInTheDocument();
        expect(pageSizeComboBox).toHaveTextContent("100");
    });

    it("should render toolbar when it is provided", () => {
        render(<DataGrid columns={columns} rows={[]} slots={{ toolbar: CustomToolbar }} />);
        expect(screen.getByRole("button", { name: /export/i })).toBeInTheDocument();
    });

    it("should not render toolbar when it is not provided", () => {
        render(<DataGrid columns={columns} rows={[]} />);
        expect(screen.queryByRole("button", { name: /export/i })).not.toBeInTheDocument();
    });
});
