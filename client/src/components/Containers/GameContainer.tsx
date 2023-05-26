import { KeyboardEvent, useEffect, useState } from "react";
import {
  addSelectedTeams,
  updateSelectedTeams,
  deleteSelectedTeams,
} from "@/src/utils/api/game/handleSelectedTeams";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/AuthContext";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TeamCard from "../Cards/TeamCard";
import Modal from "../Modals/Modal";
import { Bet, Game } from "@/src/types/types";
import { capitalizeFirstLetter } from "@/src/utils/capitalizeFirstLetter";
import { getTeamById } from "@/src/utils/api/game/getTeamById";
import { IsGamePast } from "@/src/utils/IsGamePast";

type Props = {
  day: Game;
  bets?: Bet[];
  handleRefetch?: () => void;
};

const GameContainer = ({ day, bets, handleRefetch }: Props) => {
  const { id, date, dayId, firstTeamId, secondTeamId, winner } = day;
  const { isLogged, setModal } = useAuthContext();
  const [bet, setBet] = useState(0);

  const [disabledDay, setDisabledDay] = useState(false);
  const [betError, setBetError] = useState(false);
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

  const handleErrorModal = () => {
    return betError ? setBetError(false) : setBetError(true);
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
      setBet(0);
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
      setBet(0);
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
      setBet(0);
    },
  });

  const handleClick = (teamId: number) => {
    const credentials = {
      gameId: id,
      teamId,
      dayId,
    };
    const isPast = IsGamePast(date);

    if (isPast) {
      setBetError(true);
      setErrorMessage("Les prédictions sont closes.");
      return;
    }
    if (!isLogged) {
      return setModal(true);
    }
    if (bet === 0) {
      createBet.mutate(credentials);
      setBetError(false);
      setBet(teamId);
      if (handleRefetch) {
        handleRefetch();
      }
      return;
    }
    if (bet === teamId) {
      deleteBet.mutate(credentials);
      setBetError(false);
      setBet(0);
      if (handleRefetch) {
        handleRefetch();
      }
      return;
    } else {
      updateBet.mutate(credentials);
      setBetError(false);
      setBet(teamId);
      if (handleRefetch) {
        handleRefetch();
      }
      return;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, teamId: number) => {
    if (event.key === "Enter") {
      handleClick(teamId);
    }
  };

  useEffect(() => {
    const isPast = IsGamePast(date);
    if (isPast) {
      setDisabledDay(true);
    }
  }, [date]);

  useEffect(() => {
    bets?.forEach((bet) => {
      if (bet.dayId === dayId && bet.teamId === firstTeamId) {
        return setBet(firstTeamId);
      }
      if (bet.dayId === dayId && bet.teamId === secondTeamId) {
        return setBet(secondTeamId);
      }
    });
  }, [bets, dayId, firstTeamId, secondTeamId]);

  return (
    <>
      <div className="w-full max-w-sm px-2 py-4 flex flex-col gap-3 rounded-md bg-neutral-700 shadow-elevation md:px-4">
        <div className="flex flex-col gap-1">
          <div className="w-full flex items-center justify-between">
            <span>{gameDate}</span>
            {winner !== 0 && winner === bet ? (
              <span className="px-2 py-1 rounded-xl border-1 border-emerald-400 text-emerald-400 text-sm font-bold">
                +3 pts
              </span>
            ) : null}
          </div>
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
                bet={bet}
                team={firstTeam.data}
                winner={winner}
                disabledDay={disabledDay}
                onClick={() => handleClick(firstTeam.data.id)}
                onKeyDown={(e) => handleKeyDown(e, firstTeam.data.id)}
              />
              <TeamCard
                role="button"
                tabIndex={0}
                bet={bet}
                team={secondTeam.data}
                winner={winner}
                disabledDay={disabledDay}
                onClick={() => handleClick(secondTeam.data.id)}
                onKeyDown={(e) => handleKeyDown(e, secondTeam.data.id)}
              />
            </>
          )}
        </div>
      </div>

      <Modal
        open={betError}
        setOpen={setBetError}
        title={"Erreur"}
        description={errorMessage}
        handleClose={handleErrorModal}
      />
    </>
  );
};

export default GameContainer;
