import { AlertColor } from "@mui/material";

export interface IToast {
    message: string;
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
    isOpen: boolean;
    autoHideDuration?: number | null | undefined;
    color: AlertColor | undefined;
}