export interface AuthForm {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EmailFormProps {
  url: string;
  buttonName: string;
}

export interface ConfirmEmailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface DeleteAccountProps {
  deleteAccount: boolean;
  setDeleteAccount: (deleteAccount: boolean) => void;
}

export interface ResetPasswordProps {
  resetPassword: boolean;
  setResetPassword: (resetPassword: boolean) => void;
}
