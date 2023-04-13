import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import CloseButton from "../Buttons/CloseButton";
import { FormModal } from "@/src/types/modal";

const FormModal = ({ isOpen, setIsOpen, title, description, children }: FormModal) => {
  const handleClose = () => {
    return setIsOpen(false);
  };

  return (
    <Transition show={isOpen}>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <Transition.Child
          enter="transition-opacity ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-950/90" aria-hidden="true" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex w-full min-h-full items-center justify-center p-4 text-neutral-200">
              <Dialog.Panel className="w-full py-6 px-4 flex flex-col items-center gap-6 rounded-md bg-neutral-800 sm:max-w-lg md:px-6">
                <div className="w-full flex flex-row-reverse">
                  <CloseButton
                    ariaLabel="Fermer la fenêtre modale"
                    handleClose={handleClose}
                  />
                </div>
                <Dialog.Title className="text-center text-xl">
                  {title}
                </Dialog.Title>
                {!description ? null : (
                  <p className="max-w-md my-2 mx-auto px-[2px] whitespace-pre-line">
                    {description}
                  </p>
                )}

                {children}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FormModal;
