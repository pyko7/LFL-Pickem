import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Day, Game, GamesWithBet, TeamList } from "@/src/types/teams";
import { getDaysByLeague } from "@/src/utils/api/game/getDaysByLeague";
import { getTeamsByLeague } from "@/src/utils/api/game/getTeamsByLeague";
import { getGamesWithBetByDay } from "@/src/utils/api/game/getGamesWithBeByDay";
import { updateUserScore } from "@/src/utils/api/user/updateUserScore";
import { useAuthContext } from "./AuthContext";
import { getGamesByDayId } from "@/src/utils/api/game/getGamesByDayId";
import { getAllDays } from "@/src/utils/api/game/getAllDays";
import { useGetClosestDayFromNow } from "@/src/hooks/useGetClosestDayFromNow";

type Children = { children: ReactNode };

type GameContextInterface = {
  allDays: UseQueryResult<Day[]>;
  DaysByLeague: UseQueryResult<Day[]>;
  teamsList: UseQueryResult<TeamList>;
  gamesByDayId: UseQueryResult<Game[]>;
  gamesWithBet: UseQueryResult<GamesWithBet>;
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
  setLeagueId: (leagueId: number) => void;
};

const GameContext = createContext({} as GameContextInterface);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: Children) => {
  const { isLogged } = useAuthContext();
  const [leagueId, setLeagueId] = useState(0);
  const [dayData, setDayData] = useState<Day | null>(null);

  const allDays = useQuery(["allDays"], getAllDays, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  const DaysByLeague = useQuery(
    ["DaysByLeague", leagueId],
    () => getDaysByLeague(leagueId),
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    }
  );
  const teamsList = useQuery(["teams"], getTeamsByLeague, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });

  const gamesByDayId = useQuery(
    ["gamesByDayId"],
    () => getGamesByDayId(dayData?.id!),
    {
      enabled: dayData !== null && !isLogged ? true : false,
    }
  );

  const gamesWithBet = useQuery(
    ["gamesWithBet"],
    () => getGamesWithBetByDay(dayData?.id!),
    {
      enabled: dayData !== null && isLogged ? true : false,
    }
  );
  const closestDay = useGetClosestDayFromNow(DaysByLeague);

  useQuery(["score"], updateUserScore, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });

  useEffect(() => {
    if (!closestDay) {
      return;
    }
    setDayData(closestDay.closestDay);
  }, [closestDay.closestDay]);

  useEffect(() => {
    if (dayData === null) {
      DaysByLeague.refetch();
      return;
    }
    if (!isLogged) {
      gamesByDayId.refetch();
    } else {
      gamesWithBet.refetch();
    }
  }, [dayData?.id]);

  return (
    <GameContext.Provider
      value={{
        allDays,
        DaysByLeague,
        teamsList,
        gamesByDayId,
        gamesWithBet,
        dayData,
        setDayData,
        setLeagueId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
