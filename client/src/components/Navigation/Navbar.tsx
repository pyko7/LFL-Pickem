import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const { isLogged } = useAuthContext();
  const handleClick = () => {
    return setIsOpen(true);
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
  ];

  return (
    <nav
      role="navigation"
      className="hidden md:w-full md:h-full md:px-10 md:flex"
    >
      <ul className="w-full flex h-full items-center gap-4 font-bold">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link
              href={item.pathname}
              className="px-4 py-2 rounded-3xl hover:bg-neutral-600/30"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {isLogged ? (
        <div className="w-fit h-full flex items-center gap-2">
          <div className="w-fit h-full flex flex-col justify-center items-center font-bold text-sm">
            <p>Pseudo</p>
            <p className="text-lfl">5pts</p>
          </div>
          <Link href="/profile" aria-label="Profil">
            <UserIcon className="w-8 h-8" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="w-fit h-full flex items-center gap-2">
          <button
            type="button"
            aria-label="Se connecter ou s'inscrire"
            onClick={handleClick}
          >
            <UserIcon className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
