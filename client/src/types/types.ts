export interface MobileNavbar {
  open: boolean;
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose: () => void;
}
