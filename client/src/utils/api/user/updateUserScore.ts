import { getCsrfToken } from "../credentials/getCsrfToken";

export const updateUserScore = async (): Promise<number | void> => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/score`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Une erreur est survenue");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
