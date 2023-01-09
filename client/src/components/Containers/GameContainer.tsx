import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
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

const GameContainer = (props: Game) => {
  const [firstTeam, setFirstTeam] = useState<Team | undefined>();
  const [secondTeam, setSecondTeam] = useState<Team | undefined>();
  const [disabledDay, setDisabledDay] = useState(false);

  const { teams, userSelection } = useGameContext();
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [notSelected, setNotSelected] = useState(0);

  const handleClick = (currentTeamId: number, otherTeamId: number) => {
    if (disabledDay) {
      return;
    }
    if (selectedTeam === 0) {
      addSelectedTeams({
        gameId: props.id,
        teamId: currentTeamId,
        dayId: props.dayId,
      });
      setSelectedTeam(currentTeamId);
      setNotSelected(otherTeamId);
      return;
    }
    if (selectedTeam === currentTeamId) {
      deleteSelectedTeams({
        gameId: props.id,
        teamId: currentTeamId,
        dayId: props.dayId,
      });
      setSelectedTeam(0);
      setNotSelected(0);
      return;
    } else {
      updateSelectedTeams({
        gameId: props.id,
        teamId: currentTeamId,
        dayId: props.dayId,
      });
      setSelectedTeam(currentTeamId);
      setNotSelected(otherTeamId);
      return;
    }
  };

  useEffect(() => {
    const dateInFrance = utcToZonedTime(new Date(), "Europe/Paris");
    const isPast = isBefore(parseISO(props.date), dateInFrance);
    return isPast ? setDisabledDay(true) : setDisabledDay(false);
  }, [props.date]);

  useEffect(() => {
    teams?.teams.forEach((team) => {
      if (team.id === props.firstTeamId) {
        setFirstTeam(team);
      }
      if (team.id === props.secondTeamId) {
        setSecondTeam(team);
      }
    });
  });

  useEffect(() => {
    if (typeof userSelection !== "undefined" && firstTeam && secondTeam) {
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
  }, [userSelection, props.id, firstTeam, secondTeam]);

  const Game = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  });

  return (
    <Game>
      {firstTeam && secondTeam ? (
        <Box
          sx={{
            width:
              selectedTeam === firstTeam.id
                ? "75%"
                : selectedTeam === secondTeam.id
                ? "33%"
                : "50%",
          }}
          onClick={() => handleClick(firstTeam.id, secondTeam.id)}
        >
          <FirstTeam
            team={firstTeam}
            notSelected={notSelected}
            disabledDay={disabledDay}
          />
        </Box>
      ) : null}
      {firstTeam && secondTeam ? (
        <Box
          sx={{
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
        </Box>
      ) : null}
    </Game>
  );
};

export default GameContainer;
