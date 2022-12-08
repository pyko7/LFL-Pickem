import { AuthForm } from "~/src/types/forms";

export const sendAuthEmail = async (user: AuthForm, url: string) => {
  const { email } = user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth${url}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data);
  }
  return data;
};
