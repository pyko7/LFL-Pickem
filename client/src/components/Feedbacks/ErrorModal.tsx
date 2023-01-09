import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type ErrorModalProps = {
  betError: boolean;
  errorMessage: string;
  setBetError: (betError: boolean) => void;
};

const ErrorModal = ({
  betError,
  setBetError,
  errorMessage,
}: ErrorModalProps) => {
  const handleClose = () => {
    setBetError(false);
  };

  return (
    <Dialog onClose={handleClose} open={betError}>
      <DialogTitle sx={{ fontSize: 24, fontWeight: 700 }}>
        Erreur
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 15,
            color: (theme) => theme.palette.neutral.dark,
          }}
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContentText sx={{ padding: 2, textAlign: "center" }}>
        {errorMessage}
      </DialogContentText>
    </Dialog>
  );
};

export default ErrorModal;
