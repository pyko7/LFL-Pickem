import { AuthForm } from "~/src/types/forms";
import { auth } from "~/firebase";
import Cookies from "js-cookie";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const logUser = async (userData: AuthForm) => {
  const { email, password } = userData;
  await setPersistence(auth, browserSessionPersistence);
  const user = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await user.user.getIdToken();

  const csrfToken = Cookies.get("__Host.x-csrf-token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sessionLogin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": `${csrfToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ idToken, csrfToken }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }
  await auth.signOut();
  return data;
};
