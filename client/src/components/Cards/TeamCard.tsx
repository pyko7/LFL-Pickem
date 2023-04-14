import { useState, useEffect } from "react";
import { TeamCard } from "@/src/types/teams";
import Image from "next/image";

const FirstTeam = ({
  team,
  notSelected,
  disabledDay,
  noBet,
  winningBet,
}: TeamCard) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (notSelected === team.id || notSelected === 0) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  }, [notSelected, team.id]);

  return (
    <article
      aria-label={team.name}
      className={`w-full px-1 -mt-2 flex flex-col items-center sm:mt-0`}
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <Image
          loader={() => team.logo}
          unoptimized
          src={team.logo}
          alt=""
          fill
          className="opacity-20 object-contain"
        />
      </div>
      <button
        type="button"
        className={`w-full max-w-[150px] h-10 -mt-2 rounded-lg z-[2] text-neutral-950 text-sm font-bold 
        ${selected ? "bg-lfl" : "bg-neutral-400 hover:bg-neutral-300"}
        ${disabledDay ? "cursor-default" : ""}
        ${disabledDay && !selected ? "hover:bg-neutral-400" : ""}
        ${
          winningBet
            ? "bg-emerald-400"
            : winningBet === false
            ? "bg-red-400"
            : ""
        }
         `}
      >
        {team.name}
      </button>
    </article>
  );
};

export default FirstTeam;
