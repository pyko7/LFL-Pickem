import { KeyboardEvent, useEffect, useState } from "react";
import {
  addSelectedTeams,
  updateSelectedTeams,
  deleteSelectedTeams,
} from "@/src/utils/api/game/handleSelectedTeams";
import { utcToZonedTime } from "date-fns-tz";
import { format, isBefore, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/AuthContext";
import AuthModal from "../Modals/AuthModal";
import Skeleton from "../Loaders/Skeleton";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TeamCard from "../Cards/TeamCard";
import Modal from "../Modals/Modal";
import { Game } from "@/src/types/types";

import { capitalizeFirstLetter } from "@/src/utils/capitalizeFirstLetter";
import { getTeamById } from "@/src/utils/api/game/getTeamById";

type Props = {
  day: Game;
};

const GameContainer = ({ day }: Props) => {
  const { id, date, dayId, firstTeamId, secondTeamId, winner } = day;
  const { isLogged } = useAuthContext();
  const [selected, setSelected] = useState(false);

  const [disabledDay, setDisabledDay] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [betError, setBetError] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const gameDate = capitalizeFirstLetter(
    format(parseISO(day.date.toString()), "PPPP", {
      locale: fr,
    })
  );

  const firstTeam = useQuery(
    ["team", firstTeamId],
    () => getTeamById(firstTeamId),
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    }
  );
  const secondTeam = useQuery(
    ["team", secondTeamId],
    () => getTeamById(secondTeamId),
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    }
  );

  const handleAuthModalClick = () => {
    return setAuthModal(true);
  };

  const createBet = useMutation({
    mutationFn: addSelectedTeams,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          setErrorMessage("Vous n'êtes pas autorisé à réaliser cette action");
        } else if (error.message === "Too Many Requests") {
          setErrorMessage(
            "Vous avez effectuer trop de requête, veuillez patienter avant quelques instants avant de pouvoir refaire un choix"
          );
        } else {
          setErrorMessage("Une erreur s'est produite");
        }
      }
      setBetError(true);
    },
  });

  const updateBet = useMutation({
    mutationFn: updateSelectedTeams,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          setErrorMessage("Vous n'êtes pas autorisé à réaliser cette action");
        } else if (error.message == "Too Many Requests") {
          setErrorMessage(
            "Vous avez effectuer trop de requête, veuillez patienter avant quelques instants avant de pouvoir refaire un choix"
          );
        } else {
          setErrorMessage("Une erreur s'est produite");
        }
      }
      setBetError(true);
    },
  });

  const deleteBet = useMutation({
    mutationFn: deleteSelectedTeams,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          setErrorMessage("Vous n'êtes pas autorisé à réaliser cette action");
        } else if (error.message == "Too Many Requests") {
          setErrorMessage(
            "Vous avez effectuer trop de requête, veuillez patienter avant quelques instants avant de pouvoir refaire un choix"
          );
        } else {
          setErrorMessage("Une erreur s'est produite");
        }
      }
      setBetError(true);
    },
  });

  const handleClick = (currentTeamId: number, otherTeamId: number) => {
    const credentials = {
      gameId: id,
      teamId: currentTeamId,
      dayId: dayId,
    };

    if (disabledDay) {
      return;
    }
    if (!isLogged) {
      return setAuthModal(true);
    }
    if (selectedTeam === 0) {
      createBet.mutate(credentials);
      setBetError(false);
      setSelectedTeam(currentTeamId);
      return;
    }
    if (selectedTeam === currentTeamId) {
      deleteBet.mutate(credentials);
      setBetError(false);
      setSelectedTeam(0);
      return;
    } else {
      updateBet.mutate(credentials);
      setBetError(false);
      setSelectedTeam(currentTeamId);
      return;
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    currentTeamId: number,
    otherTeamId: number
  ) => {
    if (event.key === "Enter") {
      handleClick(currentTeamId, otherTeamId);
    }
  };

  useEffect(() => {
    const dateInFrance = utcToZonedTime(new Date(), "Europe/Paris");
    //date-fns-tz has 1 hour off compare to Paris timezone, this is why timezone is set to London
    const gameDateInFrance = utcToZonedTime(
      parseISO(date.toString()),
      "Europe/London"
    );
    const isPast = isBefore(gameDateInFrance, dateInFrance);
    return isPast ? setDisabledDay(true) : setDisabledDay(false);
  }, [date]);

  // useEffect(() => {
  //   teamsList.data?.teams.map((team) => {
  //     if (team.id === firstTeamId) {
  //       setFirstTeam(team);
  //     }
  //     if (team.id === secondTeamId) {
  //       setSecondTeam(team);
  //     }
  //   });
  // }, [id, firstTeamId, secondTeamId, teamsList.data]);

  // useEffect(() => {
  //   if (!firstTeam || !secondTeam || !isLogged) {
  //     return;
  //   }
  //   if (typeof gamesWithBet.data === "undefined") {
  //     return;
  //   }
  //   if (gamesWithBet.data.userBets.length > 0) {
  //   }
  //   gamesWithBet.data.userBets.map((bet) => {
  //     if (bet.teamId === firstTeam.id) {
  //       setNotSelected(secondTeam.id);
  //       return setSelectedTeam(firstTeam.id);
  //     }
  //     if (bet.teamId === secondTeam.id) {
  //       setNotSelected(firstTeam.id);
  //       return setSelectedTeam(secondTeam.id);
  //     }
  //   });
  // }, [gamesWithBet.data?.userBets, id, firstTeam, secondTeam]);

  // useEffect(() => {
  //   if (gamesWithBet.isError) {
  //     setErrorMessage(
  //       "Impossible de récupérer votre sélection, veuillez réessayer plus tard"
  //     );
  //   }
  // }, [gamesWithBet]);

  return (
    <>
      <div className="w-full max-w-sm px-2 py-4 flex flex-col gap-3 rounded-md bg-neutral-700 shadow-elevation md:px-4">
        <div className="flex flex-col gap-1">
          <span>{gameDate}</span>
          <div className="flex gap-1">
            <LockClosedIcon aria-hidden="true" className="w-4 h-4" />
            <span className="text-xs">Fin des prédictions: {gameDate} 18h</span>
          </div>
        </div>

        <div className="py-2 flex flex-col gap-5">
          {firstTeam.isError ||
          firstTeam.isLoading ||
          secondTeam.isError ||
          secondTeam.isLoading ? null : (
            <>
              <TeamCard
                role="button"
                tabIndex={0}
                selected={selected}
                team={firstTeam.data}
                winningBet={null}
                onClick={() =>
                  handleClick(firstTeam.data.id, secondTeam.data.id)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, firstTeam.data.id, secondTeam.data.id)
                }
              />
              <TeamCard
                role="button"
                tabIndex={0}
                selected={selected}
                team={secondTeam.data}
                winningBet={null}
                onClick={() =>
                  handleClick(firstTeam.data.id, secondTeam.data.id)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, firstTeam.data.id, secondTeam.data.id)
                }
              />
            </>
          )}
        </div>
      </div>
      <AuthModal
        authModal={authModal}
        setAuthModal={setAuthModal}
        handleClick={handleAuthModalClick}
      />
      <Modal
        authModal={betError}
        setAuthModal={setBetError}
        title={"Erreur"}
        description={errorMessage}
      />
    </>
  );
};

export default GameContainer;
