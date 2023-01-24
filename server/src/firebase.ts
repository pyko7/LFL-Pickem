import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = {
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  clientEmail: `${process.env.FIREBASE_CLIENT_EMAIL}`,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
    : undefined,
};

initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth();
