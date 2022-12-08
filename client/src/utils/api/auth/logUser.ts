import { AuthForm } from "~/src/types/forms";
import { auth } from "~/firebase";
import Cookies from "js-cookie";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const logUser = async (userData: AuthForm) => {
  const { email, password } = userData;
  try {
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
      if (res.status === 403) {
        throw new Error("Email is not verified");
      }
      throw new Error(data);
    }
    await auth.signOut();
    return data;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/wrong-password") {
        throw new Error("Adresse email et/ou mot de passe incorrect");
      }
      if (error.code === "auth/too-many-requests") {
        throw new Error(
          "Votre compte a été temporairement bloqué. Pour pouvoir vous connecter, veuillez modifier votre mot de passe ou réessayer ultérieurement"
        );
      }
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
