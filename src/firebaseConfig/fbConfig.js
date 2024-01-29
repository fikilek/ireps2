// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	// initializeFirestore,
	getFirestore,
	// persistentLocalCache,
	// persistentSingleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// ireps1
const firebaseConfig = {
	apiKey: "AIzaSyDyxZzonDa_tmfjbDL-QZtX48vF7j5-Xn8",
	authDomain: "ireps2.firebaseapp.com",
	projectId: "ireps2",
	storageBucket: "ireps2.appspot.com",
	messagingSenderId: "885517634969",
	appId: "1:885517634969:web:b5da5c7da530cabd45d708",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializeFirestore(app, {
// 	localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
// });

// Initialise firestore
export const db = getFirestore(app);

// Iniitialise firebase auth
export const auth = getAuth(app);

// initialize firebase storage
export const storage = getStorage(app);

// iitialise functions
export const functions = getFunctions(app);
