import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import Button from "../Buttons/Button";
import { navLinks } from "@/src/utils/navLinks";
import { User } from "@/src/types/types";

type Props = {
  data: User | undefined;
  isLoading: boolean;
  isError: boolean;
  open: boolean;
  handleClose: () => void;
  logoutUser: () => void;
};

const NavigationDrawer = ({
  data,
  isLoading,
  isError,
  open,
  handleClose,
  logoutUser,
}: Props) => {
  const { isLogged, score, setModal } = useAuthContext();

  const handleClick = () => {
    if (!isLogged) {
      return setModal(true);
    }
    logoutUser();
  };

  return (
    <Transition show={open}>
      {/* Background overlay */}
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 bg-neutral-950/80 z-20"
        onClick={handleClose}
      />

      {/* Sliding sidebar */}
      <Transition.Child
        as="nav"
        aria-label="menu"
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-500 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed top-0 right-0 w-64 min-h-screen pl-2 pt-20 pb-4 flex  flex-col justify-between bg-neutral-950 z-30"
      >
        <ul className="w-full pr-10 flex flex-col gap-3 text-lg font-bold">
          {navLinks.map((item) => (
            <li key={item.name} className="w-full flex">
              <Link
                href={item.pathname}
                className="w-full px-4 py-1 rounded-3xl hover:bg-neutral-600/30"
                onClick={handleClose}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full px-4 flex flex-col gap-4">
          {!isLogged ? null : (
            <Link
              href="/profile"
              className="w-fit flex flex-col font-bold text-sm"
            >
              {isLoading ? <span>loading...</span> : null}
              {isError ? <span>error...</span> : null}
              <span>{data?.userName}</span>
              <span className="text-lfl">
                {" "}
                {score ? score : data?.points} pts
              </span>
            </Link>
          )}
          <Button type="button" className="w-fit text-sm" onClick={handleClick}>
            {!isLogged ? "Se connecter" : "Se déconnecter"}
          </Button>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default NavigationDrawer;
