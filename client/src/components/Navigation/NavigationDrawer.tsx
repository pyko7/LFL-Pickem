import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import Button from "../Buttons/Button";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { navLinks } from "@/src/utils/navLinks";

type Props = {
  open: boolean;
  setAuthModal: (authModal: boolean) => void;
  handleClose: () => void;
  logoutUser: () => void;
};

const NavigationDrawer = ({
  open,
  setAuthModal,
  handleClose,
  logoutUser,
}: Props) => {
  const { isLogged } = useAuthContext();

  const user = useQuery(["user"], getUserById, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });

  const handleClick = () => {
    if (!isLogged) {
      return setAuthModal(true);
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
              {user.isLoading ? <span>loading...</span> : null}
              {user.isError ? <span>error...</span> : null}
              <span>{user.data?.userName}</span>
              <span className="text-lfl">{user.data?.points} pts</span>
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
