import FormModal from "./FormModal";
import SendEmailForm from "../Forms/SendEmailForm";

type Props = {
  authModal: boolean;
  setAuthModal: (authModal: boolean) => void;
};

const ConfirmEmailModal = ({ authModal, setAuthModal }: Props) => {
  return (
    <FormModal
      authModal={authModal}
      setAuthModal={setAuthModal}
      title={"Envoie d'un email de confirmation"}
      description={
        "Entrez votre adresse email afin de recevoir un lien de confirmation"
      }
    >
      <SendEmailForm
        url={"auth/confirm-email"}
        buttonName={"Confirmer l'email"}
      />
    </FormModal>
  );
};

export default ConfirmEmailModal;
