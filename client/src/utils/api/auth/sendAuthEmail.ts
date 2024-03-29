import { AuthForm } from "@/src/types/types";
import { getCsrfToken } from "../credentials/getCsrfToken";

export const sendAuthEmail = async (
  user: AuthForm,
  url: string
): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify({ user }),
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 400) {
        if (data.code === "auth/internal-error") {
          throw new Error(
            "Une erreur s'est produite, veuillez réessayer ultérieurement"
          );
        }
      }
      if (res.status === 401) {
        if (data.code === "auth/argument-error") {
          throw new Error("Token invalide");
        }
      }
      throw new Error(res.statusText);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
