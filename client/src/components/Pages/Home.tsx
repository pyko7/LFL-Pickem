import GameContainer from "@/src/components/Containers/GameContainer";
import { useGameContext } from "@/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuthContext } from "@/context/AuthContext";
import { useGetClosestDayFromNow } from "@/src/hooks/useGetClosestDayFromNow";
import { useEffect } from "react";
import LeagueCard from "../Cards/LeagueCard";
import { League } from "@/src/types/types";
import Divider from "../Dividers/Divider";
import Image from "next/image";

const Homepage = () => {
  const { isLogged } = useAuthContext();
  const { allDays } = useGameContext();
  const { closestDay } = useGetClosestDayFromNow(allDays);

  const lfl: League = {
    name: "LFL",
    imageUrl:
      "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp",
  };
  const divTwo: League = {
    name: "Div2",
    imageUrl:
      "https://res.cloudinary.com/dkferpmf6/image/upload/v1681475197/div2-logo_su2wug.svg",
  };

  const { dayData, setDayData, gamesWithBet, gamesByDayId } = useGameContext();

  useEffect(() => {
    if (!closestDay) {
      return;
    }
    setDayData(closestDay);
  }, [closestDay, setDayData]);

  return (
    <section className="w-full p-4 flex flex-col gap-10 md:px-8 md:gap-16 xl:gap-20">
      <div className="w-full flex flex-col gap-5 md:gap-14 lg:max-w-7xl lg:mx-auto xl:mt-5">
        <h2 className="text-center text-lg uppercase lg:text-start">Explorer les leagues:</h2>
        <div className="flex flex-nowrap justify-center items-center gap-2 sm:gap-5 md:gap-10 lg:justify-start">
          <div className="w-full max-w-[200px] h-40">
            <LeagueCard league={lfl} />
          </div>
          <div className="w-full max-w-[200px] h-40">
            <LeagueCard league={divTwo} />
          </div>
        </div>
      </div>
      <Divider className="" size="thin" rounded />
      <div className="w-full flex flex-col gap-5 md:max-w-4xl md:mx-auto lg:max-w-7xl">
        <h2 className="text-lg uppercase">Prochaine journée:</h2>
        <div className="w-full flex gap-2 text-neutral-light">
          <div className="relative w-6 h-6">
            <Image src={lfl.imageUrl} alt={`${lfl.name}`} fill />
          </div>
          <h3 className="max-w-sm font-bold lg:max-w-md lg:text-xl">
            {dayData === null
              ? "Prochaine journée"
              : format(parseISO(dayData?.date!), "PPPP", {
                  locale: fr,
                })}
          </h3>
        </div>

        {isLogged ? (
          <div className="w-full flex flex-wrap justify-center gap-5 md:justify-start">
            {gamesWithBet.data?.day?.map((day) => (
              <GameContainer {...day} key={day.id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-wrap justify-center gap-5 md:justify-start">
            {gamesByDayId.data?.map((day) => (
              <GameContainer {...day} key={day.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Homepage;
