import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import NavigationDrawer from "./NavigationDrawer";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "../Buttons/IconButton";
import { logoutUser as logout } from "@/src/utils/api/auth/logoutUser";
import { useAuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/src/utils/api/user/getUserById";

const Header = () => {
  const { isLogged, setIsLogged } = useAuthContext();
  const [open, setOpen] = useState(false);
  const logo =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";

  const { data, isLoading, isError } = useQuery(["user"], getUserById, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });

  const handleMenu = () => {
    return open ? setOpen(false) : setOpen(true);
  };

  const logoutUser = async () => {
    await logout();
    setIsLogged(false);
    return setOpen(false);
  };

  return (
    <header className="w-full h-24 px-4 flex justify-between items-center sm:px-6 md:gap-8 lg:px-8 xl:px-9">
      <Link href="/" className="relative w-12 h-12">
        <Image src={logo} alt="logo" fill priority />
      </Link>
      <Navbar
        data={data}
        isLoading={isLoading}
        isError={isError}
        logoutUser={logoutUser}
      />

      <IconButton
        aria-label="toggle menu"
        className={`w-8 h-8 ${open ? "z-[100]" : ""} focus:p-0 lg:hidden`}
        onClick={handleMenu}
      >
        {!open ? (
          <Bars3Icon aria-hidden="true" className="w-full h-full" />
        ) : (
          <XMarkIcon aria-hidden="true" className="w-full h-full" />
        )}
      </IconButton>

      <div className="absolute top-0 -right-0 lg:hidden">
        <NavigationDrawer
          data={data}
          isLoading={isLoading}
          isError={isError}
          open={open}
          handleClose={handleMenu}
          logoutUser={logoutUser}
        />
      </div>
    </header>
  );
};

export default Header;
