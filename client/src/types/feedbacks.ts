export interface SnackbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
}

export interface ErrorModalProps {
  betError: boolean;
  errorMessage: string;
  setBetError: (betError: boolean) => void;
}
