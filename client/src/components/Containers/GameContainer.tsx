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
import Skeleton from "../Loaders/Skeleton";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TeamCard from "../Cards/TeamCard";

const GameContainer = (props: Game) => {
  const { isLogged } = useAuthContext();
  const [firstTeam, setFirstTeam] = useState<Team>();
  const [secondTeam, setSecondTeam] = useState<Team>();
  const [disabledDay, setDisabledDay] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [betError, setBetError] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [notSelected, setNotSelected] = useState(0);
  const [noBet, setNoBet] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { teamsList, gamesWithBet } = useGameContext();
  const gameTime = props.date.slice(11, 16).replace(":", "h");

  const lflLogo =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";
  const div2Logo =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1681475197/div2-logo_su2wug.svg";

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
      gameId: props.id,
      teamId: currentTeamId,
      dayId: props.dayId,
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
      <div className="w-full max-w-sm px-2 py-4 flex flex-col gap-3 rounded-md bg-neutral-700 shadow-elevation md:px-4">
        <div className="flex flex-col gap-1">
          <span>Ven 07 avril</span>
          <div className="flex gap-1">
            <LockClosedIcon aria-hidden="true" className="w-4 h-4" />
            <span className="text-xs">Fin des prédictions: 07/04 18h</span>
          </div>
        </div>

        <div className="py-2 flex flex-col gap-5">
          {!firstTeam || !secondTeam ? null : (
            <>
              <TeamCard team={firstTeam} winningBet={null} />
              <TeamCard team={secondTeam} winningBet={null} />
            </>
          )}
        </div>
      </div>
      <AuthModal
        authModal={authModal}
        setAuthModal={setAuthModal}
        handleClick={handleAuthModalClick}
      />
    </>
  );
};

export default GameContainer;
