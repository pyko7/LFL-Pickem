import { HTMLAttributes } from "react";
import { Team } from "@/src/types/teams";
import Image from "next/image";
import { useThemeContext } from "@/context/ThemeContext";

type Props = HTMLAttributes<HTMLElement> & {
  selected: boolean;
  team: Team;
  winningBet: null | boolean;
};

const TeamCard = ({ selected, team, winningBet, ...rest }: Props) => {
  const { leagueId } = useThemeContext();

  return (
    <article
      aria-label="select winning team"
      className={`w-full py-2 px-4 flex items-center justify-between rounded-xl bg-neutral-800
       border-1 border-transparent shadow-md cursor-pointer outline-1 outline-blue-400
       ${selected ? "bg-neutral-900" : ""}
      ${
        selected && leagueId === 1
          ? "border-lfl"
          : selected && leagueId === 2
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
      {...rest}
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
    </article>
  );
};

export default TeamCard;
