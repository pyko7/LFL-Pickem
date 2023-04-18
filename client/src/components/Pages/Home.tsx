import GameContainer from "@/src/components/Containers/GameContainer";
import { useGameContext } from "@/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuthContext } from "@/context/AuthContext";
import { useGetClosestDayFromNow } from "@/src/hooks/useGetClosestDayFromNow";
import { useEffect } from "react";

const Homepage = () => {
  const { isLogged } = useAuthContext();
  const { allDays } = useGameContext();
  const { closestDay } = useGetClosestDayFromNow(allDays);

  const { dayData, setDayData, gamesWithBet, gamesByDayId } = useGameContext();

  useEffect(() => {
    if (!closestDay) {
      return;
    }
    setDayData(closestDay);
  }, [closestDay, setDayData]);

  return (
    <section>
      <div className="w-full px-3 m-auto sm:max-w-3xl lg:max-w-3xl lg:px-0 ">
        <div className="w-full mb-10 flex justify-between text-neutral-light">
          <h1 className="max-w-sm text-lg font-bold lg:max-w-md lg:text-xl">
            {dayData === null
              ? "Prochaine journée"
              : format(parseISO(dayData?.date!), "PPPP", {
                  locale: fr,
                })}
          </h1>
        </div>

        {isLogged ? (
          <div className="w-full flex flex-col justify-between gap-5">
            {gamesWithBet.data?.day?.map((day) => (
              <GameContainer {...day} key={day.id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-between gap-5">
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
