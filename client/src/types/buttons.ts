export interface LoginButton {
  setIsOpen: (isOpen: boolean) => void;
  handleClose: () => void;
}

export interface LogoutButton {
  setIsLogged: (isLogged: boolean) => void;
  handleClose: () => void;
}

export interface CloseButton {
  size?: "small" | "large";
  ariaLabel: string;
  handleClose: () => void;
}
