import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, AuthContextInterface } from "~/src/types/context";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";
import { useQuery } from "@tanstack/react-query";
import { getLoginCsrfToken } from "~/src/utils/api/auth/getLoginCsrfToken";
import { getUserById } from "~/src/utils/api/user/getUserById";
import { User } from "~/src/types/user";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: ContextProps) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();
  const pid = Cookies.get("pid");

  useQuery(["token"], () => getLoginCsrfToken("/user/token"));
  const { isLoading, isError, data } = useQuery(["user"], () => getUserById());

  const isAuth = () => {
    if (!pid) {
      setAuth(false);
      return push("/login");
    }

    verify(`${pid}`, `${process.env.NEXT_PUBLIC_JWT_SECRET_KEY}`, (err) => {
      if (err) {
        push("/login");
        setAuth(false);
        Cookies.remove("pid");
        return;
      }
    });

    setAuth(true);
  };

  useEffect(() => {
    isAuth();
  }, [auth]);

  useEffect(() => {
    if (!auth) {
      setUser(null);
    }
    setUser(data);
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};
