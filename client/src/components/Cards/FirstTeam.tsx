import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TeamProps } from "~/src/types/teams";
import Image from "next/image";

const FirstTeam = ({ team, notSelected }: TeamProps) => {
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (notSelected === team.id) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [notSelected, team.id]);

  const Team = styled(Card)(({ theme }) => ({
    heigth: 60,
    color: theme.palette.neutral.light,
    backgroundColor: "#000",
    background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${team.color} 75%)`,
    cursor: "pointer",
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 10,
    },
  }));

  const ContentContainer = styled(CardContent)({
    width: "100%",
    padding: 10,
    display: "flex",
    justifyContent: visible ? "flex-end" : "center",
  });

  const TeamContent = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontWeight: 700,
    [theme.breakpoints.up("sm")]: {
      width: "65%",
      justifyContent: "space-between",
      gap: 0,
    },
  }));

  const TeamName = styled(Typography)({
    fontWeight: 700,
    fontSize: 16,
  });

  return (
    <Team>
      <ContentContainer>
        <TeamContent>
          {!isBiggerThanMobile && !visible ? null : (
            <TeamName variant="h2">{team.name}</TeamName>
          )}
          <Image
            loader={() => team.logo}
            unoptimized
            src={team.logo}
            alt={team.name}
            width={isBiggerThanMobile ? 60 : 40}
            height={isBiggerThanMobile ? 60 : 40}
          />
        </TeamContent>
      </ContentContainer>
    </Team>
  );
};

export default FirstTeam;
