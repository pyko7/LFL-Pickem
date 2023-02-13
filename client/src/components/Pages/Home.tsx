import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import ScrollableDaysTabs from "@/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "@/src/components/Containers/GameContainer";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { User } from "@/src/types/user";
import { useGameContext } from "@/context/GameContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const Homepage = () => {
  const theme = useTheme();
  const { day, dayData, teamsList } = useGameContext();

  const currentUser: UseQueryResult<User> | null = useQuery(
    ["user"],
    getUserById,
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    }
  );

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
        <CurrentDate variant="h1">
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
            {day?.map((day) => {
              return dayData?.id !== day.dayId ? (
                <Box sx={{ display: "none" }}>
                  <GameContainer {...day} key={day.id} />
                </Box>
              ) : (
                <GameContainer {...day} key={day.id} />
              );
            })}
          </>
        )}
      </Games>
    </Container>
  );
};

export default Homepage;
