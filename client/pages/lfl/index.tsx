import Head from "next/head";
import League from "@/src/components/Pages/League";
import { getDaysByLeague } from "@/src/utils/api/game/getDaysByLeague";
import { getClosestDayFromNow } from "@/src/utils/getClosestDayFromNow";
import { getGamesByDayId } from "@/src/utils/api/game/getGamesByDayId";
import { useQuery } from "@tanstack/react-query";

const Lfl = () => {
  const days = useQuery(["days"], () => getDaysByLeague(1), {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  const day = useQuery(["user"], () => getClosestDayFromNow(days.data!), {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: days.data ? true : false,
  });
  const games = useQuery(
    ["user", day.data?.id],
    () => getGamesByDayId(day.data?.id!),
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
      enabled: day.data ? true : false,
    }
  );
  return (
    <>
      <Head>
        <title>LFL - LFL-Pickem</title>
        <meta
          name="description"
          content={`Prédisez les vainqueurs des journées de LFL`}
          key="description"
        />
        <meta property="og:title" content="LFL - LFL-Pickem" key="og-title" />
        <meta
          property="og:description"
          content={`Prédisez les vainqueurs des journées de LFL`}
          key="og-description"
        />
      </Head>

      {days.isLoading ||
      day.isLoading ||
      games.isLoading ||
      days.isError ||
      day.isError ||
      games.isError ? null : (
        <League days={days.data} day={day.data} games={games.data} />
      )}
    </>
  );
};

export default Lfl;
