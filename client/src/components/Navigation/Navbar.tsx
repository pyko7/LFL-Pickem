import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "@/context/AuthContext";
import IconButton from "../Buttons/IconButton";
import { navLinks } from "@/src/utils/navLinks";
import DropdownMenu from "../Menus/DropdownMenu";
import { useThemeContext } from "@/context/ThemeContext";
import Skeleton from "../Loaders/Skeleton";
import { User } from "@/src/types/types";

type Props = {
  data: User | undefined;
  isLoading: boolean;
  isError: boolean;
  logoutUser: () => void;
};

const Navbar = ({ data, isLoading, isError, logoutUser }: Props) => {
  const { isLogged, score, setModal } = useAuthContext();
  const { leagueId } = useThemeContext();

  const handleClick = () => {
    setModal(true);
  };

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
              className="px-4 py-2 rounded-3xl hover:bg-neutral-600/30"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {isLogged ? (
        <div className="w-fit h-full flex items-center gap-2">
          <Link
            href="/profile"
            className="h-full flex flex-col justify-center items-end font-bold text-sm"
          >
            {isLoading ? (
              <>
                <Skeleton
                  className="w-20 h-5 bg-neutral-700"
                  rounded
                  aria-label="Chargement du pseudo"
                />
                <Skeleton
                  className="w-4/5 h-5 mt-2 bg-neutral-700"
                  rounded
                  aria-label="Chargement du score"
                />
              </>
            ) : null}
            {isError ? <span>Récupération des données impossible</span> : null}
            <span className="whitespace-nowrap">{data?.userName}</span>
            <span
              className={`whitespace-nowrap ${
                leagueId === 1 ? "text-lfl" : "text-divtwo"
              }`}
            >
              {score ? score : data?.points} pts
            </span>
          </Link>
          <DropdownMenu handleClick={logoutUser} />
        </div>
      ) : (
        <div className="w-fit h-full flex items-center gap-2">
          <IconButton
            aria-label="Authentication button"
            className="w-8 h-8 focus:p-0"
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
