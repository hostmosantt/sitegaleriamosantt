import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//#region src/lib/firebase.ts
var app = !getApps().length ? initializeApp({
	apiKey: "AIzaSyC6ghYNW9NdfXUwaocxO73d3UzRL1XFNDo",
	authDomain: "galeriamosantt.firebaseapp.com",
	projectId: "galeriamosantt",
	storageBucket: "galeriamosantt.firebasestorage.app",
	messagingSenderId: "642344678862",
	appId: "1:642344678862:web:a3cb48f934d2c56c21a79f",
	measurementId: "G-NN2EQZC27Z"
}) : getApp();
var auth = getAuth(app);
getFirestore(app);
var storage = getStorage(app);
//#endregion
export { storage as n, auth as t };
