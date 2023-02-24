import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
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
import ErrorModal from "../Feedbacks/ErrorModal";
import { useAuthContext } from "@/context/AuthContext";
import AuthModal from "../Modals/AuthModal";
import FirstTeamContainer from "./FirstTeamContainer";
import SecondTeamContainer from "./SecondTeamContainer";

const GameContainer = (props: Game) => {
  const { isLogged } = useAuthContext();
  const [firstTeam, setFirstTeam] = useState<Team>();
  const [secondTeam, setSecondTeam] = useState<Team>();
  const [disabledDay, setDisabledDay] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [notSelected, setNotSelected] = useState(0);
  const [noBet, setNoBet] = useState(true);
  const [userAuth, setUserAuth] = useState(false);

  const teamContainerProps = {
    game: props,
    firstTeam: firstTeam!,
    secondTeam: secondTeam!,
    selectedTeam,
    disabledDay,
    notSelected,
    noBet,
  };

  const authProps = { userAuth, setUserAuth };

  const [betError, setBetError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { teamsList, gamesWithBet } = useGameContext();

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
    if (!isLogged) {
      return setUserAuth(true);
    }

    if (disabledDay) {
      return;
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
      <div className="w-full flex justify-between gap-2 sm:gap-3">
        <>
          {teamsList.isLoading || (isLogged && gamesWithBet.isLoading) ? (
            <Skeleton variant="rounded" width="50%" height={78} />
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

        {createBet.isLoading || updateBet.isLoading || deleteBet.isLoading ? (
          <CircularProgress color="secondary" />
        ) : null}
        {teamsList.isLoading || (isLogged && gamesWithBet.isLoading) ? (
          <Skeleton variant="rounded" width="50%" height={78} />
        ) : (
          <>
            {!firstTeam || !secondTeam ? null : (
              <SecondTeamContainer
                {...teamContainerProps}
                handleClick={handleClick}
              />
            )}
            {betError || gamesWithBet.isError ? (
              <ErrorModal
                betError={betError}
                setBetError={setBetError}
                errorMessage={errorMessage}
              />
            ) : null}
          </>
        )}
      </div>
      <AuthModal {...authProps} />
    </>
  );
};

export default GameContainer;
