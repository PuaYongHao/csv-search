import { DialogStateEnum } from "../enums/dialog";
import { DialogStateEnumKeys } from "../types/dialog";
import { getInitDialogState } from "../utils/dialogUtils";

export const initDialogState = getInitDialogState(Object.keys(DialogStateEnum) as DialogStateEnumKeys[]);
