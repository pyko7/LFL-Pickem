import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { ReactNode } from "react";
import IconButton from "../Buttons/IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  classname?: string;
  handleClose: () => void;
};

const Modal = ({
  open = false,
  setOpen,
  title,
  description,
  children,
  classname,
  handleClose,
}: Props) => {
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
          <div className="fixed inset-0 bg-neutral-950/90" aria-hidden="true" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex w-full min-h-full items-center justify-center p-4 text-neutral-200">
              <Dialog.Panel
                className={`w-full py-6 px-4 flex flex-col items-center gap-6 rounded-md bg-neutral-800 sm:max-w-lg md:px-6 ${classname}`}
              >
                <div className="w-full flex flex-row-reverse">
                  <IconButton onClick={handleClose}>
                    <XMarkIcon />
                  </IconButton>
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

export default Modal;
