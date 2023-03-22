import { Snackbar as MuiSnackbar, SnackbarContent } from "@mui/material";
import { CSSProperties, FC, useState } from "react";

interface SnackbarProps {
  duration?: number;
  message: string;
}

const style: CSSProperties = { backgroundColor: "red" };

export const Snackbar: FC<SnackbarProps> = ({ message, duration = 2000 }) => {
  const [open, setOpen] = useState(true);
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent style={style} message={<span>{message}</span>} />
    </MuiSnackbar>
  );
};
