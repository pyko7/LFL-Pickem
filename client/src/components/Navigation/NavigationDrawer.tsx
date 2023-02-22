import { useState } from "react";
import { Transition } from "@headlessui/react";
import { DrawerProps } from "@/src/types/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/src/utils/api/auth/logoutUser";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import AuthModal from "../Modals/AuthModal";

const NavigationDrawer = ({ open, setOpen }: DrawerProps) => {
  const { isLogged, setIsLogged } = useAuthContext();
  const { push } = useRouter();
  const [userAuth, setUserAuth] = useState(false);

  const formProps = { userAuth, setUserAuth };

  const handleClose = () => {
    return setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setIsLogged(false);
      push("/login");
    },
  });

  const handleAuthClick = () => {
    return setUserAuth(true);
  };

  const handleLogoutButton = () => {
    handleClose();
    mutation.mutate();
  };

  const navLinks = [
    {
      name: "Accueil",
      pathname: "/",
    },
    // {
    //   name: "Classement",
    //   pathname: "/rank",
    // },
    // {
    //   name: "Calendrier",
    //   pathname: "/schedule",
    // },
    {
      name: "Live",
      pathname: "https://www.twitch.tv/otplol_",
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
          className="fixed inset-0 bg-black/90 z-10"
          onClick={handleClose}
        />

        {/* Sliding sidebar */}
        <Transition.Child
          as="nav"
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in duration-500 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="fixed top-0 right-0 w-64 min-h-screen bg-main-dark z-20"
        >
          <div className="w-full p-4 flex items-center justify-end">
            <button tabIndex={0} className="w-9 h-9 m-2" onClick={handleClose}>
              <XMarkIcon className="text-neutral-light" />
            </button>
          </div>

          <ul className="w-full px-6 py-4 flex flex-col gap-6 text-xl font-bold text-neutral-light ">
            {navLinks.map((item) => {
              return item.name !== "Live" ? (
                <li key={item.name}>
                  <Link href={item.pathname} onClick={handleClose}>
                    {item.name}
                  </Link>
                </li>
              ) : (
                <li className="flex items-center gap-1" key={item.name}>
                  <a href={item.pathname} target="_blank" rel="noreferrer">
                    {item.name} <span style={{ fontSize: 15 }}>(OTP LoL)</span>
                  </a>
                  <ArrowTopRightOnSquareIcon
                    className="w-4 h-4"
                    aria-label="lien externe vers la chaîne twitch OTP lol"
                  />
                </li>
              );
            })}
          </ul>
          {!isLogged ? (
            <button
              tabIndex={0}
              className="absolute bottom-0 left-6 w-auto px-6 py-2 rounded mb-4 mx-auto shadow font-bold text-lg focus:shadow-outline focus:outline-none hover:bg-secondary-light  text-neutral-dark bg-secondary"
              onClick={handleAuthClick}
            >
              Se connecter
            </button>
          ) : (
            <button
              tabIndex={0}
              className="absolute bottom-0 left-6 w-auto px-6 py-2 rounded mb-4 mx-auto shadow font-bold text-lg focus:shadow-outline focus:outline-none hover:bg-secondary-light  text-neutral-dark bg-secondary"
              onClick={handleLogoutButton}
            >
              Se déconnecter
            </button>
          )}
        </Transition.Child>
      </Transition>
      <AuthModal {...formProps} />
    </>
  );
};

export default NavigationDrawer;
