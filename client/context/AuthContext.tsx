import { createContext, useContext } from "react";
import { ContextProps, AuthContextInterface } from "@/src/types/context";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: ContextProps) => {
  const { push, pathname } = useRouter();
  const pid = Cookies.get("pid");

  const isAuth = () => {
    if (pathname === "/signup") {
      return push("/signup");
    }
    if (!pid) {
      return false;
    }
    verify(`${pid}`, `${process.env.NEXT_PUBLIC_JWT_SECRET_KEY}`, (err) => {
      if (err) {
        Cookies.remove("pid");
        return false;
      }
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuth }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
