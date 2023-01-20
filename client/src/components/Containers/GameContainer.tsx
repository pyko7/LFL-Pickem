import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import FirstTeam from "../Cards/FirstTeam";
import SecondTeam from "../Cards/SecondTeam";
import { Game, Team } from "~/src/types/teams";
import { useGameContext } from "~/context/GameContext";
import {
  addSelectedTeams,
  updateSelectedTeams,
  deleteSelectedTeams,
} from "~/src/utils/api/game/handleSelectedTeams";
import { getUserSelection } from "~/src/utils/api/game/getUserSelection";
import { utcToZonedTime } from "date-fns-tz";
import { isBefore, parseISO } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import ErrorModal from "../Feedbacks/ErrorModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const GameContainer = (props: Game) => {
  const theme = useTheme();
  const [firstTeam, setFirstTeam] = useState<Team>();
  const [secondTeam, setSecondTeam] = useState<Team>();
  const [disabledDay, setDisabledDay] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [notSelected, setNotSelected] = useState(0);

  const [betError, setBetError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { teamsList, selectedTeamsList, userSelection } = useGameContext();

  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const createBet = useMutation({
    mutationFn: addSelectedTeams,
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error);
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
    if (disabledDay) {
      return;
    }
    if (selectedTeam === 0) {
      createBet.mutate({
        gameId: props.id,
        teamId: currentTeamId,
        dayId: props.dayId,
      });
      setBetError(false);
      setSelectedTeam(currentTeamId);
      setNotSelected(otherTeamId);
      return;
    }
    if (selectedTeam === currentTeamId) {
      deleteBet.mutate({
        gameId: props.id,
        teamId: currentTeamId,
        dayId: props.dayId,
      });
      setBetError(false);
      setSelectedTeam(0);
      setNotSelected(0);
      return;
    } else {
      updateBet.mutate({
        gameId: props.id,
        teamId: currentTeamId,
        dayId: props.dayId,
      });
      setBetError(false);
      setNotSelected(otherTeamId);
      setSelectedTeam(currentTeamId);
      return;
    }
  };

  useEffect(() => {
    const dateInFrance = utcToZonedTime(new Date(), "Europe/Paris");
    const isPast = isBefore(parseISO(props.date), dateInFrance);
    return isPast ? setDisabledDay(true) : setDisabledDay(false);
  }, [props.date]);

  useEffect(() => {
    teamsList.data?.teams.forEach((team) => {
      if (team.id === props.firstTeamId) {
        setFirstTeam(team);
      }
      if (team.id === props.secondTeamId) {
        setSecondTeam(team);
      }
    });
  });

  useEffect(() => {
    if (
      typeof selectedTeamsList.data !== "undefined" &&
      firstTeam &&
      secondTeam
    ) {
      const isFirstTeamSelected = getUserSelection(
        userSelection,
        props.id,
        firstTeam
      );
      const isSecondTeamSelected = getUserSelection(
        userSelection,
        props.id,
        secondTeam
      );

      if (isFirstTeamSelected) {
        setNotSelected(secondTeam.id);
        return setSelectedTeam(firstTeam.id);
      }

      if (isSecondTeamSelected) {
        setNotSelected(firstTeam.id);
        return setSelectedTeam(secondTeam.id);
      }
    }
  }, [userSelection, selectedTeamsList.data, props.id, firstTeam, secondTeam]);

  const Game = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  });

  const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 25,
    height: 25,
    zIndex: 1,
    color: theme.palette.secondary.main,
  }));

  const FailIcon = styled(CancelIcon)(({ theme }) => ({
    position: "absolute",
    top: "50%",

    transform: "translateY(-50%)",
    width: 25,
    height: 25,
    zIndex: 1,
    color: theme.palette.error.main,
  }));

  return (
    <Game>
      <>
        {teamsList.isLoading || selectedTeamsList.isLoading ? (
          <Skeleton variant="rounded" width="50%" height={78} />
        ) : (
          <>
            {firstTeam && secondTeam ? (
              <Box
                sx={{
                  position: "relative",
                  width:
                    selectedTeam === firstTeam.id
                      ? "75%"
                      : selectedTeam === secondTeam.id
                      ? "33%"
                      : "50%",
                }}
                onClick={() => handleClick(firstTeam.id, secondTeam.id)}
              >
                {!disabledDay ? null : selectedTeam !==
                  firstTeam.id ? null : firstTeam.id === props.winner ? (
                  <SuccessIcon
                    sx={{
                      left: isBiggerThanMobile ? 15 : 5,
                    }}
                  />
                ) : (
                  <FailIcon
                    sx={{
                      left: isBiggerThanMobile ? 15 : 5,
                    }}
                  />
                )}

                <FirstTeam
                  team={firstTeam}
                  notSelected={notSelected}
                  disabledDay={disabledDay}
                />
              </Box>
            ) : null}
          </>
        )}
      </>

      {createBet.isLoading || updateBet.isLoading || deleteBet.isLoading ? (
        <CircularProgress color="secondary" />
      ) : null}
      {teamsList.isLoading || selectedTeamsList.isLoading ? (
        <Skeleton variant="rounded" width="50%" height={78} />
      ) : (
        <>
          {firstTeam && secondTeam ? (
            <Box
              sx={{
                position: "relative",
                width:
                  selectedTeam === secondTeam.id
                    ? "75%"
                    : selectedTeam === firstTeam.id
                    ? "33%"
                    : "50%",
              }}
              onClick={() => handleClick(secondTeam.id, firstTeam.id)}
            >
              <SecondTeam
                team={secondTeam}
                notSelected={notSelected}
                disabledDay={disabledDay}
              />
              {!disabledDay ? null : selectedTeam !==
                secondTeam.id ? null : secondTeam.id === props.winner ? (
                <SuccessIcon
                  sx={{
                    right: isBiggerThanMobile ? 15 : 5,
                  }}
                />
              ) : (
                <FailIcon
                  sx={{
                    right: isBiggerThanMobile ? 15 : 5,
                  }}
                />
              )}
            </Box>
          ) : null}
          {betError ? (
            <ErrorModal
              betError={betError}
              setBetError={setBetError}
              errorMessage={errorMessage}
            />
          ) : null}
        </>
      )}
    </Game>
  );
};

export default GameContainer;
