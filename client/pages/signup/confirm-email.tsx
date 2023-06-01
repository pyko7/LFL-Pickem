import { useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Modal from "@/src/components/Modals/Modal";
import SendEmailForm from "@/src/components/Forms/SendEmailForm";
import { useAuthContext } from "@/context/AuthContext";

const ConfirmEmail = () => {
  const { setModal } = useAuthContext();
  const [email, setEmail] = useState(false);

  const handleLoginPageClick = () => {
    return setModal(true);
  };

  const handleVerificationEmailClick = () => {
    return email ? setEmail(false) : setEmail(true);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 text-neutral-light lg:mt-20 xl:px-0">
      <h1 className="text-2xl font-bold text-center sm:text-3xl">
        Confirmer votre email
      </h1>
      <div className="w-full mt-8 flex flex-col gap-5 sm:w-3/4 sm:my-12 sm:mx-auto ">
        <p>
          Vous êtes bientôt prêt à jouer. Nous avons envoyé un email de
          vérification lors de votre inscription.
          <br />
          <br /> Vérifiez votre boîte mail ainsi que vos{" "}
          <strong className="underline underline-of">spams</strong> et cliquez
          sur le lien contenu dans l&apos;email.
          <br />
          <br /> Note: l&apos;envoi de l&apos;email peut prendre quelques
          minutes.
        </p>
      </div>

      <hr aria-hidden="true" className="w-4/5 my-12 max-w-xl mx-auto" />

      <div className="w-full mb-12 flex flex-col gap-5 sm:w-3/4">
        <h3 className="text-lg">Déjà confirmé ?</h3>
        <button
          type="button"
          className="w-fit pl-2 pr-5 py-2.5 flex items-center gap-2 rounded-lg bg-neutral-700 text-xs font-bold tracking-wide uppercase hover:bg-neutral-600"
          onClick={handleLoginPageClick}
        >
          <ArrowRightOnRectangleIcon className="w-7 h-7" aria-hidden="true" />
          Connexion
        </button>
      </div>

      <div className="w-full flex flex-col gap-5 sm:w-3/4">
        <h3 className="text-lg">Vous n&apos;avez pas reçu de mail ?</h3>
        <button
          type="button"
          className="w-fit pl-2 pr-5 py-2.5 flex items-center gap-2 rounded-lg bg-neutral-700 text-xs font-bold tracking-wide uppercase hover:bg-neutral-600"
          onClick={handleVerificationEmailClick}
        >
          <EnvelopeIcon className="w-7 h-7" aria-hidden="true" />
          Renvoyer un email
        </button>
      </div>
      {!email ? null : (
        <Modal
          open={email}
          setOpen={setEmail}
          title={"Email de confirmation"}
          handleClose={handleVerificationEmailClick}
        >
          <SendEmailForm
            url={"auth/confirm-email"}
            buttonName={"Renvoyer un email de confirmation"}
          />
        </Modal>
      )}
    </section>
  );
};

export default ConfirmEmail;
