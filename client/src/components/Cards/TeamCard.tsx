import { useState, useEffect } from "react";
import { TeamCard } from "@/src/types/teams";
import Image from "next/image";

const FirstTeam = ({
  team,
  notSelected,
  disabledDay,
  noBet,
  winningBet,
  reversed,
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
      className={`relative w-full px-2 mt-2 flex items-center justify-center
     `}
    >
      <Image
        loader={() => team.logo}
        unoptimized
        src={team.logo}
        alt=""
        width={50}
        height={50}
        className={`hidden sm:block absolute top-1/2 -translate-y-1/2 ${
          reversed ? "sm:right-2 md:right-5" : "sm:left-2 md:left-5"
        } object-contain opacity-50`}
      />
      <button
        type="button"
        className={`result relative w-full max-w-[150px] h-10 rounded-lg z-[2] text-neutral-950 text-sm font-bold  shadow-lg
        ${
          winningBet
            ? "bg-emerald-500 after:content-['+3pts'] after:text-emerald-400"
            : winningBet === false
            ? "bg-red-400 after:content-['+0pts'] after:text-red-400"
            : ""
        }
        ${selected ? "bg-lfl" : "bg-neutral-400 hover:bg-neutral-300"}
        ${disabledDay ? "cursor-not-allowed " : ""}
        ${disabledDay && !selected ? "hover:bg-neutral-400" : ""}
       
         `}
      >
        {team.name}
      </button>
    </article>
  );
};

export default FirstTeam;
