import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

// Initialise firestore
export const db = getFirestore(app);

// Iniitialise firebase auth
export const auth = getAuth(app);

// initialize firebase storage
export const storage = getStorage(app);

// iitialise functions
export const functions = getFunctions(app);
