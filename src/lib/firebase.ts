import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC6ghYNW9NdfXUwaocxO73d3UzRL1XFNDo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "galeriamosantt.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "galeriamosantt",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "galeriamosantt.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "642344678862",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:642344678862:web:a3cb48f934d2c56c21a79f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-NN2EQZC27Z"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
