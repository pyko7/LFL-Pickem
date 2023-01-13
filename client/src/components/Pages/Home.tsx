import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import ScrollableDaysTabs from "~/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "~/src/components/Containers/GameContainer";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserById } from "~/src/utils/api/user/getUserById";
import { User } from "~/src/types/user";
import { useGameContext } from "~/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import ErrorSnackbar from "../Feedbacks/ErrorSnackbar";
import { useEffect, useState } from "react";

const Homepage = () => {
  const theme = useTheme();
  const { day, dayData, teamsList, selectedTeamsList } = useGameContext();
  const [errorMessage, setErrorMessage] = useState(false);

  const currentUser: UseQueryResult<User> | null = useQuery(
    ["user"],
    getUserById,
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    }
  );

  useEffect(() => {
    if (selectedTeamsList.isError) {
      return setErrorMessage(true);
    }
    setErrorMessage(false);
  }, [selectedTeamsList]);

  const PageHeader = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    marginTop: 75,
    justifyContent: "space-between",
    color: theme.palette.neutral.light,
  }));

  const CurrentDate = styled(Typography)({
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    borderRadius: "8px 8px 0 0",
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
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
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <ScrollableDaysTabs />
      <PageHeader>
        <CurrentDate>
          {dayData === null
            ? "Journée"
            : format(parseISO(dayData?.date!), "PPPP", {
                locale: fr,
              })}
        </CurrentDate>
        {currentUser.isLoading ? (
          <Skeleton variant="rounded" width={70} height={30} />
        ) : currentUser.isError ? (
          <PointsCounter>N/A pts </PointsCounter>
        ) : (
          <PointsCounter>{currentUser.data.points} pts</PointsCounter>
        )}
      </PageHeader>
      <Games>
        {teamsList.isError ? (
          <Typography sx={{ margin: "0 auto" }}>
            Une erreur est survenue. Les matchs sont momentanément
            indisponibles. Veuillez nous excuser pour la gêne occasionnée.
          </Typography>
        ) : (
          <>
            {day?.map((day) => (
              <GameContainer {...day} key={day.id} />
            ))}
          </>
        )}
      </Games>
      {selectedTeamsList.error ? (
        <ErrorSnackbar
          open={errorMessage}
          setOpen={setErrorMessage}
          message="Impossible d'afficher votre sélection pour le moment "
        />
      ) : null}
    </Container>
  );
};

export default Homepage;
