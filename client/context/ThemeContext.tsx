import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Children = { children: ReactNode };

type ThemeProps = {
  leagueId: number;
};

const ThemeContext = createContext({} as ThemeProps);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: Children) => {
  const { pathname } = useRouter();
  const [leagueId, setLeagueId] = useState(1);

  useEffect(() => {
    if (pathname === "/div2") {
      return setLeagueId(2);
    }
    setLeagueId(1);
  }, [pathname]);

  return (
    <ThemeContext.Provider value={{ leagueId }}>
      {children}
    </ThemeContext.Provider>
  );
};
