import { DialogStateEnum } from "../enums/dialog";

export type DialogStateEnumKeys = keyof typeof DialogStateEnum;
export type DialogState = { [key in DialogStateEnumKeys]: boolean };
