import { FirebaseError } from "firebase/app";
import { AuthForm } from "@/src/types/types";
import { getCsrfToken } from "../credentials/getCsrfToken";

export const deleteUser = async (user: AuthForm): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({ user }),
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 403) {
        throw new Error("Adresse email incorrect");
      }
      if (res.status === 401) {
        throw new Error("Requête non autorisée");
      }
      throw new Error(data);
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        throw new Error("Adresse email incorrect");
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
    throw error;
  }
};
