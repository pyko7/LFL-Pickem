import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FirstTeam from "../Cards/FirstTeam";
import SecondTeam from "../Cards/SecondTeam";
import { Game, Team } from "~/src/types/teams";
import { useGameContext } from "~/context/GameContext";

const GameContainer = (props: Game) => {
  const [firstTeam, setFirstTeam] = useState<Team | undefined>();
  const [secondTeam, setSecondTeam] = useState<Team | undefined>();
  const { teams } = useGameContext();

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

  const Game = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  });

  return (
    <Game>
      {firstTeam ? <FirstTeam team={firstTeam} gameId={props.id} /> : null}
      {secondTeam ? <SecondTeam team={secondTeam} gameId={props.id} /> : null}
    </Game>
  );
};

export default GameContainer;
