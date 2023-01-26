import { FirebaseError } from "firebase/app";
import { AuthForm } from "@/src/types/forms";
import Cookies from "js-cookie";

export const deleteUser = async (user: AuthForm) => {
  const csrfToken = Cookies.get("__Host-.x-csrf-token");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user, csrfToken }),
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
    return data;
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
  }
};
