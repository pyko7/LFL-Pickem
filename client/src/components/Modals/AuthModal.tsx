import { AuthProps } from "@/src/types/forms";
import { useState } from "react";
import SwitchAuthModalButton from "../Buttons/SwitchAuthModalButton";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import FormModal from "./FormModal";
import ResetPasswordModal from "./ResetPasswordModal";

const AuthModal = ({ userAuth, setUserAuth }: AuthProps) => {
  const [resetPassword, setResetPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const resetPasswordProps = { resetPassword, setResetPassword };

  const signUpProps = {
    open: userAuth,
    setOpen: setUserAuth,
    title: "S'inscrire",
  };
  const loginProps = {
    open: userAuth,
    setOpen: setUserAuth,
    title: "Connexion",
  };

  const handleClose = () => {
    return setUserAuth(false);
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

  return (
    <>
      {signUpForm ? (
        <FormModal {...signUpProps}>
          <SignUpForm handleClose={handleClose} />
          <hr
            aria-hidden="true"
            className="w-4/5 max-w-2xl mx-auto border-main-light"
          />

          <SwitchAuthModalButton {...switchToLoginModalProps} />
        </FormModal>
      ) : (
        <FormModal {...loginProps}>
          <LoginForm handleClose={handleClose} />
          <button
            type="button"
            className="text-base sm:-mt-8"
            onClick={() => setResetPassword(true)}
          >
            Mot de passe oublié ?
          </button>
          <hr
            aria-hidden="true"
            className="w-4/5 max-w-2xl mx-auto border-main-light"
          />

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
