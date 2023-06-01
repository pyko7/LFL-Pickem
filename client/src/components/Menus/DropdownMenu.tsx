import { Menu } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  handleClick: () => void;
};

const DropdownMenu = ({ handleClick }: Props) => {
  return (
    <div className="relative z-10">
      <Menu as="div">
        <Menu.Button>
          <UserIcon className="w-8 h-8" aria-label="Toggle menu" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-56 py-2 rounded-md text-sm bg-neutral-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <Link
              href="/profile"
              className="block p-2 pl-4 font-semibold bg-neutral-700  focus:outline-none hover:bg-neutral-600"
            >
              Profil
            </Link>
          </Menu.Item>
          <Menu.Item>
            <div className="p-2 pl-4 font-semibold bg-neutral-700  focus:outline-none hover:bg-neutral-600">
              <button
                type="button"
                className="w-full flex items-center gap-1"
                onClick={handleClick}
              >
                Se déconnecter
              </button>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
