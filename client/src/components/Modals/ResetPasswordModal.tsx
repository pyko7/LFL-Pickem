import FormModal from "./FormModal";
import SendEmailForm from "../Forms/SendEmailForm";
import { ModalStateProps } from "@/src/types/modal";

const ResetPasswordModal = ({ isOpen, setIsOpen }: ModalStateProps) => {
  const props = {
    isOpen,
    setIsOpen,
    title: "Modification de l'email",
    description:
      "Entrez votre adresse email afin de recevoir un lien pour la modification du mot de passe",
  };

  const formProps = {
    url: "user/reset-password",
    buttonName: "Réinitialiser le mot de passe",
  };

  return (
    <FormModal {...props}>
      <SendEmailForm {...formProps} />
    </FormModal>
  );
};

export default ResetPasswordModal;
