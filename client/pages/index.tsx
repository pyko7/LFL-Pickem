import Head from "next/head";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ScrollableDaysTabs from "~/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "~/src/components/Containers/GameContainer";
import { useEffect, useState } from "react";
import { Day } from "~/src/types/teams";
import { useGameContext } from "~/context/GameContext";
import { useAuthContext } from "~/context/AuthContext";

const Home = () => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { dayId, days } = useGameContext();
  const [currentDay, setCurrentDay] = useState<Day | undefined>();

  useEffect(() => {
    days?.days.forEach((day: Day) => {
      if (day.id === dayId) {
        setCurrentDay(day);
      }
    });
  }, [dayId]);

  const Page = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    padding: "32px 0 15px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50,
    },
  }));

  const PageHeader = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    marginTop: 75,
    justifyContent: "space-between",
    color: theme.palette.neutral.light,
  }));

  const Date = styled(Typography)({
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    borderRadius: "8px 8px 0 0",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 395,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 445,
    },
  });

  const PointsCounter = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    padding: "3px 7px",
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textTransform: "uppercase",
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 8,
  }));

  const Games = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
  });

  return (
    <>
      <Head>
        <title>Accueil - LFL-Pickem</title>
        <meta property="og:title" content="Accueil - LFL-Pickem" />
      </Head>

      <Page component="section">
        <Container
          maxWidth="md"
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <ScrollableDaysTabs />
          <PageHeader>
            <Date>{currentDay?.date}</Date>
            <PointsCounter>{user?.gamesData.points} pts</PointsCounter>
          </PageHeader>
          <Games>
            {currentDay?.games.map((game) => (
              <GameContainer {...game} key={game.id} />
            ))}
          </Games>
        </Container>
      </Page>
    </>
  );
};

export default Home;
