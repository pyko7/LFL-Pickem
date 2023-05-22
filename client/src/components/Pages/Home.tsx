import ScrollableDaysTabs from "@/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "@/src/components/Containers/GameContainer";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { User } from "@/src/types/user";
import { useGameContext } from "@/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import GameContainerSkeleton from "../Loaders/GameContainerSkeleton";
import { useAuthContext } from "@/context/AuthContext";
import Skeleton from "../Loaders/Skeleton";
import InformationModal from "../Modals/InformationModal";

const Homepage = () => {
  const { isLogged } = useAuthContext();
  const { dayData, teamsList, gamesWithBet, gamesByDayId } = useGameContext();

  const currentUser: UseQueryResult<User> | null = useQuery(
    ["user"],
    getUserById,
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
      enabled: isLogged,
    }
  );

  return (
    <section>
      <ScrollableDaysTabs />
      <div className="w-full px-3 m-auto sm:max-w-3xl lg:max-w-4xl lg:px-0 ">
        <div className="w-full mt-20 mb-10 flex justify-between text-neutral-light">
          <h1 className="max-w-sm text-lg font-bold lg:max-w-md lg:text-xl">
            {dayData === null
              ? "Journée"
              : format(parseISO(dayData?.date!), "PPPP", {
                  locale: fr,
                })}
          </h1>
          {!isLogged ? (
            <p className="points_counter">0 pts</p>
          ) : currentUser.isLoading ? (
            <Skeleton
              width="60px"
              height="32px"
              rounded
              ariaLabel="Chargement des points"
            />
          ) : currentUser.isError ? (
            <p className="points_counter">N/A pts </p>
          ) : (
            <p className="points_counter">{currentUser.data.points} pts</p>
          )}
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
                {gamesByDayId.data?.map((day) => {
                  return dayData?.id !== day.dayId ? (
                    <GameContainerSkeleton key={day.id} />
                  ) : (
                    <GameContainer {...day} key={day.id} />
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

export default Homepage;
