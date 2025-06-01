import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBD05uxOQ-SKhj-kKynvlbs0-TKg4Au0w0",
    authDomain: "teste1-cfd2b.firebaseapp.com",
    projectId: "teste1-16c4b",
    storageBucket: "teste1-cfd2b.firebasestorage.app",
    messagingSenderId: "596435003351",
    appId: "1:596435003351:web:2aad42331129cfcc260d92",
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);
