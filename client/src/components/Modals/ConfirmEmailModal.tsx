import { ConfirmEmailProps } from "@/src/types/forms";
import FormModal from "./FormModal";
import SendEmailForm from "../Forms/SendEmailForm";

const ConfirmEmailModal = ({ open, setOpen }: ConfirmEmailProps) => {
  const props = {
    open,
    setOpen,
    title: "Envoie d'un email de confirmation",
    description:
      "Entrez votre adresse email afin de recevoir un lien de confirmation",
  };

  const formProps = {
    url: "auth/confirm-email",
    buttonName: "confirmer l'email",
  };

  return (
    <FormModal {...props}>
      <SendEmailForm {...formProps} />
    </FormModal>
  );
};

export default ConfirmEmailModal;
