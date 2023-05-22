import { useState } from "react";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import Modal from "./Modal";
import Button from "../Buttons/Button";
import SendEmailForm from "../Forms/SendEmailForm";

type Props = {
  authModal: boolean;
  setAuthModal: (authModal: boolean) => void;
  handleMenu: () => void;
};

const AuthModal = ({ authModal, setAuthModal, handleMenu }: Props) => {
  const [resetPassword, setResetPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  const handleSignUpForm = () => {
    return signUpForm ? setSignUpForm(false) : setSignUpForm(true);
  };

  const handleClose = () => {
    handleMenu();
    return setAuthModal(false);
  };

  return (
    <>
      {signUpForm ? (
        <Modal
          open={authModal}
          setOpen={setAuthModal}
          title={"S'inscrire"}
          handleClose={handleClose}
        >
          <SignUpForm handleClose={handleClose} />
          <Button variant="text" onClick={handleSignUpForm}>
            Se connecter
          </Button>
        </Modal>
      ) : (
        <Modal
          open={authModal}
          setOpen={setAuthModal}
          title={"Connexion"}
          handleClose={handleClose}
        >
          <LoginForm handleClose={handleClose} />
          <div className="flex flex-col gap-2">
            <Button variant="text" onClick={() => setResetPassword(true)}>
              Mot de passe oublié ?
            </Button>
            <Button variant="text" onClick={handleSignUpForm}>
              Créer un compte
            </Button>
          </div>

          <Modal
            open={resetPassword}
            setOpen={setResetPassword}
            title={"Réinitialisation du mot de passe"}
            description={
              "Entrez votre adresse email afin de recevoir un lien pour réinitialiser du mot de passe"
            }
            handleClose={handleClose}
          >
            <SendEmailForm
              url={"auth/reset-password"}
              buttonName={"Réinitialiser le mot de passe"}
            />
          </Modal>
        </Modal>
      )}
    </>
  );
};

export default AuthModal;
