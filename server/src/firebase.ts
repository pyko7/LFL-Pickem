import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("../creds.json");

initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth();
export const db = getFirestore();
