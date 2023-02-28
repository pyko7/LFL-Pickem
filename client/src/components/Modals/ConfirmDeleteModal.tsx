import { DeleteAccountProps } from "@/src/types/forms";
import FormModal from "./FormModal";
import DeleteAccountForm from "../Forms/DeleteAccountForm";

const ConfirmDeleteModal = ({
  deleteAccount,
  setDeleteAccount,
}: DeleteAccountProps) => {
  const props = {
    open: deleteAccount,
    setOpen: setDeleteAccount,
    title: `Suppression du compte`,
    description: `Cette action est irréversible, êtes-vous sûr(e) de vouloir supprimer votre addresse email ? \n
    Inscrivez votre adresse email afin de confirmer la suppression définitive de votre compte.`,
  };

  const handleClose = () => {
    return setDeleteAccount(false);
  };

  return (
    <FormModal {...props}>
      <DeleteAccountForm handleClose={handleClose} />
    </FormModal>
  );
};

export default ConfirmDeleteModal;
