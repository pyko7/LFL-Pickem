type Rank = {
  userRank: number;
  top: number;
  ranking: number;
};

export const getUserRank = async (): Promise<Rank> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/rank`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Une erreur est survenue");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
