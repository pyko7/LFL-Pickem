import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Team } from "~/src/types/teams";
import Image from "next/image";

type TeamProps = {
  team: Team;
};

const FirstTeam = ({ team }: TeamProps) => {
  const theme = useTheme();

  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const Team = styled(Card)(({ theme }) => ({
    // width: selectedCard === 1 ? "75%" : "50%",
    width: "50%",
    minWidth: "33%",
    heigth: 70,
    color: theme.palette.neutral.light,
    backgroundColor: "#000",
    background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${team.color} 75%)`,
    transition: "width 1s ease-in-out",

    [theme.breakpoints.up("sm")]: {
      minWidth: "25%",
    },
  }));

  const ActionArea = styled(CardActionArea)({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  });

  const TeamContent = styled(CardContent)(({ theme }) => ({
    width: "100%",
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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
      <ActionArea>
        <TeamContent>
          <TeamName variant="h2">{team.name}</TeamName>
          <Image
            loader={() => team.logo}
            unoptimized
            src={team.logo}
            alt={team.name}
            width={isBiggerThanMobile ? 60 : 40}
            height={isBiggerThanMobile ? 60 : 40}
          />
        </TeamContent>
      </ActionArea>
    </Team>
  );
};

export default FirstTeam;
