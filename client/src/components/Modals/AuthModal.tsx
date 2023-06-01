import { useState } from "react";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import Modal from "./Modal";
import Button from "../Buttons/Button";
import SendEmailForm from "../Forms/SendEmailForm";
import { useMutation } from "@tanstack/react-query";
import { createAnonymousSession } from "@/src/utils/api/auth/createAnonymousSession";
import { useAuthContext } from "@/context/AuthContext";

type Props = {
  authModal: boolean;
  setAuthModal: (authModal: boolean) => void;
};

const AuthModal = ({ authModal, setAuthModal }: Props) => {
  const { setIsLogged } = useAuthContext();
  const [resetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState("");
  const [signUpForm, setSignUpForm] = useState(false);

  const handleSignUpForm = () => {
    return signUpForm ? setSignUpForm(false) : setSignUpForm(true);
  };

  const handleClose = () => {
    return setAuthModal(false);
  };

  const mutation = useMutation({
    mutationFn: createAnonymousSession,
    onError: () => {
      setError("Une erreur est survenue");
    },
    onSuccess: async () => {
      setIsLogged(true);
      handleClose();
    },
  });

  const handleClick = () => {
    mutation.mutate();
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
          {error ? <span className="-mt-10 text-red-500">{error}</span> : null}
          <div className="flex flex-col gap-2">
            <Button variant="text" onClick={handleClick}>
              Continuer en tant qu'invité
            </Button>
            <Button variant="text" onClick={handleSignUpForm}>
              Se connecter
            </Button>
          </div>
        </Modal>
      ) : (
        <Modal
          open={authModal}
          setOpen={setAuthModal}
          title={"Connexion"}
          handleClose={handleClose}
        >
          <LoginForm handleClose={handleClose} />
          {error ? <span className="-mt-10 text-red-500">{error}</span> : null}
          <div className="flex flex-col gap-2">
            <Button variant="text" onClick={handleClick}>
              Continuer en tant qu'invité
            </Button>
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
