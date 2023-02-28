import { ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
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
          enter="transition-opacity ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

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
