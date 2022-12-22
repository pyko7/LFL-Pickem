import { use, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useGameContext } from "~/context/GameContext";
import { Day } from "~/src/types/teams";

const ScrollableDaysTabs = () => {
  const { allDays, dayData, setDayData } = useGameContext();
  const [value, setValue] = useState(dayData?.id! - 1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (day: Day) => {
    setDayData(day);
  };

  useEffect(() => {
    if (dayData === null) {
      setValue(0);
    }
  }, [dayData?.id]);

  const Container = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 32,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 900,
    backgroundColor: theme.palette.primary.light,
  }));

  const Days = styled(Tabs)(({ theme }) => ({
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.secondary.light,
      height: 3,
    },
    "& .MuiTab-root.Mui-selected": {
      color: theme.palette.secondary.light,
      fontWeight: 700,
    },
  }));

  const Day = styled(Tab)(({ theme }) => ({
    padding: "0 20px",
    textTransform: "none",
    color: theme.palette.neutral.light,
  }));

  return (
    <Container>
      {allDays.isLoading ? (
        <CircularProgress color="secondary" />
      ) : allDays.isError ? (
        <Typography>
          Une erreur est survenue, veuillez réessayer plus tard.
        </Typography>
      ) : (
        <Days
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Selecteur de journée"
        >
          {allDays.data?.map((day) => (
            <Day
              label={`Journée ${day.id}`}
              key={day.id}
              onClick={() => handleClick(day)}
            />
          ))}
        </Days>
      )}
    </Container>
  );
};

export default ScrollableDaysTabs;
