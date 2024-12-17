import React from "react";

import { CustomContentProps, SnackbarContent } from "notistack";

import { Box, CircularProgress } from "@mui/material";

import "./style.css";

const ProcessingSnackbarComponent = React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, message, iconVariant, hideIconVariant, anchorOrigin, persist, autoHideDuration, ...other } = props;

    return (
        <SnackbarContent ref={ref} role="alert" {...other} className="snackbar_content">
            <Box>
                <span>
                    <div style={{ display: "flex" }}>
                        <CircularProgress color="inherit" size={20} />
                    </div>
                </span>
                <span>{message}</span>
            </Box>
        </SnackbarContent>
    );
});

export default ProcessingSnackbarComponent;
