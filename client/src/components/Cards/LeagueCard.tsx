import { League } from "@/src/types/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  league: League;
};

const LeagueCard = ({ league }: Props) => {
  const url = league.name.toLowerCase();
  return (
    <Link
      href={`/${url}`}
      className={`w-full h-full p-4 flex flex-col items-center justify-center gap-3 rounded-xl bg-neutral-700 shadow-elevation
       ${
         league.name !== "LFL"
           ? "hover:shadow-elevation-divtwo"
           : "hover:shadow-elevation-lfl"
       }`}
    >
      <div className="relative w-20 h-20">
        <Image src={league.imageUrl} fill alt="" />
      </div>
      <span className="font-semibold">{league.name}</span>
    </Link>
  );
};

export default LeagueCard;
