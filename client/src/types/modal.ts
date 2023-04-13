import { ReactNode } from "react";

export interface FormModal {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description?: string;
}

export interface SwitchForm {
  label: string;
  name: string;
  handleClick: () => void;
}

export interface ModalStateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
