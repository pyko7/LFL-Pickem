import { AuthForm } from "@/src/types/forms";

export const sendAuthEmail = async (user: AuthForm, url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Token invalide") {
        window.location.href = "/login";
      }
      throw new Error(error.message);
    }
  }
};
