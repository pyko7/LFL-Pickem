import { ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  children?: ReactNode;
}

const FormModal = ({ open, setOpen, title, description, children }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Transition show={open}>
      <Dialog open={open} onClose={handleClose} className="relative z-50">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-fit py-6 px-4 flex flex-col items-center gap-6 rounded-md bg-main text-neutral-light">
              <button role="button" className="w-full flex flex-row-reverse text-neutral-light ">
                <XMarkIcon className="w-7 h-7" onClick={handleClose}/>
              </button>
              <Dialog.Title className="text-center text-xl">
                {title}
              </Dialog.Title>

              <p className="max-w-md my-2 mx-auto px-[2px] whitespace-pre-line">
                {description}
              </p>

              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FormModal;
