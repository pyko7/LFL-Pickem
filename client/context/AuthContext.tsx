import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, AuthContextInterface } from "@/src/types/context";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: ContextProps) => {
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
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
