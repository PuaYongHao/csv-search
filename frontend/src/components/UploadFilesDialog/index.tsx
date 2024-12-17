import React from "react";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

import { DialogState } from "../../types/dialog";
import { handleRunJobWithSnackbar } from "../../utils/snackbarUtils";

type UploadFileDialogProps = {
    accept?: string;
    dialogState: DialogState;
    handleCloseDialog: () => void;
    handleUpload: (f: FileList) => Promise<void>;
    multiple?: boolean;
    snackbarMessage: string;
    title?: string;
};

const UploadFilesDialogComponent = ({
    accept,
    dialogState,
    handleCloseDialog,
    handleUpload,
    multiple,
    snackbarMessage,
    title,
}: UploadFileDialogProps) => {
    // Hooks
    const [files, setFiles] = React.useState<FileList>();

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files || ({} as FileList);
        if (!Object.keys(files)?.length) return;
        setFiles(files);
    };

    const handleClickUpload = async () => {
        handleCloseDialog();
        if (!files) return;
        await handleRunJobWithSnackbar({
            job_func: async () => await handleUpload(files),
            message_onStart: snackbarMessage,
            message_onError: `Upload failed.`,
        });
    };

    return (
        <Dialog open={dialogState.uploadFile} onClose={handleCloseDialog}>
            <DialogTitle>{title ?? "Upload File(s)"}</DialogTitle>
            <DialogContent>
                <input type="file" multiple={multiple ?? false} accept={accept} onChange={handleChange} />
            </DialogContent>
            <Button onClick={handleClickUpload}>Upload</Button>
        </Dialog>
    );
};

export default UploadFilesDialogComponent;
