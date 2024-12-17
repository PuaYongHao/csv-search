import { DialogStateEnum, DialogStateEnumKeys } from "../enums/dialog";
import { getInitDialogState } from "../utils/dialogUtils";

export const initDialogState = getInitDialogState(
  Object.keys(DialogStateEnum) as DialogStateEnumKeys[]
);
