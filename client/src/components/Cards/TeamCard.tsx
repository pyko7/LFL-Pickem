import { useState } from "react";
import { Team } from "@/src/types/teams";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  team: Team;
  winningBet: null | boolean;
};

const TeamCard = ({ team, winningBet }: Props) => {
  const { pathname } = useRouter();
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      aria-label="select winning team"
      className={`w-full py-2 px-4 flex items-center justify-between rounded-xl bg-neutral-800
       border-1 border-transparent shadow-md outline-1 outline-blue-400
       ${selected ? "bg-neutral-900" : ""}
      ${
        selected && pathname === "lfl"
          ? "border-lfl"
          : selected && pathname === "div2"
          ? "border-divtwo"
          : ""
      }
      ${
        winningBet === true
          ? "border-emerald-400"
          : winningBet === false
          ? "border-red-400"
          : ""
      }
      hover:bg-neutral-900`}
    >
      <div className="w-full flex items-center gap-2">
        <div className="relative w-10 h-10">
          <Image
            loader={() => team.logo}
            unoptimized
            src={team.logo}
            alt=""
            fill
            className={`object-contain`}
          />
        </div>
        <div className="font-semibold">{team.name}</div>
      </div>
    </button>
  );
};

export default TeamCard;
