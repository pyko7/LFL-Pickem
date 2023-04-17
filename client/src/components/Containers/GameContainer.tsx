import { useEffect, useState } from "react";
import { Game, Team } from "@/src/types/teams";
import { useGameContext } from "@/context/GameContext";
import {
  addSelectedTeams,
  updateSelectedTeams,
  deleteSelectedTeams,
} from "@/src/utils/api/game/handleSelectedTeams";
import { utcToZonedTime } from "date-fns-tz";
import { isBefore, parseISO } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import ErrorModal from "../Modals/ErrorModal";
import { useAuthContext } from "@/context/AuthContext";
import AuthModal from "../Modals/AuthModal";
import FirstTeamContainer from "./FirstTeamContainer";
import SecondTeamContainer from "./SecondTeamContainer";
import Skeleton from "../Loaders/Skeleton";
import Image from "next/image";

const GameContainer = (props: Game) => {
  const { isLogged } = useAuthContext();
  const [firstTeam, setFirstTeam] = useState<Team>();
  const [secondTeam, setSecondTeam] = useState<Team>();
  const [disabledDay, setDisabledDay] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const [betError, setBetError] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [notSelected, setNotSelected] = useState(0);
  const [noBet, setNoBet] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { teamsList, gamesWithBet } = useGameContext();
  const authProps = { isOpen: userAuth, setIsOpen: setUserAuth };
  const gameTime = props.date.slice(11, 16).replace(":", "h");

  const teamContainerProps = {
    game: props,
    firstTeam: firstTeam!,
    secondTeam: secondTeam!,
    selectedTeam,
    disabledDay,
    notSelected,
    noBet,
  };

  const imageUrl =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";

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
      gameId: props.id,
      teamId: currentTeamId,
      dayId: props.dayId,
    };

    if (disabledDay) {
      return;
    }
    if (!isLogged) {
      return setUserAuth(true);
    }
    if (selectedTeam === 0) {
      createBet.mutate(credentials);
      setBetError(false);
      setNoBet(false);
      setSelectedTeam(currentTeamId);
      setNotSelected(otherTeamId);
      return;
    }
    if (selectedTeam === currentTeamId) {
      deleteBet.mutate(credentials);
      setBetError(false);
      setNoBet(true);
      setSelectedTeam(0);
      setNotSelected(0);
      return;
    } else {
      updateBet.mutate(credentials);
      setBetError(false);
      setNoBet(false);
      setNotSelected(otherTeamId);
      setSelectedTeam(currentTeamId);
      return;
    }
  };

  useEffect(() => {
    const dateInFrance = utcToZonedTime(new Date(), "Europe/Paris");
    //date-fns-tz has 1 hour off compare to Paris timezone, this is why timezone is set to London
    const gameDateInFrance = utcToZonedTime(
      parseISO(props.date),
      "Europe/London"
    );
    const isPast = isBefore(gameDateInFrance, dateInFrance);
    return isPast ? setDisabledDay(true) : setDisabledDay(false);
  }, [props.date]);

  useEffect(() => {
    teamsList.data?.teams.map((team) => {
      if (team.id === props.firstTeamId) {
        setFirstTeam(team);
      }
      if (team.id === props.secondTeamId) {
        setSecondTeam(team);
      }
    });
  }, [props.id, props.firstTeamId, props.secondTeamId, teamsList.data]);

  useEffect(() => {
    if (!firstTeam || !secondTeam || !isLogged) {
      return;
    }
    if (typeof gamesWithBet.data === "undefined") {
      return;
    }
    if (gamesWithBet.data.userBets.length > 0) {
      setNoBet(false);
    }
    gamesWithBet.data.userBets.map((bet) => {
      if (bet.teamId === firstTeam.id) {
        setNotSelected(secondTeam.id);
        return setSelectedTeam(firstTeam.id);
      }
      if (bet.teamId === secondTeam.id) {
        setNotSelected(firstTeam.id);
        return setSelectedTeam(secondTeam.id);
      }
    });
  }, [gamesWithBet.data?.userBets, props.id, firstTeam, secondTeam]);

  useEffect(() => {
    if (gamesWithBet.isError) {
      setErrorMessage(
        "Impossible de récupérer votre sélection, veuillez réessayer plus tard"
      );
    }
  }, [gamesWithBet]);

  return (
    <>
      <div
        className="w-full py-4 flex flex-col gap-3 rounded-md bg-neutral-700
       "
        style={{
          boxShadow:
            "	0px 8px 10px 1px hsla(0,0%,0%,0.14), 0px 3px 14px 2px hsla(0,0%,0%,0.12), 0px 5px 5px -3px hsla(0,0%,0%,0.2)",
        }}
      >
        <div className="relative w-full px-2 flex gap-2 items-end text-neutral-200 text-sm sm:px-4">
          <Image src={imageUrl} alt="" width={30} height={30} />
          LFL - J{props.dayId}
        </div>
        <div
          className="w-full py-4 flex justify-between items-end gap-2 overflow-hidden sm:gap-3
        "
        >
          <>
            {teamsList.isLoading || (isLogged && gamesWithBet.isLoading) ? (
              <Skeleton
                width="100%"
                height="64px"
                rounded
                ariaLabel="Chargement des équipes"
              />
            ) : (
              <>
                {!firstTeam || !secondTeam ? null : (
                  <FirstTeamContainer
                    {...teamContainerProps}
                    handleClick={handleClick}
                  />
                )}
              </>
            )}
          </>
          <p className="h-10 flex items-center text-sm sm:text-base ">
            {gameTime}
          </p>
          {teamsList.isLoading || (isLogged && gamesWithBet.isLoading) ? (
            <>
              <Skeleton
                width="100%"
                height="152px"
                rounded
                ariaLabel="Chargement des équipes"
              />
            </>
          ) : (
            <>
              {!firstTeam || !secondTeam ? null : (
                <SecondTeamContainer
                  {...teamContainerProps}
                  handleClick={handleClick}
                />
              )}
            </>
          )}
        </div>
        {betError || gamesWithBet.isError ? (
          <ErrorModal
            betError={betError}
            setBetError={setBetError}
            errorMessage={errorMessage}
          />
        ) : null}
      </div>
      <AuthModal {...authProps} />
    </>
  );
};

export default GameContainer;
