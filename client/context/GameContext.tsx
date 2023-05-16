import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DayProps, Game } from "@/src/types/types";
import { GamesWithBet, TeamList } from "@/src/types/teams";
import { getDaysByLeague } from "@/src/utils/api/game/getDaysByLeague";
import { getTeamsByLeague } from "@/src/utils/api/game/getTeamsByLeague";
import { getGamesWithBetByDay } from "@/src/utils/api/game/getGamesWithBeByDay";
import { updateUserScore } from "@/src/utils/api/user/updateUserScore";
import { useAuthContext } from "./AuthContext";
import { getGamesByDayId } from "@/src/utils/api/game/getGamesByDayId";
import { getAllDays } from "@/src/utils/api/game/getAllDays";
import { useThemeContext } from "./ThemeContext";

type Children = { children: ReactNode };

type GameContextInterface = {
  allDays: UseQueryResult<DayProps[]>;
  DaysByLeague: UseQueryResult<DayProps[]>;
  gamesByDayId: UseQueryResult<Game[]>;
  gamesWithBet: UseQueryResult<GamesWithBet>;
  dayData: DayProps | null;
  setDayData: (dayData: DayProps) => void;
};

const GameContext = createContext({} as GameContextInterface);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: Children) => {
  const { isLogged } = useAuthContext();
  const { leagueId } = useThemeContext();
  const [dayData, setDayData] = useState<DayProps | null>(null);

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

  useQuery(["score"], updateUserScore, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
    enabled: isLogged,
  });

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
        gamesByDayId,
        gamesWithBet,
        dayData,
        setDayData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
