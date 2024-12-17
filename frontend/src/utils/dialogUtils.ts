import { DialogState, DialogStateEnumKeys } from "../types/dialog";

export const getInitDialogState = (keys: DialogStateEnumKeys[]): DialogState => {
    return keys.reduce((state, key) => ({ ...state, [key]: false }), {} as DialogState);
};
