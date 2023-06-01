import Head from "next/head";
import League from "@/src/components/Pages/League";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { DayProps, Game } from "@/src/types/types";
import { getDaysByLeague } from "@/src/utils/api/game/getDaysByLeague";
import { getClosestDayFromNow } from "@/src/utils/getClosestDayFromNow";
import { getGamesByDayId } from "@/src/utils/api/game/getGamesByDayId";

type Props = {
  days: DayProps[];
  day: DayProps;
  games: Game[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const days = await getDaysByLeague(2);
  const day = getClosestDayFromNow(days);
  const games = await getGamesByDayId(day.id);
  return {
    props: { days, day, games },
  };
};

const Div2 = ({
  days,
  day,
  games,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Div2 - LFL-Pickem</title>
        <meta
          name="description"
          content={`Prédisez les vainqueurs de la journée ${day.id - 18} de Div2`}
          key="description"
        />
        <meta property="og:title" content="Div2 - LFL-Pickem" key="og-title" />
        <meta
          property="og:description"
          content={`Prédisez les vainqueurs de la journée ${day.id - 18} de Div2`}
          key="og-description"
        />
      </Head>

      <League days={days} day={day} games={games} />
    </>
  );
};

export default Div2;
