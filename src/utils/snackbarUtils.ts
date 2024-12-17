import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import React from "react";

interface HandleRunJobWithSnackbar {
  job_func: () => Promise<unknown>;
  message_onError?: string;
  message_onStart?: string;
  persistSnackbar?: boolean;
  snackbarKeyRef?: React.MutableRefObject<SnackbarKey>;
}

export const handleRunJobWithSnackbar = async ({
  message_onStart,
  message_onError,
  job_func,
  snackbarKeyRef,
  persistSnackbar = false,
}: HandleRunJobWithSnackbar) => {
  let key: SnackbarKey = "";
  key = enqueueSnackbar(`${message_onStart ?? "Operation started."}`, {
    variant: "processing",
    persist: true,
  });
  try {
    return await job_func();
  } catch (err) {
    enqueueSnackbar(`${message_onError ?? "Operation failed."} ${err}`, {
      variant: "error",
    });
  } finally {
    if (!!persistSnackbar && !!snackbarKeyRef) {
      snackbarKeyRef.current = key;
    }
    if (key) closeSnackbar(key);
  }
};
