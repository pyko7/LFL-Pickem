import { FirebaseError } from "firebase/app";
import { AuthForm } from "~/src/types/forms";
import Cookies from "js-cookie";

export const sendAuthEmail = async (user: AuthForm, url: string) => {
  const csrfToken = Cookies.get("__Host.x-csrf-token");
  const { email } = user;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, csrfToken }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data);
    }
    return data;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/internal-error") {
        throw new Error(
          "Une erreur s'est produite, veuillez réessayer ultérieurement"
        );
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
