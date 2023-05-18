import Head from "next/head";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User, UserLeaderboard } from "@/src/types/types";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { useAuthContext } from "@/context/AuthContext";
import Skeleton from "@/src/components/Loaders/Skeleton";
import Modal from "@/src/components/Modals/Modal";
import SendEmailForm from "@/src/components/Forms/SendEmailForm";
import Divider from "@/src/components/Dividers/Divider";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getLeaderboard } from "@/src/utils/api/user/getLeaderboard";
import { getUserRanking } from "@/src/utils/getUserRanking";

type Props = {
  leaderboard: UserLeaderboard[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const leaderboard = await getLeaderboard();
  return {
    props: { leaderboard },
  };
};

const Profile = ({
  leaderboard,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isLogged } = useAuthContext();
  const [resetPassword, setResetPassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const { data, isLoading, isError }: UseQueryResult<User> = useQuery(
    ["user"],
    getUserById,
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
      enabled: isLogged,
    }
  );

  const ranking = leaderboard.sort((a, b) => b.points - a.points);

  const userRank = isLogged
    ? getUserRanking(ranking, data?.id)
    : ranking.length;
  const userTopPercentile = Math.trunc((userRank / ranking.length) * 100);

  const handlePasswordClick = () => {
    return resetPassword ? setResetPassword(false) : setResetPassword(true);
  };

  const handleDeleteAccountClick = () => {
    return deleteAccount ? setDeleteAccount(false) : setDeleteAccount(true);
  };

  return (
    <>
      <Head>
        <title>Profil - LFL-Pickem</title>
        <meta property="og:title" content="Profil - LFL-Pickem" />
      </Head>

      {isLogged ? (
        <section className="py-10 lg:py-20">
          <div className="w-full px-5 m-auto sm:max-w-3xl lg:max-w-4xl lg:px-0 ">
            <div className="w-full flex justify-between text-neutral-light md:px-4">
              {isLoading ? (
                <>
                  <Skeleton
                    className="w-32 h-8"
                    rounded
                    aria-label="Chargement du pseudo"
                  />
                  <Skeleton
                    className="w-16 h-8"
                    rounded
                    aria-label="Chargement des points"
                  />
                </>
              ) : isError ? (
                <>
                  <h1 className="max-w-sm text-lg font-bold lg:max-w-md lg:text-xl">
                    User
                  </h1>
                  <p className="text-sm py-1 px-2 text-lfl font-bold uppercase border-2 border-lfl rounded-lg">
                    N/A pts
                  </p>
                </>
              ) : (
                <>
                  <h1 className="max-w-sm text-lg font-bold lg:max-w-md lg:text-xl">
                    {data.userName}
                  </h1>
                  <p className="text-sm py-1 px-2 text-lfl font-bold uppercase border-2 border-lfl rounded-lg">
                    {data.points} pts
                  </p>
                </>
              )}
            </div>

            <Divider className="my-8 sm:my-12" size="thin" />

            <ul className="icons flex flex-col gap-6 md:px-4">
              <li>
                <span>Classement actuel: {userRank}</span>
              </li>
              <li>
                <span>Top: {userTopPercentile}%</span>
              </li>
            </ul>

            <Divider className="my-8 sm:my-12" size="thin" />

            <ul className="w-full py-4 flex flex-col gap-6 md:gap-3">
              <li>
                <button
                  type="button"
                  className="w-fit flex items-center gap-3 rounded-3xl text-neutral-light hover:shadow-md hover:bg-neutral-600/30 md:py-2 md:pl-4 md:pr-6"
                  onClick={handlePasswordClick}
                >
                  <PencilSquareIcon aria-hidden="true" className="w-6 h-6" />
                  Modifier le mot de passe
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-fit flex items-center gap-3 rounded-3xl text-neutral-light hover:shadow-md hover:bg-neutral-600/30 md:py-2 md:pl-4 md:pr-6"
                  onClick={handleDeleteAccountClick}
                >
                  <TrashIcon aria-hidden="true" className="w-6 h-6" />
                  Supprimer le compte
                </button>
              </li>
            </ul>
          </div>
          <Modal
            authModal={deleteAccount}
            setAuthModal={setDeleteAccount}
            title={"Suppression du compte"}
            description={
              "Cette action est irréversible, êtes-vous sûr(e) de vouloir supprimer votre addresse email ? \n   Inscrivez votre adresse email afin de confirmer la suppression définitive de votre compte."
            }
          >
            <SendEmailForm
              url={"user/reset-password"}
              buttonName={"Réinitialiser le mot de passe"}
            />
          </Modal>
          <Modal
            authModal={resetPassword}
            setAuthModal={setResetPassword}
            title={"Modification de l'email"}
            description={
              "Entrez votre adresse email afin de recevoir un lien pour la modification du mot de passe"
            }
          >
            <SendEmailForm
              url={"user/reset-password"}
              buttonName={"Réinitialiser le mot de passe"}
            />
          </Modal>
        </section>
      ) : null}
    </>
  );
};

export default Profile;
