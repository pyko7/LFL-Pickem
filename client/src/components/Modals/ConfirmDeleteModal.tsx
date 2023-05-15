import FormModal from "./FormModal";
import DeleteAccountForm from "../Forms/DeleteAccountForm";

type Props = {
  authModal: boolean;
  setAuthModal: (authModal: boolean) => void;
};

const ConfirmDeleteModal = ({ authModal, setAuthModal }: Props) => {
  const handleClose = () => {
    return setAuthModal(false);
  };

  return (
    <FormModal
      authModal={authModal}
      setAuthModal={setAuthModal}
      title={"Suppression du compte"}
      description={
        "Cette action est irréversible, êtes-vous sûr(e) de vouloir supprimer votre addresse email ? \n   Inscrivez votre adresse email afin de confirmer la suppression définitive de votre compte."
      }
    >
      <DeleteAccountForm handleClose={handleClose} />
    </FormModal>
  );
};

export default ConfirmDeleteModal;
