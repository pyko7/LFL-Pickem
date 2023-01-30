import { AuthForm } from "@/src/types/forms";

export const createUser = async (user: AuthForm) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 400) {
        if (data === "The email address is already in use by another account.") {
          throw new Error("L'email est déjà utilisé");
        }
        if (data === "Le pseudo est déjà utilisé") {
          throw new Error(data);
        }
      }
      throw new Error(res.statusText);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
