import { DialogStateEnumKeys } from "../enums/dialog";
import { DialogState } from "../types/dialog";

export const getInitDialogState = (
  keys: DialogStateEnumKeys[]
): DialogState => {
  return keys.reduce(
    (state, key) => ({ ...state, [key]: false }),
    {} as DialogState
  );
};
