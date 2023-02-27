import Head from "next/head";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import SendEmailForm from "@/src/components/Forms/SendEmailForm";
import ConfirmDelete from "@/src/components/Forms/ConfirmDelete";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User, UserRank } from "@/src/types/user";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { getUserRank } from "@/src/utils/api/user/getUserRank";
import { useAuthContext } from "@/context/AuthContext";

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

  const resetPasswordProps = {
    open: resetPassword,
    setOpen: setResetPassword,
    url: "user/reset-password",
    title: "Réinitialisation du mot de passe",
    buttonName: "réinitialiser le mot de passe",
  };

  const deleteAccountProps = { deleteAccount, setDeleteAccount };

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
        <section>
          <div className="w-full px-5 m-auto sm:max-w-3xl lg:max-w-4xl lg:px-0 ">
            <div className="w-full flex justify-between text-neutral-light">
              {currentUser.isLoading ? (
                <>
                  <Skeleton variant="text" width={120} height={30} />
                  <Skeleton variant="rounded" width={70} height={30} />
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

            <hr className="w-2/3 max-w-2xl my-8 mx-auto border-main-light sm:my-12" />

            <ul className="icons flex flex-col gap-6">
              <li>
                {userRank.isLoading ? (
                  <Skeleton variant="rounded" width={200} height={30} />
                ) : userRank.isError ? (
                  "Classement actuel: N/A"
                ) : (
                  `Classement actuel: ${userRank.data.userRank}`
                )}
              </li>
              <li>
                {userRank.isLoading ? (
                  <Skeleton variant="rounded" width={100} height={30} />
                ) : userRank.isError ? (
                  "Top: N/A"
                ) : (
                  `Top: ${userRank.data.top}%`
                )}
              </li>
            </ul>

            <hr className="w-2/3 max-w-2xl my-8 mx-auto border-main-light sm:my-12" />

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
          <SendEmailForm {...resetPasswordProps} />
          <ConfirmDelete {...deleteAccountProps} />
        </section>
      ) : null}
    </>
  );
};

export default Profile;
