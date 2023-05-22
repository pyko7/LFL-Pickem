import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

type Children = { children: ReactNode };
type AuthContextInterface = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  score: number | undefined;
  setScore: (score: number) => void;
};

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Children) => {
  const [score, setScore] = useState<number | undefined>();
  const [isLogged, setIsLogged] = useState(false);
  const pid = Cookies.get("pid");
  const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET_KEY
  );

  useEffect(() => {
    const isAuth = async () => {
      if (!pid) {
        return setIsLogged(false);
      }

      try {
        await jwtVerify(pid, secret);
        setIsLogged(true);
        return;
      } catch (error) {
        Cookies.remove("pid");
        return setIsLogged(false);
      }
    };
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, score, setScore }}>
      {children}
    </AuthContext.Provider>
  );
};
