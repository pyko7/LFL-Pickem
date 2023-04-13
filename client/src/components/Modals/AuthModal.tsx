import { useState } from "react";
import SwitchAuthModalButton from "../Buttons/SwitchAuthModalButton";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import FormModal from "./FormModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { ModalStateProps } from "@/src/types/modal";

const AuthModal = ({ isOpen, setIsOpen }: ModalStateProps) => {
  const [resetPassword, setResetPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const resetPasswordProps = {
    isOpen: resetPassword,
    setIsOpen: setResetPassword,
  };

  const signUpProps = {
    isOpen,
    setIsOpen,
    title: "S'inscrire",
  };
  const loginProps = {
    isOpen,
    setIsOpen,
    title: "Connexion",
  };

  const handleClick = () => {
    return signUpForm ? setSignUpForm(false) : setSignUpForm(true);
  };

  const switchToLoginModalProps = {
    label: "Déjà inscrit ?",
    name: "Se connecter",
    handleClick,
  };
  const switchToSignUpModalProps = {
    label: "Pas encore de compte ?",
    name: "Inscrivez-vous",
    handleClick,
  };

  const handleClose = () => {
    return setIsOpen(false);
  };

  return (
    <>
      {signUpForm ? (
        <FormModal {...signUpProps}>
          <SignUpForm handleClose={handleClose} />
          <hr aria-hidden="true" className="w-4/5 max-w-2xl mx-auto" />
          <SwitchAuthModalButton {...switchToLoginModalProps} />
        </FormModal>
      ) : (
        <FormModal {...loginProps}>
          <LoginForm handleClose={handleClose} />
          <button
            type="button"
            className="text-base hover:underline hover:underline-offset-2 sm:-mt-8"
            onClick={() => setResetPassword(true)}
          >
            Mot de passe oublié ?
          </button>
          <hr aria-hidden="true" className="w-4/5 max-w-2xl mx-auto" />

          <SwitchAuthModalButton {...switchToSignUpModalProps} />
          {resetPassword ? (
            <ResetPasswordModal {...resetPasswordProps} />
          ) : null}
        </FormModal>
      )}
    </>
  );
};

export default AuthModal;
