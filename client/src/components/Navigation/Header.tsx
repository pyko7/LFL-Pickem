import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import NavigationDrawer from "./NavigationDrawer";
import AuthModal from "../Modals/AuthModal";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "../Buttons/IconButton";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const logo =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";

  const handleClick = () => {
    return open ? setOpen(false) : setOpen(true);
  };

  return (
    <>
      <header className="w-full h-24 px-4 flex justify-between items-center sm:px-6 md:gap-8 lg:px-8 xl:px-9">
        <Link href="/" className="relative w-12 h-12">
          <Image src={logo} alt="logo" fill priority />
        </Link>
        <Navbar setAuthModal={setAuthModal} />

        <IconButton
          aria-label="toggle menu"
          className={`w-8 h-8 ${open ? "z-[100]" : ""} lg:hidden`}
          onClick={handleClick}
        >
          {!open ? (
            <Bars3Icon aria-hidden="true" className="w-full h-full" />
          ) : (
            <XMarkIcon aria-hidden="true" className="w-full h-full" />
          )}
        </IconButton>

        <div className="absolute top-0 -right-0 lg:hidden">
          <NavigationDrawer
            open={open}
            setAuthModal={setAuthModal}
            handleNavDrawerClick={handleClick}
          />
        </div>
      </header>
      {authModal ? (
        <AuthModal
          authModal={authModal}
          setAuthModal={setAuthModal}
          handleClick={handleClick}
        />
      ) : null}
    </>
  );
};

export default Header;
