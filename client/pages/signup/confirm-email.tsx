import { useState } from "react";
import { useRouter } from "next/router";
import ConfirmEmailModal from "@/src/components/Modals/ConfirmEmailModal";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import AuthModal from "@/src/components/Modals/AuthModal";

const ConfirmEmail = () => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [userAuth, setUserAuth] = useState(false);

  const formProps = { open, setOpen };
  const authProps = { userAuth, setUserAuth };

  const handleLoginPageClick = () => {
    return userAuth ? setUserAuth(false) : setUserAuth(true);
  };

  const handleVerificationEmailClick = () => {
    return open ? setOpen(false) : setOpen(true);
  };

  return (
    <section className="px-4 text-neutral-light">
      <h1 className="text-2xl font-bold text-center sm:text-3xl">Email de confirmation</h1>
      <div className="w-full mt-8 flex flex-col gap-5 sm:w-3/4 sm:my-12 sm:mx-auto">
        <h2 className="text-2xl font-medium">Bienvenue !</h2>
        <p>
          Vous êtes bientôt prêt à jouer. Nous avons envoyé un email
          de vérification lors de votre inscription.
          <br />
          <br /> Vérifiez votre boîte mail ainsi que vos{" "}
          <strong className="text-secondary">spams</strong> et cliquez sur le
          lien contenu dans l&apos;email.
          <br />
          <br /> Note: l&apos;envoi de l&apos;email peut prendre quelques
          minutes.
        </p>
      </div>
      <hr className="w-4/5 my-12 max-w-2xl mx-auto border-main-light" />

      <div className="w-full mb-12 flex flex-col gap-5 sm:w-3/4">
        <h3 className="text-lg">Déjà confirmé ?</h3>
        <button
          type="button"
          className="w-fit pl-2 pr-5 pt-2.5 pb-2 flex items-center gap-2 rounded text-xs font-medium uppercase border-[1px] border-neutral-light shadow-md hover:shadow-lg"
          onClick={handleLoginPageClick}
        >
          <ArrowRightOnRectangleIcon className="w-7 h-7" aria-hidden="true" />
          Page de connexion
        </button>
      </div>

      <div className="w-full flex flex-col gap-5 sm:w-3/4">
        <h3 className="text-lg">Vous n&apos;avez pas reçu de mail ?</h3>
        <button
          type="button"
          className="w-fit pl-2 pr-5 pt-2.5 pb-2 flex items-center gap-2 rounded text-xs font-medium uppercase border-[1px] border-neutral-light shadow-md hover:shadow-lg"
          onClick={handleVerificationEmailClick}
        >
          <EnvelopeIcon className="w-7 h-7" aria-hidden="true" />
          Renvoyer un email
        </button>
      </div>
      {!open ? null : <ConfirmEmailModal {...formProps} />}
      {!userAuth ? null : <AuthModal {...authProps} />}
    </section>
  );
};

export default ConfirmEmail;
