import { useCountdown } from "@/src/hooks/useCountdown";
import Head from "next/head";
import { getAllDays } from "@/src/utils/api/game/getAllDays";
import { getClosestDayFromNow } from "@/src/utils/getClosestDayFromNow";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getGamesByDayId } from "@/src/utils/api/game/getGamesByDayId";
import { DayProps, Game, League } from "@/src/types/types";
import LeagueCard from "@/src/components/Cards/LeagueCard";
import Divider from "@/src/components/Dividers/Divider";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import GameContainer from "@/src/components/Containers/GameContainer";
import { capitalizeFirstLetter } from "@/src/utils/capitalizeFirstLetter";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { useAuthContext } from "@/context/AuthContext";
import Skeleton from "@/src/components/Loaders/Skeleton";
import { useThemeContext } from "@/context/ThemeContext";
import { useEffect } from "react";

type Props = {
  day: DayProps;
  games: Game[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const allDays = await getAllDays();
  const day = getClosestDayFromNow(allDays);
  const games = await getGamesByDayId(day.id);

  return {
    props: { day, games },
  };
};

const Home = ({
  day,
  games,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLeagueId } = useThemeContext();
  const { isLogged } = useAuthContext();
  const emptyCards = Array(5).fill(0);

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
  const date = capitalizeFirstLetter(
    format(parseISO(day.date.toString()), "PPPP", {
      locale: fr,
    })
  );

  const { data, isLoading, isError, refetch } = useQuery(
    ["user"],
    getUserById,
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
      enabled: isLogged,
    }
  );

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    setLeagueId(day.leagueId);
  }, [day.leagueId, setLeagueId]);

  return (
    <>
      <Head>
        <title>Accueil - LFL-Pickem</title>
        <meta property="og:title" content="Accueil - LFL-Pickem" />
      </Head>
      <section className="w-full p-4 flex flex-col gap-10 md:px-8 md:gap-16 xl:gap-20">
        <div className="w-full flex flex-col gap-5 md:gap-14 lg:max-w-7xl lg:mx-auto xl:mt-5">
          <h2 className="text-center text-lg uppercase lg:text-start">
            Explorer les leagues:
          </h2>
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
              <Image
                src={day.leagueId === 1 ? lfl.imageUrl : divTwo.imageUrl}
                alt={`${lfl.name}`}
                fill
              />
            </div>
            <h3 className="max-w-sm font-bold lg:max-w-md lg:text-xl">
              {date}
            </h3>
          </div>

          <div className="w-full flex flex-wrap justify-center gap-5 md:justify-start">
            {isError ? (
              <p className="block text-xl my-20 mx-auto">
                Une erreur est survenue lors du chargement des matchs
              </p>
            ) : null}
            {isLogged && isLoading ? (
              emptyCards.map((c, i) => {
                return (
                  <Skeleton
                    className="w-full max-w-sm h-56"
                    rounded
                    key={i}
                    aria-label="Chargement des matchs"
                  />
                );
              })
            ) : (
              <>
                {games.map((day) => (
                  <GameContainer
                    day={day}
                    bets={data?.bets}
                    handleRefetch={handleRefetch}
                    key={day.id}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
