import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TeamProps } from "@/src/types/teams";
import Image from "next/image";

const SecondTeam = ({ team, notSelected, disabledDay, noBet }: TeamProps) => {
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
    heigth: 70,
    color: theme.palette.neutral.light,
    backgroundColor: "#000",
    background: `linear-gradient(-90deg, ${theme.palette.primary.dark} 0%, ${team.color} 75%)`,
    filter: disabledDay ? "contrast(1%)" :  noBet || !visible ? "grayscale(85%)" : "",
    cursor: disabledDay ? "not-allowed" : "pointer",
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 10,
    },
    "&:hover": {
      filter: disabledDay ? "" : "grayscale(30%)",

    },
  }));

  const ContentContainer = styled(CardContent)({
    width: "100%",
    padding: 10,
    display: "flex",
    justifyContent: visible ? "flex-start" : "center",
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
      justifyContent: visible ? "space-between" : "center",
      gap: 0,
    },
  }));

  const TeamName = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: 16,
    [theme.breakpoints.up("sm")]: {
      textAlign: "end",
    },
  }));

  return (
    <Team>
      <ContentContainer>
        <TeamContent>
          <Image
            loader={() => team.logo}
            unoptimized
            src={team.logo}
            alt={team.name}
            width={isBiggerThanMobile ? 50 : 40}
            height={isBiggerThanMobile ? 50 : 40}
            style={{
              objectFit: "contain",
            }}
          />
          {!visible ? null : <TeamName variant="h2">{team.name}</TeamName>}
        </TeamContent>
      </ContentContainer>
    </Team>
  );
};

export default SecondTeam;
