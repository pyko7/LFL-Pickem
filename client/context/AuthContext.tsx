import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, AuthContextInterface } from "@/src/types/context";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";
import { useRouter } from "next/router";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: ContextProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const pid = Cookies.get("pid");
  const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET_KEY
  );

  useEffect(() => {
    const isAuth = async () => {
      if (!pid) {
        console.log("no pid");
        setIsLogged(false);
        return router.push("/login");
      }

      try {
        await jwtVerify(pid, secret);
        console.log("logged");
        setIsLogged(true);
        return;
      } catch (error) {
        console.log("error");
        Cookies.remove("pid");
        setIsLogged(false);
        return router.push("/login");
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
