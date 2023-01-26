import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, AuthContextInterface } from "@/src/types/context";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: ContextProps) => {
  const [auth, setAuth] = useState(false);
  const { push, pathname } = useRouter();
  const pid = Cookies.get("pid");

  const isAuth = () => {
    if (pathname === "/signup") {
      return push("/signup");
    }
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

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {/* {isError ? (
        <Box
          sx={{
            width: 1,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: (theme) => theme.palette.neutral.light,
            backgroundColor: (theme) => theme.palette.primary.main,
            fontSize: 24,
          }}
        >
          <p>Une erreur est survenue lors de votre demande...</p>
        </Box>
      ) : ( */}
      <>{children}</>
    </AuthContext.Provider>
  );
};
