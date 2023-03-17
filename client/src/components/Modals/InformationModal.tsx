import { AuthProps } from "@/src/types/forms";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SwitchAuthModalButton from "../Buttons/SwitchAuthModalButton";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import FormModal from "./FormModal";
import ResetPasswordModal from "./ResetPasswordModal";

const InformationModal = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    return setOpen(false);
  };

  return (
    <Transition show={open}>
      <Dialog open={open} onClose={handleClose} className="relative z-50">
        <Transition.Child
          enter="transition-opacity ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex w-full min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full py-6 px-4 flex flex-col items-center gap-6 rounded-md bg-main text-neutral-light md:max-w-lg md:px-6">
                <div className="w-full px-2 flex flex-row-reverse">
                  <button
                    type="button"
                    className="w-7 h-7 flex flex-row-reverse text-neutral-light focus-visible:p-0"
                  >
                    <XMarkIcon className="w-full" onClick={handleClose} />
                  </button>
                </div>
                <Dialog.Title className="text-center text-3xl">
                  MERCI
                </Dialog.Title>

                <p className="max-w-md my-2 mx-auto px-[2px] whitespace-pre-line">
                  Merci à tous les joueurs pour ce premier split de saison
                  régulière.
                  <br />
                  <br />
                  Le site n&apos;assurera pas les pickem pour les playoffs mais nous
                  serons de retour pour le split d&apos;été (<em>dates non annoncées</em>).
                  <br />
                  <br />
                  Durant cette période les inscriptions seront fermées.
                  <br />
                  <br /><strong>À bientôt :)</strong>
                </p>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default InformationModal;
