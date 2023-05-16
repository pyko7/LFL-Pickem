import Head from "next/head";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User, UserRank } from "@/src/types/user";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { getUserRank } from "@/src/utils/api/user/getUserRank";
import { useAuthContext } from "@/context/AuthContext";
import Skeleton from "@/src/components/Loaders/Skeleton";
import Modal from "@/src/components/Modals/Modal";
import SendEmailForm from "@/src/components/Forms/SendEmailForm";
import Divider from "@/src/components/Dividers/Divider";

const Profile = () => {
  const { isLogged } = useAuthContext();

  const [resetPassword, setResetPassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const currentUser: UseQueryResult<User> = useQuery(["user"], getUserById, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });

  const userRank: UseQueryResult<UserRank> = useQuery(["rank"], getUserRank, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });

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
            <div className="w-full flex justify-between text-neutral-light">
              {currentUser.isLoading ? (
                <>
                  <Skeleton
                    width="120px"
                    height="30px"
                    rounded
                    ariaLabel="Chargement du pseudo"
                  />
                  <Skeleton
                    width="70px"
                    height="30px"
                    rounded
                    ariaLabel="Chargement des points"
                  />
                </>
              ) : currentUser.isError ? (
                <>
                  <h1 className="max-w-sm text-lg font-bold lg:max-w-md lg:text-xl">
                    User
                  </h1>
                  <p className="points_counter">N/A pts </p>
                </>
              ) : (
                <>
                  <h1 className="max-w-sm text-lg font-bold lg:max-w-md lg:text-xl">
                    {currentUser.data.userName}
                  </h1>
                  <p className="points_counter">
                    {currentUser.data.points} pts
                  </p>
                </>
              )}
            </div>

            <Divider className="my-8 sm:my-12" size="thin" />

            <ul className="icons flex flex-col gap-6">
              <li>
                {userRank.isLoading ? (
                  <Skeleton
                    width="200px"
                    height="30px"
                    rounded
                    ariaLabel="Chargement du rang"
                  />
                ) : userRank.isError ? (
                  "Classement actuel: N/A"
                ) : (
                  `Classement actuel: ${userRank.data.userRank}`
                )}
              </li>
              <li>
                {userRank.isLoading ? (
                  <Skeleton
                    width="100px"
                    height="30px"
                    rounded
                    ariaLabel="Chargement du rang"
                  />
                ) : userRank.isError ? (
                  "Top: N/A"
                ) : (
                  `Top: ${userRank.data.top}%`
                )}
              </li>
            </ul>

            <Divider className="my-8 sm:my-12" size="thin" />

            <ul className="w-full  py-4 flex flex-col gap-6 md:gap-3">
              <li>
                <button
                  type="button"
                  className="w-fit flex items-center gap-3 rounded-sm text-neutral-light hover:shadow-md hover:bg-main-light md:py-2 md:pl-1 md:pr-6"
                  onClick={handlePasswordClick}
                >
                  <PencilSquareIcon aria-hidden="true" className="w-6 h-6" />
                  Modifier le mot de passe
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-fit flex items-center gap-3 rounded-sm text-neutral-light hover:shadow-md hover:bg-main-light md:py-2 md:pl-1 md:pr-6"
                  onClick={handleDeleteAccountClick}
                >
                  <TrashIcon aria-hidden="true" className="w-6 h-6 -ml-[2px]" />
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
