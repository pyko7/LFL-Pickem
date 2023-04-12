import { Transition } from "@headlessui/react";
import { OpenState } from "@/src/types/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import AuthModal from "../Modals/AuthModal";
import LogoutButton from "../Buttons/LogoutButton";
import LoginButton from "../Buttons/LoginButton";

const NavigationDrawer = ({ open, setOpen }: OpenState) => {
  const { isLogged, setIsLogged } = useAuthContext();

  const handleClose = () => {
    return setOpen(false);
  };

  const navLinks = [
    {
      name: "Accueil",
      pathname: "/",
    },
    {
      name: "LFL",
      pathname: "/lfl",
    },
    {
      name: "Div2",
      pathname: "/div2",
    },
    {
      name: "Classement",
      pathname: "/rank",
    },
    {
      name: "Règles",
      pathname: "/rules",
    },
    {
      name: isLogged ? "Profil" : "",
      pathname: isLogged ? "/profile" : "#",
    },
  ];

  return (
    <>
      <Transition show={open}>
        {/* Background overlay */}
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-neutral-950/80 z-10"
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
          className="fixed top-0 right-0 w-64 min-h-screen bg-neutral-950 z-20 xl:w-72"
        >
          <div className="w-full p-4 flex items-center justify-end">
            <button className="w-9 h-9 m-2" onClick={handleClose}>
              <XMarkIcon />
            </button>
          </div>

          <ul className="w-full pl-2 pr-10 py-4 flex flex-col gap-4 text-lg font-bold xl:pl-5">
            {navLinks.map((item) => (
              <li
                key={item.name}
                className={`${
                  item.pathname === "#" ? "hidden" : ""
                } w-full flex`}
              >
                <Link
                  href={item.pathname}
                  className="w-full px-4 py-2 rounded-3xl hover:bg-neutral-600/30"
                  onClick={handleClose}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {!isLogged ? (
            <LoginButton handleClose={handleClose} />
          ) : (
            <LogoutButton setIsLogged={setIsLogged} handleClose={handleClose} />
          )}
        </Transition.Child>
      </Transition>
      {/* <AuthModal {...formProps} /> */}
    </>
  );
};

export default NavigationDrawer;
