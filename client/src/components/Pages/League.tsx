import ScrollableDaysTabs from "@/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "@/src/components/Containers/GameContainer";
import { useGameContext } from "@/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import GameContainerSkeleton from "../Loaders/GameContainerSkeleton";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const League = () => {
  const { pathname } = useRouter();
  const { isLogged } = useAuthContext();
  const {
    DaysByLeague,
    dayData,
    setDayData,
    teamsList,
    gamesWithBet,
    gamesByDayId,
    setLeagueId,
  } = useGameContext();

  const tabsProps = { schedule: DaysByLeague, dayData, setDayData };

  useEffect(() => {
    if (pathname === "/lfl") {
      setLeagueId(1);
    } else if (pathname === "/div2") {
      setLeagueId(2);
    }
    return;
  }, [pathname, setLeagueId]);

  return (
    <section>
      <ScrollableDaysTabs {...tabsProps} />
      <div className="w-full px-3 m-auto sm:max-w-3xl lg:max-w-3xl lg:px-0 ">
        <div className="w-full mt-20 mb-10 flex justify-between text-neutral-light">
          <h1 className="max-w-sm text-lg font-bold lg:max-w-md lg:text-xl">
            {dayData === null
              ? "Journée"
              : format(parseISO(dayData?.date!), "PPPP", {
                  locale: fr,
                })}
          </h1>
        </div>

        {isLogged ? (
          <div className="w-full flex flex-col justify-between gap-5">
            {teamsList.isError ? (
              <p style={{ margin: "0 auto" }}>
                Une erreur est survenue. Les matchs sont momentanément
                indisponibles. Veuillez nous excuser pour la gêne occasionnée.
              </p>
            ) : (
              <>
                {gamesWithBet.data?.day?.map((day) => {
                  return dayData?.id !== day.dayId ? (
                    <GameContainerSkeleton key={day.id} />
                  ) : (
                    <GameContainer {...day} key={day.id} />
                  );
                })}
              </>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-between gap-5">
            {teamsList.isError ? (
              <p style={{ margin: "0 auto" }}>
                Une erreur est survenue. Les matchs sont momentanément
                indisponibles. Veuillez nous excuser pour la gêne occasionnée.
              </p>
            ) : (
              <>
                {gamesByDayId.data?.map((day, index) => {
                  return dayData?.id !== day.dayId ? (
                    <GameContainerSkeleton key={day.id} />
                  ) : (
                    <GameContainer {...day} index={index} key={day.id} />
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default League;
