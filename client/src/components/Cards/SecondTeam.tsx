import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TeamProps } from "~/src/types/teams";
import Image from "next/image";
import { useGameContext } from "~/context/GameContext";
import { addSelectedTeams } from "~/src/utils/api/game/addSelectedTeams";

const SecondTeam = ({ team, gameId }: TeamProps) => {
  const theme = useTheme();
  const { selectedTeamsList } = useGameContext();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedCard, setSelectedCard] = useState(false);

  const handleClick = () => {
    addSelectedTeams({ gameId, teamId: team.id });
  };

  useEffect(() => {
    if (typeof selectedTeamsList.data !== "undefined") {
      if (
        selectedTeamsList.data?.filter(
          (bet) => bet.gameId === gameId && bet.teamId === team.id
        ).length > 0
      ) {
        setSelectedCard(true);
      } else {
        setSelectedCard(false);
      }
    }
  }, [selectedTeamsList.data, gameId, team.id]);

  const Team = styled(Card)(({ theme }) => ({
    width: selectedCard ? "75%" : "50%",
    minWidth: "33%",
    heigth: 70,
    color: theme.palette.neutral.light,
    backgroundColor: "#000",
    background: `linear-gradient(-90deg, ${theme.palette.primary.dark} 0%, ${team.color} 75%)`,
    WebkitTransition: "width 1s ease-in-out",
    MozTransition: "width 1s ease-in-out",
    transition: "width 1s ease-in-out",
    [theme.breakpoints.up("sm")]: {
      minWidth: "25%",
    },
  }));

  const ActionArea = styled(CardActionArea)({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
  });

  const TeamContent = styled(CardContent)(({ theme }) => ({
    width: "100%",
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    fontWeight: 700,
    [theme.breakpoints.up("sm")]: {
      width: "65%",
      justifyContent: "space-between",
      gap: 0,
    },
  }));

  const TeamName = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: 16,
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
    },
  }));

  return (
    <Team>
      <ActionArea onClick={handleClick}>
        <TeamContent>
          <Image
            loader={() => team.logo}
            unoptimized
            src={team.logo}
            alt={team.name}
            width={isBiggerThanMobile ? 60 : 40}
            height={isBiggerThanMobile ? 60 : 40}
          />
          <TeamName variant="h2">{team.name}</TeamName>
        </TeamContent>
      </ActionArea>
    </Team>
  );
};

export default SecondTeam;
