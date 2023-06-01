import { useAuthContext } from "@/context/AuthContext";
import Leaderboard from "@/src/components/List/Leaderboard";
import { UserLeaderboard } from "@/src/types/types";
import { getLeaderboard } from "@/src/utils/api/user/getLeaderboard";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { getUserRanking } from "@/src/utils/getUserRanking";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

type Props = {
  leaderboard: UserLeaderboard[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const leaderboard = await getLeaderboard();
  return {
    props: { leaderboard },
  };
};

const RankPage = ({
  leaderboard,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isLogged } = useAuthContext();
  const { data, isLoading, isError } = useQuery(["user"], getUserById, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });
  const ranking = leaderboard.sort((a, b) => b.points - a.points);

  const userRank = isLogged
    ? getUserRanking(ranking, data?.id)
    : ranking.length;

  return (
    <>
      <Head>
        <title>Classement - LFL-Pickem</title>
        <meta
          name="description"
          content="Consulter le classement des joueurs de LFL Pickem afin de voir votre position par rapports aux autres joueurs."
          key="description"
        />
        <meta
          property="og:title"
          content="Classement - LFL-Pickem"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Consulter le classement des joueurs de LFL Pickem afin de voir votre position par rapports aux autres joueurs."
          key="og-description"
        />
      </Head>
      <section className="relative w-full max-w-2xl mx-auto p-0 flex flex-col items-center justify-between">
        <div className="relative w-full px-3 md:px-5 lg:mt-20 ">
          <h1 className="mb-10 text-lg font-bold lg:max-w-md lg:text-xl">
            Classement
          </h1>
          <Leaderboard currentUser={data} leaderboard={ranking} />

          {isLoading || isError ? null : (
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-16 px-3 z-10 md:px-5 lg:hidden">
              <div className="w-full h-full px-4 flex items-center justify-between font-semibold uppercase text-lfl bg-neutral-950 rounded-xl md:px-5">
                {/* add rank */}
                <span>{userRank}</span>
                <span>{data?.userName}</span>
                <div className="flex flex-col items-center justify-center text-sm z-10">
                  <span>{data?.points}</span>
                  <span>pts</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RankPage;
