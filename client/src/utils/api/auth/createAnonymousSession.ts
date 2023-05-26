import { auth } from "@/firebase";
import {
  setPersistence,
  browserSessionPersistence,
  signInAnonymously,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getCsrfToken } from "../credentials/getCsrfToken";

export const createAnonymousSession = async (): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken();
    await setPersistence(auth, browserSessionPersistence);
    const user = await signInAnonymously(auth);
    const idToken = await user.user.getIdToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/anonymousSession`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    await res.json();
    await auth.signOut();
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/too-many-requests") {
        throw new Error(
          "Votre compte a été temporairement bloqué. Pour pouvoir vous connecter, veuillez modifier votre mot de passe ou réessayer ultérieurement."
        );
      }
    }
    throw error;
  }
};
