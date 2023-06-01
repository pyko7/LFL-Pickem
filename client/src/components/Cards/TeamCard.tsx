import { ButtonHTMLAttributes } from "react";
import { Team } from "@/src/types/types";
import Image from "next/image";
import { useThemeContext } from "@/context/ThemeContext";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  bet: number;
  team: Team;
  winner: number;
  disabledDay: boolean;
};

const TeamCard = ({ bet, team, winner, disabledDay, ...rest }: Props) => {
  const { leagueId } = useThemeContext();
  const selected = bet === team.id;
  const lfl = leagueId === 1;
  const divtwo = leagueId === 2;
  const winningBet = disabledDay && selected && winner === team.id;
  const losingBet = disabledDay && selected && winner !== team.id;
  const pendingBet = disabledDay && selected && winner === 0;
  return (
    <button
      disabled={disabledDay}
      aria-label="select winning team"
      className={`relative w-full py-2 px-4 flex items-center justify-between rounded-xl bg-neutral-800
       border-1 shadow-md outline-1 outline-blue-400 disabled:cursor-default
        ${
          selected
            ? "bg-neutral-900 disabled:hover:bg-neutral-900"
            : "disabled:hover:bg-neutral-800"
        }
        ${
          (!disabledDay && selected && lfl) || (selected && lfl && pendingBet)
            ? "border-lfl"
            : (!disabledDay && selected && divtwo) ||
              (selected && divtwo && pendingBet)
            ? "border-divtwo"
            : winningBet
            ? "border-emerald-400"
            : losingBet
            ? "border-red-400"
            : "border-transparent"
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
    </button>
  );
};

export default TeamCard;
