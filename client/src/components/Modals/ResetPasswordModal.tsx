import { ResetPasswordProps } from "@/src/types/forms";
import FormModal from "./FormModal";
import SendEmailForm from "../Forms/SendEmailForm";

const ResetPasswordModal = ({
  resetPassword,
  setResetPassword,
}: ResetPasswordProps) => {
  const props = {
    open: resetPassword,
    setOpen: setResetPassword,
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
