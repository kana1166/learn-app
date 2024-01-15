import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { firebaseConfig } from "../firebase/firebaseConfig";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

export const initializeFirebase = (): { app: FirebaseApp; auth: Auth } => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  if (!auth) {
    auth = getAuth(app);
  }

  return { app, auth };
};
