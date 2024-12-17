import React from "react";

import { initDialogState } from "../constants/dialog";
import { DialogStateEnum } from "../enums/dialog";
import { DialogState } from "../types/dialog";

interface DialogContextInterface {
    dialogState: DialogState;
    handleCloseDialog: (_event?: object, _reason?: "backdropClick" | "escapeKeyDown") => void;
    handleOpenDialog: (stateEnum: DialogStateEnum) => void;
}
const DialogContext = React.createContext({} as DialogContextInterface);

type DialogContextProviderProps = {
    children?: React.ReactNode;
};
const DialogContextProvider = ({ children }: DialogContextProviderProps) => {
    // Hooks
    const [dialogState, setDialogState] = React.useState<DialogState>(initDialogState);

    const handleOpenDialog = React.useCallback(
        (stateEnum: DialogStateEnum) => setDialogState({ ...initDialogState, [stateEnum]: true }),
        [],
    );

    const handleCloseDialog = React.useCallback((_event?: object, _reason?: "backdropClick" | "escapeKeyDown") => {
        setDialogState(initDialogState);
    }, []);

    return (
        <DialogContext.Provider value={{ dialogState, handleCloseDialog, handleOpenDialog }}>
            {children}
        </DialogContext.Provider>
    );
};

export { DialogContext, DialogContextProvider };
