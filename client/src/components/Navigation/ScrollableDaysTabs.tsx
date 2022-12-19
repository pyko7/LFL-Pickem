import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useGameContext } from "~/context/GameContext";

const ScrollableDaysTabs = () => {
  const { schedule, dayId, setDayId, setDays } = useGameContext();
  const [value, setValue] = useState(dayId! - 1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    return dayId ? setValue(dayId - 1) : setValue(0);
  }, []);

  useEffect(() => {
    if (typeof schedule.data !== "undefined") {
      setDays(schedule.data);
    }
  }, [dayId]);

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
      <Days
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Selecteur de journée"
      >
        {schedule.data?.days.map((day) => (
          <Day
            label={`Journée ${day.id}`}
            key={day.id}
            onClick={() => setDayId(day.id)}
          />
        ))}
      </Days>
    </Container>
  );
};

export default ScrollableDaysTabs;
