import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, AuthContextInterface } from "~/src/types/context";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getLoginCsrfToken } from "~/src/utils/api/auth/getLoginCsrfToken";
import { User } from "~/src/types/user";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: ContextProps) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<UseQueryResult<User> | null>(null);
  const { push } = useRouter();
  const pid = Cookies.get("pid");

  useQuery(["token"], () => getLoginCsrfToken("/auth/login"));

  const isAuth = () => {
    if (!pid) {
      setAuth(false);
      setUser(null);
      return push("/login");
    }

    verify(`${pid}`, `${process.env.NEXT_PUBLIC_JWT_SECRET_KEY}`, (err) => {
      if (err) {
        push("/login");
        setAuth(false);
        setUser(null);
        Cookies.remove("pid");
        return;
      }
    });
    setAuth(true);
  };

  useEffect(() => {
    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
