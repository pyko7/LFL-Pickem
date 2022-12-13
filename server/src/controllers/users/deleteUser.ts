import { Request, Response } from "express";
import { auth } from "../../firebase";

export const deleteUser = async (req: Request, res: Response) => {
  const token = req.cookies.session;
  try {
    const decodedToken = await auth.verifySessionCookie(token);
    await auth.deleteUser(decodedToken.uid);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
