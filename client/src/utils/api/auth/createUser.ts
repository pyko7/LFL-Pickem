import { AuthForm } from "~/src/types/forms";

export const createUser = async (user: AuthForm) => {
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
      if (data.code === "auth/email-already-exists") {
        throw new Error("L'email est déjà utilisé");
      } else {
        throw new Error(data);
      }
    }
  }
  return data;
};