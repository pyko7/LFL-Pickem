import { useState } from "react";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import FormModal from "./FormModal";
import Button from "../Buttons/Button";
import SendEmailForm from "../Forms/SendEmailForm";

type Props = {
  authModal: boolean;
  setAuthModal: (authModal: boolean) => void;
  handleClick: () => void;
};

const AuthModal = ({ authModal, setAuthModal, handleClick }: Props) => {
  const [resetPassword, setResetPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  const handleSignUpForm = () => {
    return signUpForm ? setSignUpForm(false) : setSignUpForm(true);
  };

  return (
    <>
      {signUpForm ? (
        <FormModal
          authModal={authModal}
          setAuthModal={setAuthModal}
          title={"S'inscrire"}
        >
          <SignUpForm handleClose={handleClick} />
          <Button variant="text" onClick={handleSignUpForm}>
            Se connecter
          </Button>
        </FormModal>
      ) : (
        <FormModal
          authModal={authModal}
          setAuthModal={setAuthModal}
          title={"Connexion"}
        >
          <LoginForm handleClose={handleClick} />
          <div className="flex flex-col gap-2">
            <Button variant="text" onClick={() => setResetPassword(true)}>
              Mot de passe oublié ?
            </Button>
            <Button variant="text" onClick={handleSignUpForm}>
              Créer un compte
            </Button>
          </div>

          <FormModal
            authModal={resetPassword}
            setAuthModal={setAuthModal}
            title={"Modification de l'email"}
            description={
              "Entrez votre adresse email afin de recevoir un lien pour la modification du mot de passe"
            }
          >
            <SendEmailForm
              url={"user/reset-password"}
              buttonName={"Réinitialiser le mot de passe"}
            />
          </FormModal>
        </FormModal>
      )}
    </>
  );
};

export default AuthModal;
