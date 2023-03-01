export const getUserById = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("Bad request");
      }
      if (res.status === 401) {
        if (data.code === "auth/argument-error") {
          throw new Error("Token invalide");
        }
        throw new Error("Requête non autorisée");
      }
      throw new Error("Une erreur est survenue");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Une erreur est survenue");
    }
  }
};
