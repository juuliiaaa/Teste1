import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfi = {
    apiKey: "AIzaSyCrbP2K9lglr19JAS822-Q1h2b-Y802gP0",
    authDomain: "teste1-16c4b.firebaseapp.com",
    projectId: "teste1-16c4b",
    storageBucket: "teste1-16c4b.firebasestorage.app",
    messagingSenderId: "576790839598",
    appId: "1:576790839598:web:e7c432ed3dacba5b57babf"
};

const app = initializeApp(firebaseConfi)

export const auth = getAuth(app);
export const db = getFirestore(app);
