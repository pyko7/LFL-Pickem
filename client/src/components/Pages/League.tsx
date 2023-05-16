import ScrollableDaysTabs from "@/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "@/src/components/Containers/GameContainer";
import { useGameContext } from "@/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import GameContainerSkeleton from "../Loaders/GameContainerSkeleton";
import { useAuthContext } from "@/context/AuthContext";

const League = () => {
  const { isLogged } = useAuthContext();
  const {
    DaysByLeague,
    dayData,
    setDayData,
    teamsList,
    gamesWithBet,
    gamesByDayId,
  } = useGameContext();

  return (
    <section className="relative w-full max-w-7xl mx-auto py-12 flex flex-col items-center justify-between">
      <ScrollableDaysTabs
        schedule={DaysByLeague}
        dayData={dayData}
        setDayData={setDayData}
      />
      <div className="w-full px-3 md:px-5">
        <h1 className="mt-20 mb-10 text-lg font-bold lg:max-w-md lg:text-xl">
          {dayData === null
            ? "Journée"
            : format(parseISO(dayData?.date!), "PPPP", {
                locale: fr,
              })}
        </h1>

        {isLogged ? (
          <div className="w-full flex flex-wrap justify-center gap-5 md:justify-start">
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
                    <GameContainer day={day} key={day.id} />
                  );
                })}
              </>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-wrap justify-center gap-5 md:justify-start">
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
                    <GameContainer day={day} key={day.id} />
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
