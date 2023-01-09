import Head from "next/head";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ScrollableDaysTabs from "~/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "~/src/components/Containers/GameContainer";
import { useEffect } from "react";
import { useAuthContext } from "~/context/AuthContext";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserById } from "~/src/utils/api/user/getUserById";
import { User } from "~/src/types/user";
import { useGameContext } from "~/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const Home = () => {
  const theme = useTheme();
  const { user, setUser } = useAuthContext();
  const { allDays, day, dayData } = useGameContext();

  const date = format(parseISO(dayData?.date), "PPPP", {
    locale: fr,
  });

  const currentUser: UseQueryResult<User> | null = useQuery(
    ["user"],
    getUserById
  );

  useEffect(() => {
    setUser(currentUser);
  }, []);

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

  const CurrentDate = styled(Typography)({
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

      {currentUser?.isLoading || allDays?.isLoading ? (
        <CircularProgress color="secondary" />
      ) : currentUser?.isError || allDays?.isError ? (
        <Typography>
          Une erreur est survenue, veuillez réessayer plus tard.
        </Typography>
      ) : (
        <Page component="section">
          <Container
            maxWidth="md"
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <ScrollableDaysTabs />
            <PageHeader>
              <CurrentDate>{date}</CurrentDate>
              <PointsCounter>{user?.data?.points} pts</PointsCounter>
            </PageHeader>
            <Games>
              {day?.map((day) => (
                <GameContainer {...day} key={day.id} />
              ))}
            </Games>
          </Container>
        </Page>
      )}
    </>
  );
};

export default Home;
