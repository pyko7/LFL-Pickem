import { HTMLAttributes } from "react";
import { Team } from "@/src/types/types";
import Image from "next/image";
import { useThemeContext } from "@/context/ThemeContext";

type Props = HTMLAttributes<HTMLElement> & {
  bet: number;
  team: Team;
  winner: number;
  disabledDay: boolean;
};

const TeamCard = ({ bet, team, winner, disabledDay, ...rest }: Props) => {
  const { leagueId } = useThemeContext();
  const selected = bet === team.id;

  return (
    <article
      aria-label="select winning team"
      className={`relative w-full py-2 px-4 flex items-center justify-between rounded-xl bg-neutral-800
       border-1 shadow-md  outline-1 outline-blue-400
      ${disabledDay ? "cursor-default" : ""}
      ${disabledDay && selected ? "hover:bg-neutral-900" : "hover:bg-neutral-800"}
       ${selected ? "bg-neutral-900" : ""}
      ${
        selected && leagueId === 1
          ? "border-lfl"
          : selected && leagueId === 2
          ? "border-divtwo"
          : "border-transparent"
      }
      ${
        winner === team.id
          ? "border-emerald-400"
          : winner !== 0
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
