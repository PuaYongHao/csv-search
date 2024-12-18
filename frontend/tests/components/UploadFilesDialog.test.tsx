import React from "react";

import { afterEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import UploadFilesDialog from "../../src/components/UploadFilesDialog";
import { initDialogState } from "../../src/constants/dialog";

afterEach(cleanup);

vi.mock("notistack", () => ({
    enqueueSnackbar: vi.fn(),
    closeSnackbar: vi.fn(),
}));

describe("UploadFilesDialog", () => {
    it("should not render when dialog state is not true", () => {
        const { container } = render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState }}
                handleCloseDialog={() => {}}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
            />,
        );
        expect(container).toBeEmptyDOMElement();
    });

    it("should render dialog with default title when title is not provided", () => {
        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={() => {}}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
            />,
        );

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Upload File(s)");
    });

    it("should render dialog with exact title when title is provided", () => {
        const title = "Upload CSV File";
        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={() => {}}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
                title={title}
            />,
        );

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(title);
    });

    it("should show accept attribute on file input if it is being set", () => {
        const attribute = ".csv";
        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={() => {}}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
                accept={attribute}
            />,
        );

        expect(screen.getByPlaceholderText("FileInput")).toHaveAttribute("accept", attribute);
    });

    it("should show accept attribute on file input if it is being set", () => {
        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={() => {}}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
            />,
        );

        expect(screen.getByPlaceholderText("FileInput")).not.toHaveAttribute("accept");
    });

    it("should allow uploading multiple files if multiple is true", () => {
        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={() => {}}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
                multiple={true}
            />,
        );

        expect(screen.getByPlaceholderText("FileInput")).toHaveAttribute("multiple");
    });

    it("should not allow uploading multiple files if multiple is false", () => {
        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={() => {}}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
            />,
        );

        expect(screen.getByPlaceholderText("FileInput")).not.toHaveAttribute("multiple");
    });

    it("should call handleCloseDialog when dialog is closed", () => {
        const mockHandleClose = vi.fn();
        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={mockHandleClose}
                handleUpload={async (_f: FileList) => {}}
                snackbarMessage=""
            />,
        );

        const dialog = screen.getByRole("dialog");
        fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    it("should call handleUpload when upload button is clicked with files", async () => {
        const mockHandleUpload = vi.fn();
        const mockHandleClose = vi.fn();
        const file = new File(["dummy content"], "example.csv", { type: "text/csv" });

        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={mockHandleClose}
                handleUpload={mockHandleUpload}
                snackbarMessage="Uploading file..."
            />,
        );

        const fileInput = screen.getByPlaceholderText("FileInput");
        fireEvent.change(fileInput, { target: { files: [file] } });

        const uploadButton = screen.getByRole("button", { name: /upload/i });
        const user = userEvent.setup();
        await user.click(uploadButton);

        expect(mockHandleClose).toHaveBeenCalledTimes(1);
        expect(mockHandleUpload).toHaveBeenCalledWith(expect.arrayContaining([expect.any(File)]));
    });

    it("should not call handleUpload when upload button is not clicked with files", async () => {
        const mockHandleUpload = vi.fn();
        const mockHandleClose = vi.fn();

        render(
            <UploadFilesDialog
                dialogState={{ ...initDialogState, uploadFile: true }}
                handleCloseDialog={mockHandleClose}
                handleUpload={mockHandleUpload}
                snackbarMessage="Uploading file..."
            />,
        );

        const uploadButton = screen.getByRole("button", { name: /upload/i });
        const user = userEvent.setup();
        await user.click(uploadButton);

        expect(mockHandleClose).toHaveBeenCalledTimes(1);
        expect(mockHandleUpload).not.toHaveBeenCalledWith();
    });
});
