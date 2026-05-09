import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB72BUKkupLfB8Z7Dxk05sUsJ0W9BVZkzc",
  authDomain: "gioportfolio-8ddb5.firebaseapp.com",
  projectId: "gioportfolio-8ddb5",
  storageBucket: "gioportfolio-8ddb5.appspot.com",
  messagingSenderId: "334329122357",
  appId: "1:334329122357:web:84224e587edd37304deb7c",
  measurementId: "G-ZLX32CY9D0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
