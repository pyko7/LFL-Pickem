import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/src/utils/api/user/getUserById";
import IconButton from "../Buttons/IconButton";

type Props = {
  setAuthModal: (authModal: boolean) => void;
};

const Navbar = ({ setAuthModal }: Props) => {
  const { pathname } = useRouter();
  const { isLogged } = useAuthContext();
  const handleClick = () => {
    return setAuthModal(true);
  };
  const user = useQuery(["user"], getUserById, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });

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
      className="hidden lg:w-full lg:h-full lg:px-10 lg:flex"
    >
      <ul className="w-full flex h-full items-center gap-4 font-bold">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link
              href={item.pathname}
              className={`px-4 py-2 rounded-3xl
              ${
                item.pathname !== pathname.slice(0) ? "" : "bg-neutral-600/30"
              }   hover:bg-neutral-600/30`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {isLogged ? (
        <div className="w-fit h-full flex items-center gap-2">
          <div className="w-fit h-full flex flex-col justify-center items-center font-bold text-sm">
            {user.isLoading ? <p>loading...</p> : null}
            {user.isError ? <p>error...</p> : null}
            <p>{user.data?.userName}</p>
            <p className="text-lfl">{user.data?.points} pts</p>
          </div>
          <Link href="/profile" aria-label="Profil">
            <UserIcon className="w-8 h-8" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="w-fit h-full flex items-center gap-2">
          <IconButton
            aria-label="Authentication button"
            className="w-8 h-8"
            onClick={handleClick}
          >
            <UserIcon aria-hidden="true" />
          </IconButton>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
