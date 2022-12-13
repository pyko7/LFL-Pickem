export interface AuthForm {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EmailFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  url: string;
  title: string;
  buttonName: string;
}

export interface DeleteAccountProps {
  deleteAccount: boolean;
  setDeleteAccount: (deleteAccount: boolean) => void;
}
