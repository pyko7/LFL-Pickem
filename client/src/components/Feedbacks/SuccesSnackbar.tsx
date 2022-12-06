import { forwardRef } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarProps } from "~/src/types/feedbacks";

const SuccessSnackbar = ({ open, setOpen, message }: SnackbarProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
