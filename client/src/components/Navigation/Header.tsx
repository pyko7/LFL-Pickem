import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import NavigationDrawer from "./NavigationDrawer";
import { Bars3Icon } from "@heroicons/react/24/outline";
import AuthModal from "../Modals/AuthModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const imageUrl =
  "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";
  
  const handleClick = () => {
    return setOpen(true);
  };
  
  const handleClose = () => {
    return setOpen(false);
  };
  
  const drawerProps = { open, setOpen, isOpen, setIsOpen, handleClose };
  const authModalProps = {isOpen, setIsOpen, handleClose}

  return (
    <>
      <header className="w-full h-24 px-4 flex justify-between items-center sm:px-6 md:gap-8 lg:px-8 xl:px-9">
        <Link href="/" className="relative w-16 h-16">
          <Image src={imageUrl} alt="logo" fill priority />
        </Link>
        <Navbar setIsOpen={setIsOpen} />
        <button
          type="button"
          aria-label="menu"
          className="md:hidden"
          onClick={handleClick}
        >
          <Bars3Icon aria-hidden="true" className="w-10 h-10" />
        </button>

        <div className="absolute top-0 -right-0 md:hidden">
          <NavigationDrawer {...drawerProps} />
        </div>
      </header>
      {isOpen ? <AuthModal {...authModalProps} /> : null}
    </>
  );
};

export default Header;
