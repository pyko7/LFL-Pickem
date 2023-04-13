import FormModal from "./FormModal";
import DeleteAccountForm from "../Forms/DeleteAccountForm";
import { ModalStateProps } from "@/src/types/modal";

const ConfirmDeleteModal = ({ isOpen, setIsOpen }: ModalStateProps) => {
  const props = {
    isOpen,
    setIsOpen,
    title: `Suppression du compte`,
    description: `Cette action est irréversible, êtes-vous sûr(e) de vouloir supprimer votre addresse email ? \n
    Inscrivez votre adresse email afin de confirmer la suppression définitive de votre compte.`,
  };

  const handleClose = () => {
    return setIsOpen(false);
  };

  return (
    <FormModal {...props}>
      <DeleteAccountForm handleClose={handleClose} />
    </FormModal>
  );
};

export default ConfirmDeleteModal;
