import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavigationDrawer from "./NavigationDrawer";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    return setOpen(true);
  };

  const imageUrl =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";

  const drawerProps = { open, setOpen };

  return (
    <header className="w-full h-24 px-4 flex justify-between items-center sm:px-6 lg:px-8 xl:px-9">
      <Link href="/">
        <Image src={imageUrl} alt="logo" width={65} height={65} priority />
      </Link>
      <button onClick={handleClick}>
        <Bars3Icon
          className="w-10 h-10  text-neutral-light"
          aria-label="menu"
        />
      </button>

      <div className="absolute top-0 -right-0">
        <NavigationDrawer {...drawerProps} />
      </div>
    </header>
  );
};

export default Header;
